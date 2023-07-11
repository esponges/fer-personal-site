import Projects from '~/components/containers/projects';
import { PageHeader } from '~/components/atoms/pageHeader';
import { Container } from '~/components/organisms/container';

import { generateMetadata } from '~/app/defaultMetadata';

export const metadata = await generateMetadata({
  title: 'Projects',
  description: 'Production projects I\'ve worked on.',
});

// eslint-disable-next-line @typescript-eslint/require-await
export default async function ProjectsPage() {
  return (
    <>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        {/* @ts-expect-error Server Component */}
        <Projects />
      </Container>
    </>
  );
}
