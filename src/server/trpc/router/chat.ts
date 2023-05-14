import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { router, publicProcedure } from '~/server/trpc/trpc';
import { makeChain } from '~/utils/langchain';
import { pinecone } from '~/utils/pinecone';

export const chatRouter = router({
  getResponse: publicProcedure
    .input(
      z.object({
        question: z.string(),
        history: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { question, history } = input;

      try {
        const pineconeClient = pinecone;
        //create chain for conversational AI
        const chain = await makeChain(pineconeClient);
    
        //Ask a question using chat history
        const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
        const response = await chain.call({
          question: sanitizedQuestion,
          chat_history: history || [],
        });
    
        return { response, question, history };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          cause: error,
        });
      }
    }),
});
