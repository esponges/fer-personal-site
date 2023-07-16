/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import type { VectorStore } from "langchain/dist/vectorstores/base";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { Client } from "pg";
import type { Document } from "langchain/document";
import type { Doc } from "~/types";
import * as schema from "../../drizzle/schema";

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorStore: VectorStore) => {
  const model = new OpenAI({
    temperature: 0.9, // increase temepreature to get more creative answers
    modelName: "gpt-3.5-turbo", //change this to gpt-4 if you have access
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  return ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    // todo: deprecated
    qaTemplate: QA_PROMPT,
    // questionGeneratorTemplate: CONDENSE_PROMPT,
    // qaChainOptions: { prompt: QA_PROMPT },
    questionGeneratorChainOptions: { template: CONDENSE_PROMPT },
    returnSourceDocuments: true,
    // todo: this is required as per the docs, works first qn but not second
    // memory: new BufferMemory({
    //   // chatHistory: [],
    //   inputKey: 'question',
    //   memoryKey: 'chat_history',
    // })
  });
};

if (!process.env.DATABASE_URL) {
  throw new Error("DB_URL is not set");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const connect = async () => {
  await client.connect();
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