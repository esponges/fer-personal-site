/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getErrorMessage } from "~/utils/misc";
import OpenAI from "openai";

import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  question: string;
}

// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

export async function POST(request: NextRequest) {
  const { question } = (await request.json()) as RequestBody;

  try {
    const assistant = await openai.beta.assistants.create({
      name: "Fer Toasted Assistant",
      instructions:
        "You are a personal math tutor. Write and run code to answer math questions.",
      // tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      // file_ids: ["file-NZwFCA0BnxEvzMlksmk0wIkS"],
      model: "gpt-4-1106-preview",
    });

    // create a thread
    // the thread holds the state of the conversation
    const thread = await openai.beta.threads.create();

    // pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: question,
    });

    // use runs to start processing the assistant response after the thread has
    // been created and the message has been appended to the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    // retrieve the run to see if it is completed
    let actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Polling mechanism to see if actualRun is completed
    // This should be made more robust.
    while (
      actualRun.status === "queued" ||
      actualRun.status === "in_progress" ||
      actualRun.status === "requires_action"
    ) {
      // requires_action means that the assistant is waiting for the functions to be added
      if (actualRun.status === "requires_action") {
        throw new Error("required_action: function calling not enabled yet!");
      }
      // keep polling until the run is completed
      await new Promise((resolve) => setTimeout(resolve, 2000));
      actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the last assistant message from the messages array
    const messages = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessageForRun = messages.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant",
      )
      .pop();

    let assistantResponse = "";

    if (lastMessageForRun) {
      // aparently this is not correctly typed
      // content returns an of objects do contain a text object
      const res = lastMessageForRun.content[0] as {
        text: { value: string };
      };

      assistantResponse = res.text.value;
    } else {
      throw new Error("No assistant message found");
    }

    return NextResponse.json({
      response: assistantResponse,
    });
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
