import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Do whatever you want
  return new Response('Hello World!', {
    status: 200,
  });
}
