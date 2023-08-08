import z from "zod";

const ApiChatResponseBody = z.object({
  response: z.object({
    text: z.string(),
    sourceDocuments: z.array(
      z.object({
        pageContent: z.string(),
        metadata: z.record(z.any()),
      })
    ),
  }),
});

export const ApiChatResponse = z.union([
  ApiChatResponseBody,
  z.object({
    error: z.string(),
    status: z.number(),
  }),
]);
