import Head from "next/head";

import { ProjectCard } from "~/components/molecules/projectCard";
import { PageHeader } from "~/components/atoms/pageHeader";
import { Container } from "~/components/organisms/container";

import { PROJECTS } from "~/utils/constants";

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects | FerTostado</title>
        <meta
          name="description"
          content="This is a list of all the relevant projects I've worked on."
        />
      </Head>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        {PROJECTS?.map((project) => {
          return (
            <div key={project.name} className='my-5'>
              <ProjectCard key={project.name} project={project} />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default ProjectsPage;
