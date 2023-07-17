/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";

import { getErrorMessage } from "~/utils/misc";
import { getExistingDocs, makeChain } from "~/utils/chat";

import type { BaseChatMessage } from "langchain/schema";
import { type NextRequest, NextResponse } from "next/server";
import type { Doc } from "~/types";

interface RequestBody {
  question: string;
  history: Array<Array<string>>;
}

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
    /* using DB instead of local file */
    if (!process.env.DB_CONTEXT_DOCUMENT) {
      throw new Error("DB_CONTEXT_DOCUMENT is not set");
    }

    const docs = await getExistingDocs(process.env.DB_CONTEXT_DOCUMENT);

    if (!docs[0]?.docs.length) {
      return NextResponse.json({
        error: "An error occurred while fetching documents",
      });
    }

    const documents = docs[0].docs.map(
      (doc) =>
        new Document<Doc>({
          metadata: JSON.parse(doc.metadata as string),
          pageContent: doc.pageContent as string,
        })
    );

    // const text = fs.readFileSync(`${process.cwd()}/public/robot.txt`, "utf-8");
    // /* Split the text into chunks */
    // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    // const documents = await textSplitter.createDocuments([text]);
    /* Create the vectorstore */

    const HNSWStore = await HNSWLib.fromDocuments(documents, new OpenAIEmbeddings());

    const chain = makeChain(HNSWStore);

    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: chatHistory || [],
    });

    return NextResponse.json({
      response,
    });
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
