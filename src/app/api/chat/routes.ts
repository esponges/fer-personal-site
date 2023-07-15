import type { ChainValues } from "langchain/dist/schema";
import { type NextRequest, NextResponse } from "next/server";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import type { BaseChatMessage } from "langchain/schema";
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

// import { makeChain } from '~/utils/langchain';
// import { pinecone } from '~/utils/pinecone';

import type { Document } from "langchain/document";

interface RequestBody {
  question: string;
  history: Array<Array<string>>;
}

export interface ChatResponseBody {
  text: string;
  sourceDocuments: Document[];
}

export interface ChatResponseError {
  error: string;
}

/*
 * todo: route is not resolving, probably due to the pinecone import
 * probably pinecone is not yet working with the app directory
 */
export async function POST(request: NextRequest) {
  const { question, history } = (await request.json()) as RequestBody;

  // fix TypeError: chatMessage._getType is not a function
  // solution found here https://github.com/hwchase17/langchainjs/issues/1573#issuecomment-1582636486
  const chatHistory: BaseChatMessage[] = [];
  history?.forEach((_, idx) => {
    if (!!history[idx]?.length) {
      // first message is always human message
      chatHistory.push(new HumanChatMessage(history[idx]?.[0] as string));
    }
    if (!!history[idx]?.length) {
      // second message is always AI response
      chatHistory.push(new AIChatMessage(history[idx]?.[1] as string));
    }
  });

  try {
    // const pineconeClient = pinecone;

    // //create chain for conversational AI
    // const chain = await makeChain(pineconeClient);

    // //Ask a question using chat history
    // // OpenAI recommends replacing newlines with spaces for best results
    // const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
    // const response = await chain.call({
    //   question: sanitizedQuestion,
    //   chat_history: history || [],
    // });

    // res.status(200).json(response);
    return NextResponse.json({
      /* response */
    });
  } catch (error: any) {
    console.log("error creating chain", error);
    // res.status(500).json({ error: error.message || 'Something went wrong' });
    return NextResponse.json({ error: "Something went wrong" });
  }
}
