/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getErrorMessage } from "~/utils/misc";
import { makeChain, makeStore } from "~/utils/chat";
import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  question: string;
  history: Array<Array<string>>;
}

export async function POST(request: NextRequest) {
  const { question, history } = (await request.json()) as RequestBody;
  
  try {
    const HNSWStore = await makeStore();
    const chain = await makeChain(HNSWStore);

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
      response,
    });
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
