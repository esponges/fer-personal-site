import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";
// import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

async function askQuestion(question: string) {
  return new Promise<string>((resolve, _reject) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

function getMockResponseFromUserMultipleChoice() {
  return "a";
}

function getMockResponseFromUserFreeResponse() {
  return "I don't know";
}

function displayQuiz(title: string, questions: Record<string, string>[]) {
  console.log("Quiz :", title);
  const responses = [];

  for (const question of questions) {
    console.log("question_test string :", question["question_text"]);
    let response = "";

    // if multiple choice, print options
    if (question["question_type"] === "MULTIPLE_CHOICE") {
      if (question["choices"]) {
        for (const choices of question["choices"]) {
          console.log(choices);
        }
      }
      response = getMockResponseFromUserMultipleChoice();
    } else if (question["question_type"] === "FREE_RESPONSE") {
      response = getMockResponseFromUserFreeResponse();
    }

    responses.push(response);
  }
  console.log("responses from quiz :", responses);
  return responses;
}

const quizJson = {
  name: "display_quiz",
  description:
    "Displays a quiz to the student, and returns the student's response. A single quiz can have multiple questions.",
  parameters: {
    type: "object",
    properties: {
      title: { type: "string" },
      questions: {
        type: "array",
        description:
          "An array of questions, each with a title and potentially options (if multiple choice).",
        items: {
          type: "object",
          properties: {
            question_text: { type: "string" },
            question_type: {
              type: "string",
              enum: ["MULTIPLE_CHOICE", "FREE_RESPONSE"],
            },
            choices: { type: "array", items: { type: "string" } },
          },
          required: ["question_text"],
        },
      },
    },
    required: ["title", "questions"],
  },
};

async function main() {
  // const fileContent = fs.createReadStream("../public/pdf/test.txt");

  try {
    // const file = await openai.files.create({
    //   purpose: "assistants",
    //   file: fileContent,
    // });

    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions:
        "You are a personal math tutor. Answer questions briefly, in a sentence or less.",
      tools: [
        { type: "code_interpreter" },
        // necessary?
        { type: "retrieval" },
        {
          type: "function",
          function: quizJson,
        },
      ],
      // model: "gpt-4-1106-preview",
      model: "gpt-3.5-turbo-1106",
    });

    // Log the first greeting
    console.log(
      "\nHello there, I'm Fernando's personal Math assistant. Ask some questions abot Fer.\n",
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

      // Use runs to wait for the assistant response and then retrieve it
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });

      let actualRun = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id,
      );

      // Polling mechanism to see if actualRun is completed
      // This should be made more robust.
      while (
        actualRun.status === "queued" ||
        actualRun.status === "in_progress" ||
        actualRun.status === "requires_action"
      ) {
        // requires_action means that the assistant is waiting for the functions to be added
        if (actualRun.status === "requires_action") {
          // extra single tool call
          const toolCall =
            actualRun.required_action?.submit_tool_outputs?.tool_calls[0];

          const name = toolCall?.function.name;

          const args = JSON.parse(toolCall?.function?.arguments || "{}");
          const questions = args.questions;

          const responses = displayQuiz(
            name || "cool quiz",
            questions,
          );

          const reRun = await openai.beta.threads.runs.submitToolOutputs(
            thread.id,
            run.id,
            {
              tool_outputs: [
                {
                  tool_call_id: toolCall?.id,
                  output: JSON.stringify(responses),
                },
              ],
            },
          );

          console.log("requires_action - reRun :", reRun);
        }

        // keep polling until the run is completed
        await new Promise((resolve) => setTimeout(resolve, 2000));
        actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }
      console.log("thinking...");

      // Get the last assistant message from the messages array
      const messages = await openai.beta.threads.messages.list(thread.id);

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
        console.log("lastMessageForRun object", lastMessageForRun);
        // aparently this is not correctly typed
        // content returns an of objects do contain a text object
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
    rl.close();
  } catch (error) {
    console.error(error);
  }
}

// Call the main function
main();
