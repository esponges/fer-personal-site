import type { ChainValues } from 'langchain/dist/schema';
import { type NextRequest, NextResponse } from 'next/server';

import { makeChain } from '~/utils/langchain';
import { pinecone } from '~/utils/pinecone';

import type { Document } from 'langchain/document';

interface RequestBody {
  question: string;
  history: string[];
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
  const { question, history } = await request.json() as RequestBody;

  try {
    const pineconeClient = pinecone;

    //create chain for conversational AI
    const chain = await makeChain(pineconeClient);

    //Ask a question using chat history
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    // res.status(200).json(response);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.log('error creating chain', error);
    // res.status(500).json({ error: error.message || 'Something went wrong' });
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
