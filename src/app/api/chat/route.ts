/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AIMessage, HumanMessage } from "langchain/schema";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";

import { getErrorMessage } from "~/utils/misc";
import { getExistingDocs, makeChain } from "~/utils/chat";

import type { BaseMessage} from "langchain/schema";
import { type NextRequest, NextResponse } from "next/server";
import type { Doc } from "~/types";

interface RequestBody {
  question: string;
  history: Array<Array<string>>;
}

export async function POST(request: NextRequest) {
  const { question, history } = (await request.json()) as RequestBody;

  // todo: probably not needed since the history should be passed as a string (see below)
  // fix TypeError: chatMessage._getType is not a function
  // solution found here https://github.com/hwchase17/langchainjs/issues/1573#issuecomment-1582636486
  const chatHistory: BaseMessage[] = [];
  history?.forEach((_, idx) => {
    if (!!history[idx]?.length) {
      // first message is always human message
      chatHistory.push(new HumanMessage(history[idx]?.[0] as string));
      chatHistory.push(new AIMessage(history[idx]?.[1] as string));
    }
  });

  const chatHistoryAsString = "how old is bob\nHe is 28 years old" + chatHistory.map((msg) => msg.content).join("\n");

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

    const HNSWStore = await HNSWLib.fromDocuments(documents, new OpenAIEmbeddings());

    const chain = makeChain(HNSWStore);

    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const response = await chain.call({
      question: sanitizedQuestion,
      // not working?
      // apparently fixed here https://github.com/nearform/langchainjs/commit/a8be68df562c7e7d2bfce5a9b2fa933a06bf616f
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
