import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(_request: NextRequest) {
  // Do whatever you want
  return new Response('Hello World!', {
    status: 200,
  });
}
