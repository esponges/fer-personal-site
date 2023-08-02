import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { BufferMemory } from "langchain/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import { makeStore as makeDBStore } from "~/utils/chat";

const EXECUTING_CASES = {
  runConversationWithMemoryDoc: {
    enabled: false,
  },
  runConversationWithExternalManagedMemory: {
    enabled: false,
  },
  runConversationWithExternalManagedMemoryButLocalData: {
    enabled: false,
  },
  runConversationWithLocalFileButInternalManagedMemory: {
    enabled: true,
  },
};

const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, 
return the conversation history excerpt that includes any relevant context to the question 
if it exists and rephrase the follow up question to be a standalone question.
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
Your answer:`;

const getModel = (modelName?: string, temp?: number) => {
  return new OpenAI({
    modelName: modelName,
    temperature: temp,
  });
};

export const runConversationWithMemoryDoc = async () => {
  /* Load in the file we want to do question answering over */
  // const loader = new PDFLoader("public/lotr-world-wars.pdf");
  // const pdf = await loader.load();
  // /* Split the text into chunks */
  // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  // const docs = await textSplitter.splitDocuments(pdf);
  // console.log('the docs', docs);

  /* Create the vectorstore */
  const model = getModel("gpt-3.5-turbo", 0);

  const vectorStore = await makeDBStore();
  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: false,
    memory: new BufferMemory({
      memoryKey: "chat_history", // Must be set to "chat_history"
      returnMessages: true,
    }),
    questionGeneratorChainOptions: {
      template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
    },
  });

  /* Ask it a question */
  const res = await chain.call({
    question: "I have a friend Called Fer that has this question: What's Fer stack?",
  });
  console.log(res);
  /* Ask it a follow up question */
  const followUpRes = await chain.call({
    question: "What the name of my friend?",
  });
  console.log(followUpRes);

  /* Confirm that the bot doesnt answer anything not related to the context */
  const nonRelatedQn = await chain.call({
    question: "Whats the capital of Mexico?",
  });
  console.log("fer", nonRelatedQn);
};

export const runConversationWithExternalManagedMemory = async () => {
  const model = getModel("gpt-3.5-turbo", 0);

  const vectorStore = await makeDBStore();

  console.log("vectorStore", vectorStore);
  // wont pass any memory option
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    questionGeneratorChainOptions: {
      template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
    },
  });

  const chatHistory = `
  I have a friend called Bob. He's 28 years old. What's Fer Stack?\n
  Fer's stack includes React, Redux, NodeJs, NextJs, Typescript, Jest, Mongo, 
  PostgresSQL, Golang, PromQL, Google Kubernetes, and Prisma.\n
  `;

  const qn = "What's Bob Age?";
  const res = await chain.call({
    question: qn,
    chat_history: chatHistory,
  });

  console.log(res);

  const updatedChatHistory = `${chatHistory}\n${qn}\n${res.text as string}`;

  const followUpRes = await chain.call({
    question: "How many years Fer has been programming?",
    chat_history: updatedChatHistory,
  });

  console.log(followUpRes);
};

export const runConversationWithExternalManagedMemoryButLocalData = async () => {
  const vectorStoreDocuments = await HNSWLib.fromDocuments(
    [
      {
        pageContent: "Mitochondria are the powerhouse of the cell",
        metadata: { id: 2 },
      },
      { pageContent: "Foo is red", metadata: { id: 1 } },
      { pageContent: "Bar is red", metadata: { id: 3 } },
      { pageContent: "Buildings are made out of brick", metadata: { id: 4 } },
      { pageContent: "Mitochondria are made of lipids", metadata: { id: 5 } },
    ],
    new OpenAIEmbeddings()
  );

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStoreDocuments.asRetriever(), {
    questionGeneratorChainOptions: {
      template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
    },
  });

  const chatHistory = `
  I have a friend called Bob. He's 28 years old. He'd like to know what the powerhouse of the cell is?\n
  The powerhouse of the cell is the mitochondria.\n
