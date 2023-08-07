/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { Client } from "pg";

import * as schema from "../../drizzle/schema";
import { getErrorMessage } from "./misc";

import type { VectorStore } from "langchain/dist/vectorstores/base";
import type { Doc } from "~/types";
import { OpenAI } from "langchain/llms/openai";

export const makeStore = async () => {
  if (!process.env.DB_CONTEXT_DOCUMENT) {
    throw new Error("DB_CONTEXT_DOCUMENT is not set");
  }

  const docs = await getExistingDocs(process.env.DB_CONTEXT_DOCUMENT);

  if (!docs[0]?.docs.length) {
    throw new Error("An error occurred while fetching documents");
  }

  const documents = docs[0].docs.map(
    (doc) =>
      new Document<Doc>({
        metadata: JSON.parse(doc.metadata as string),
        pageContent: doc.pageContent as string,
      })
  );

  // const texts = docs[0].docs.map((doc) => doc.pageContent as string);
  // const textsMetas = docs[0].docs.map((doc) => !!doc?.metadata ? JSON.parse(doc.metadata ) : {});
  // const HNSWStore = await HNSWLib.fromTexts(texts, textsMetas, new OpenAIEmbeddings());
  const HNSWStore = await HNSWLib.fromDocuments(documents, new OpenAIEmbeddings());

  return HNSWStore;
};

// todo: improve it, apparently it's
const CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to 
the question if it exists and rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the users question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
<Relevant chat history excerpt as context here>
Standalone question: <Rephrased question here>
\`\`\`
Your useful answer in markup language:`;

export const makeChain = async (vectorStore: VectorStore) => {
  const model = new OpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: "gpt-3.5-turbo", //change this to gpt-4 if you have access
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  return ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    questionGeneratorChainOptions: { template: CHAIN_PROMPT },
  });
};

if (!process.env.DOCUMENTS_DB_URL) {
  throw new Error("DB_URL is not set");
}

const client = new Client({
  connectionString: process.env.DOCUMENTS_DB_URL,
});

const connect = async () => {
  try {
    await client.connect();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(`error initializing docs db: ${errorMessage}`);
  }
};

connect();

export const drizzleDb = drizzle(client, { schema });

// todo: add assertion for existing docs - return bool or docs
export const getExistingDocs = async (fileName: string): Promise<Doc[] | []> => {
  const document = await drizzleDb.query.langChainDocs.findMany({
    where: eq(schema.langChainDocs.name, fileName),
    with: {
      docs: true,
    },
  });

  return document;
};

export const insertDocs = async (docsToUpload: Document[], fileName: string) => {
  await drizzleDb.transaction(async () => {
    const newDocId = randomUUID();

    await drizzleDb
      .insert(schema.langChainDocs)
      .values({
        id: newDocId,
        name: fileName,
        nameSpace: fileName,
      })
      .returning();

    await drizzleDb.insert(schema.docs).values(
      docsToUpload.map((doc) => ({
        id: randomUUID(),
        name: fileName,
        metadata: JSON.stringify(doc.metadata),
        pageContent: doc.pageContent,
        langChainDocsId: newDocId,
      }))
    );
  });
};
