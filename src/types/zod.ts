import z from "zod";

const documentSchema = z.object({
  pageContent: z.string(),
  metadata: z.record(z.any()),
});

export const apiChatResponseBody = z.object({
  response: z.object({
    text: z.string(),
    sourceDocuments: z.array(documentSchema),
  }),
});
