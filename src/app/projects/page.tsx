import { Suspense } from 'react';

import { PageHeader } from '~/components/atoms/pageHeader';
import { Container } from '~/components/organisms/container';
import Projects from '~/components/containers/projects';


import { getProjects } from '~/utils/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        <Suspense fallback={'LOADING'}>
          {/* @ts-expect-error Server Component */}
          <Projects />
        </Suspense>
      </Container>
    </>
  );
}
