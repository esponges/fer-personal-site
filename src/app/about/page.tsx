import { PageHeader } from "~/components/atoms/pageHeader";

import { Container } from "~/components/organisms/container";

import { generateMetadata } from "~/app/defaultMetadata";

import { ChatBot } from "~/components/organisms/chatbot";

export const metadata = await generateMetadata({
  title: "About me",
  description: "Ask the chatbot about me!",
});

export default async function About() {
  return (
    <>
      <Container>
        <PageHeader
          title="About me"
          description="Ask the bot about me!"
        />
        <ChatBot />
      </Container>
    </>
  );
}
