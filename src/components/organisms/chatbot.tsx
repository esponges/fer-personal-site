"use client";

import styles from "~/styles/Home.module.css";
import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { LoadingDots } from "~/components/atoms/loadingDots";

import type { ChatMessage } from "~/types";
import type { Document } from "langchain/document";
import type { ApiChatResponseBody } from "~/types";

export const ChatBot = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: ChatMessage[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: "Hi, what would you like to learn about Fer?",
        type: "apiMessage",
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  //handle form submission
  const handleSubmit = async (e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert("Please input a question");
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "userMessage",
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const { response: chatResponse } = (await response.json()) as ApiChatResponseBody;

      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: "apiMessage",
            message: chatResponse.text,
            sourceDocs: chatResponse.sourceDocuments,
          },
        ],
        history: [...state.history, [question, chatResponse.text]],
        pendingSourceDocs: chatResponse.sourceDocuments,
      }));

      setLoading(false);

      //scroll to bottom - broken - fix later
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (err: unknown) {
      setLoading(false);
      setError("An error occurred while fetching the data. Please try again.");
    }
  };

  //prevent empty submissions
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && query) {
      handleSubmit(e);
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="align-center justify-center">
        <div
          ref={messageListRef}
          className={styles.messagelist}
        >
          {messages.map((message, index) => {
            let icon;
            let className;
            if (message.type === "apiMessage") {
              icon = (
                <Image
                  key={index}
                  src="/bot-image.png"
                  alt="AI"
                  width="40"
                  height="40"
                  className={styles.boticon}
                  priority
                />
              );
              className = styles.apimessage;
            } else {
              icon = (
                <Image
                  key={index}
                  src="/usericon.png"
                  alt="Me"
                  width="30"
                  height="30"
                  className={styles.usericon}
                  priority
                />
              );
              // The latest message sent by the user will be animated while waiting for a response
              className = loading && index === messages.length - 1 ? styles.usermessagewaiting : styles.usermessage;
            }
            return (
              <div key={`chatMessage-${index}`}>
                <div className={className}>
                  {icon}
                  <div className={styles.markdownanswer}>
                    <ReactMarkdown linkTarget="_blank">{message.message}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center relative py-2 w-full flex-col">
          <div className="w-full relative">
            <form>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={loading ? "Waiting for response..." : "Ask a question about Fer"}
                value={query}
                /* todo: dont set vals, use the form values so we do not rerender at every keystroke */
                onChange={(e) => setQuery(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.loadingwheel}>
                    <LoadingDots color="#000" />
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* eslint-disable-next-line max-len */}
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      {error ? (
        <div className="rounded-md border border-red-400 p-4">
          <p className="text-red-500">{error}</p>
        </div>
      ) : null}
    </div>
  );
};