`;

  //   const res = await chain.call({
  //     question:
  //       "I have a friend called Bob. He's 28 years old. He'd like to know what the powerhouse of the cell is?",
  //   });

  //   console.log(res);
  //   /*
  //   {
  //     text: "The powerhouse of the cell is the mitochondria."
  //   }
  // */
  const firstQn = "How old is Bob?";

  const res2 = await chain.call({
    question: firstQn,
    chat_history: chatHistory,
  });

  console.log(res2); // Bob is 28 years old.

  /*
{
  text: "Bob is 28 years old."
}
*/

  // const updatedChatHistory = chatHistory + "\n" + firstQn + "\n" + res2.text + "\n";
  const updatedChatHistory = `${chatHistory}\n${firstQn}\n${res2.text as string}\n`;

  const secondQn = "Whats my friends name?";

  const res3 = await chain.call({
    question: secondQn,
    chat_history: updatedChatHistory,
  });

  console.log(res3); // Bob
};

export const runConversationWithLocalFileButInternalManagedMemory = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = getModel();
  /* Load in the file we want to do question answering over */
  const text = fs.readFileSync("public/QA.md.txt", "utf8");
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    // memory: new BufferMemory({
    //   memoryKey: "chat_history", // Must be set to "chat_history"
    //   returnMessages: false,
    // }),
    questionGeneratorChainOptions: {
      template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
    },
  });

  // this breaks chat history
  const prevHistory = `
  I have a friend called Bob. He's 28 years old. What's Fer Stack?\n
  Fer's stack includes React, Redux, NodeJs, NextJs, Typescript, Jest, Mongo,
  PostgresSQL, Golang, PromQL, Google Kubernetes, and Prisma.\n
  `;

  /* Ask it a question */
  const question = "My Friend José who is 28 years old wants to know: Whats Fer Toasted education?";
  /* Can be a string or an array of chat messages */
  const res = await chain.call({ question, chat_history: "" });
  // Fer Toasted has a Master of Business Administration from Tecnologico de Monterrey and a 
  // Bachelor of Industrial Engineering from Universidad de Guadalajara
  console.log(res);

  /* Ask it a follow up question */
  const chatHistory = `${question}\n${res.text as string}`;
  const followUpQn = "And the latest one?";
  const followUpRes = await chain.call({
    question: followUpQn,
    chat_history: chatHistory,
  });
  console.log('question', followUpQn);
  console.log('chatHistory', chatHistory);
  console.log(followUpRes);
  // Fer Toasted has earned a Master of Business Administration from Tecnologico de Monterrey.

  const followUpQn2 = "What's José's age?";
  const updatedChatHistory = `${chatHistory}\n${followUpQn}\n${followUpRes.text as string}`;
  const followUpRes2 = await chain.call({
    question: followUpQn2,
    chat_history: updatedChatHistory,
  });
  console.log('question', followUpQn2);
  console.log('chatHistory', updatedChatHistory);
  console.log(followUpRes2);
  // José is 28 years old.
};

// todo: this could probably be handled with a loop instead if
if (EXECUTING_CASES.runConversationWithMemoryDoc?.enabled) {
  (async () => {
    console.log("running runConversationWithMemoryDoc");
    await runConversationWithMemoryDoc();
    console.log("chain completed");
  })();
}

if (EXECUTING_CASES.runConversationWithExternalManagedMemory?.enabled) {
  (async () => {
    console.log("running runConversationWithExternalManagedMemory");
    await runConversationWithExternalManagedMemory();
    console.log("chain completed");
  })();
}

if (EXECUTING_CASES.runConversationWithExternalManagedMemoryButLocalData?.enabled) {
  (async () => {
    console.log("running runConversationWithExternalManagedMemoryButLocalData");
    await runConversationWithExternalManagedMemoryButLocalData();
    console.log("chain completed");
  })();
}

if (EXECUTING_CASES.runConversationWithLocalFileButInternalManagedMemory?.enabled) {
  (async () => {
    console.log("running runConversationWithLocalFileButInternalManagedMemory");
    await runConversationWithLocalFileButInternalManagedMemory();
    console.log("chain completed");
  })();
}
