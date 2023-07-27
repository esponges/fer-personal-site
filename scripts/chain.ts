import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { makeStore } from "~/utils/chat";

const EXECUTING_CASES = {
  runConversationWithMemoryDoc: {
    enabled: true,
  }
};

const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = 
`Given the following conversation and a follow up question, 
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

export const runConversationWithMemoryDoc = async () => {
  /* Load in the file we want to do question answering over */
  // const loader = new PDFLoader("public/lotr-world-wars.pdf");
  // const pdf = await loader.load();
  // /* Split the text into chunks */
  // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  // const docs = await textSplitter.splitDocuments(pdf);
  // console.log('the docs', docs);

  /* Create the vectorstore */
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });

  const vectorStore = await makeStore();
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

// export const runConversationWithExternalManagedMemory = async () => {
//   const model = new OpenAI({
//     modelName: "gpt-3.5-turbo",
//     temperature: 0,
//   });

//   const vectorStore = await makeStore();
//   /* Create the chain */



if (EXECUTING_CASES.runConversationWithMemoryDoc?.enabled) {
  (async () => {
    await runConversationWithMemoryDoc();
    console.log('chain completed');
  })();
}
