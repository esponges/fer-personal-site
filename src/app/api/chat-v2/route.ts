/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getErrorMessage } from "~/utils/misc";
import OpenAI from "openai";
import { env } from "~/env/server.mjs";

import type { Thread } from "openai/resources/beta/threads/threads";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface RequestBody {
  question: string;
  // the actual conversation thread
  threadId?: string;
}

// Create a OpenAI connection
const secretKey = env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

export async function POST(request: NextRequest) {
  const { question, threadId } = (await request.json()) as RequestBody;

  try {
    // pick existing assistant previously created
    const assistantId = env.OPENAI_ABOUT_ASSISTANT_ID;
    
    if (!assistantId) {
      throw new Error("OPENAI_ABOUT_ASSISTANT_ID not found");
    }
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    
    // create a thread for the first question
    let thread: Thread;

    if (!threadId) {
      thread = await openai.beta.threads.create();
    } else {
      thread = await openai.beta.threads.retrieve(threadId);
    }

    // pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: question,
    });

    // use runs to start processing the assistant response after the thread has
    // been created and the message has been appended to the thread
    const stream = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistant.id,
    });

    return new Response(stream.toReadableStream());
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
