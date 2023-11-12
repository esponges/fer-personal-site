// import the required dependencies
require("dotenv").config();
import OpenAI from "openai";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

import fs from "fs";

// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

async function askQuestion(question: string) {
  return new Promise<string>((resolve, reject) => {
    readline.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

function logAnything(message: string) {
  console.log("logAnything output is :", message);
}

async function main() {
  // const fileContent = fs.createReadStream("../public/pdf/test.txt");

  try {
    // const file = await openai.files.create({
    //   purpose: "assistants",
    //   file: fileContent,
    // });

    // console.log("file id: ", file.id);
    const assistant = await openai.beta.assistants.create({
      name: "Fer toasted assistant",
      instructions:
        "You are a personal assitant that will provide information regarding to the provided context." +
        "This context will be information regarding a Software Developer called Fernando." +
        "You will be able to answer questions that are related to the context provided." +
        "If you are not able to answer the question, please politely say that you are not able to answer" +
        "any questions non related to Fernando.",
      file_ids: ["file-4Yj5g4XKBzZR5LbJ2CIZyTk6"],
      tools: [
        { type: "code_interpreter" },
        {
          type: "function",
          function: {
            name: "getNickname",
            description: "Get the nickname of a city",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city and state e.g. San Francisco, CA",
                },
              },
              required: ["location"],
            },
          },
        },
      ],
      // model: "gpt-4-1106-preview",
      model: "gpt-3.5-turbo-1106",
    });

    // Log the first greeting
    console.log(
      "\nHello there, I'm Fernando's personal assistant. Ask some questions abot Fer.\n",
    );

    // Create a thread
    const thread = await openai.beta.threads.create();

    console.log("starting thread with id: ", thread.id);

    // Use keepAsking as state for keep asking questions
    let keepAsking = true;

    while (keepAsking) {
      const userQuestion = await askQuestion("\nWhat is your question? ");

      // Pass in the user question into the existing thread
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userQuestion,
        // file_ids: [file.id],
      });
      console.log("thinking...");

      // Use runs to wait for the assistant response and then retrieve it
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });

      
      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id,
        );
        
        console.log('run :', run);
      // Polling mechanism to see if runStatus is completed
      // This should be made more robust.
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      // Get the last assistant message from the messages array
      const messages = await openai.beta.threads.messages.list(thread.id);

      console.log(messages);

      // Find the last message for the current run
      const lastMessageForRun = messages.data
        .filter(
          (message) =>
            message.run_id === run.id && message.role === "assistant",
        )
        .pop();

      console.log(lastMessageForRun);

      // If an assistant message is found, console.log() it
      if (lastMessageForRun) {
        console.log(`${lastMessageForRun.content[0]?.text?.value} \n`);
      }

      // Then ask if the user wants to ask another question and update keepAsking state
      const continueAsking = await askQuestion(
        "Do you want to ask another question? (yes/no) ",
      );

      keepAsking = continueAsking.toLowerCase() === "yes";

      // If the keepAsking state is falsy show an ending message
      if (!keepAsking) {
        console.log("Alrighty then, I hope you learned something!\n");
      }
    }

    // close the readline
    readline.close();
  } catch (error) {
    console.error(error);
  }
}

// Call the main function
main();
