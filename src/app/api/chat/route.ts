/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getErrorMessage } from "~/utils/misc";
import { makeChain, makeStore } from "~/utils/chat";
import OpenAI from "openai";

import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  question: string;
  history: Array<Array<string>>;
}

// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

export async function POST(request: NextRequest) {
  const { question, history } = (await request.json()) as RequestBody;

  try {
    const HNSWStore = await makeStore();
    const chain = await makeChain(HNSWStore);

    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions:
        "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4-1106-preview",
    });

    // Log the first greeting
    console.log(
      "\nHello there, I'm your personal math tutor. Ask some complicated questions.\n"
    );


    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const chatHistoryAsString = history.map((msg) => msg.join("\n")).join("\n");

    const response = await chain.call({
      question: sanitizedQuestion,
      // not working?
      // apparently fixed here https://github.com/nearform/langchainjs/commit/a8be68df562c7e7d2bfce5a9b2fa933a06bf616f
      // also works on scripts/chain.ts but not here, why?
      chat_history: chatHistoryAsString,
    });

    return NextResponse.json({
      ...response,
      assistantId: assistant.id,
    });
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
