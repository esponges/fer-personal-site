import { PageHeader } from '~/components/atoms/pageHeader';
import { Container } from '~/components/organisms/container';
import Projects from '~/components/containers/projects';


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
