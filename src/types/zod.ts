import z from "zod";

const documentSchema = z.object({
  pageContent: z.string(),
  metadata: z.record(z.any()),
});

const apiChatResponseBody = z.object({
  response: z.object({
    text: z.string(),
    sourceDocuments: z.array(documentSchema),
  }),
});

export const apiChatResponse = z.union([
  apiChatResponseBody,
  z.object({
    error: z.string(),
    status: z.number(),
  }),
]);
