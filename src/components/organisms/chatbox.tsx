'use client';

import styles from '~/styles/Home.module.css';
import { useRef, useState, useEffect } from 'react';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { LoadingDots } from '~/components/atoms/loadingDots';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/atoms/accordion';

import { type Message } from '~/types';

import { type Document } from 'langchain/document';

export const ChatBox = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about this document?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [nameSpace, setNameSpace] = useState<string>();

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const chatData = await response.json();

      if (chatData.error) {
        setError(chatData.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: chatData.text,
              sourceDocs: chatData.sourceDocuments,
            },
          ],
          history: [...state.history, [question, chatData.text]],
        }));
      }
      console.log('messageState', messageState);

      setLoading(false);

      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  const canUploadAttachment = !loading && !uploadedFile;

  return (
    <div className="mx-auto flex h-40 w-full flex-col gap-4">
      <div className="align-center h-[5rem] justify-center">
        <div
          ref={messageListRef}
          className={styles.messagelist}
        >
          {messages.map((message, index) => {
            let icon;
            let className;
            if (message.type === 'apiMessage') {
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
                {message.sourceDocs && (
                  <div
                    className="p-5"
                    key={`sourceDocsAccordion-${index}`}
                  >
                    <Accordion
                      type="single"
                      collapsible
                      className="flex-col"
                    >
                      {message.sourceDocs.map((doc, idx) => (
                        <div key={`messageSourceDocs-${idx}`}>
                          <AccordionItem value={`item-${idx}`}>
                            <AccordionTrigger>
                              <h3>Source {idx + 1}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ReactMarkdown linkTarget="_blank">{doc.pageContent}</ReactMarkdown>
                              <p className="mt-2">
                                <b>Source:</b> {doc.metadata.source}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            <textarea
              disabled={loading}
              onKeyDown={handleEnter}
              ref={textAreaRef}
              autoFocus={false}
              rows={1}
              maxLength={512}
              id="userInput"
              name="userInput"
              placeholder={
                loading
                  ? 'Waiting for response...'
                  : uploadedFile?.name
                    ? `Ask a question about ${uploadedFile.name}`
                    : 'Upload a document first'
              }
              value={query}
              /* dont set vals, use the form values so we do not rerender at every keystroke */
              onChange={(e) => setQuery(e.target.value)}
              className={styles.textarea}
            />
            <button
              type="submit"
              disabled={loading || !uploadedFile}
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
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      {error || !uploadedFile ? (
        <div className="rounded-md border border-red-400 p-4">
          <p className="text-red-500">
            {error
              ? `${error} - Please try again later or use a different file`
              : 'Please upload your file first to proceed'}
          </p>
        </div>
      ) : null}
    </div>
  );
};
