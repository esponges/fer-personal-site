import { PageHeader } from '~/components/atoms/pageHeader';
import { Container } from '~/components/organisms/container';

import { generateMetadata } from '~/app/defaultMetadata';
import { ChatBot } from '~/components/organisms/chatbot';

export const metadata = await generateMetadata({
  title: 'About me',
  description: 'Ask the chatbot about me!',
});

// eslint-disable-next-line @typescript-eslint/require-await
export default async function About() {
  return (
    <>
      <Container>
        <PageHeader
          title="About me"
          description="Ask the chatbot about me!"
        />
        <ChatBot />
      </Container>
    </>
  );
}
