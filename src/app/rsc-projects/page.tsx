import { ProjectCard } from '~/components/molecules/projectCard';
import { PageHeader } from '~/components/atoms/pageHeader';
import { Container } from '~/components/organisms/container';

import { prisma } from '~/server/db/client';
import { Project } from '~/types';

const removeTimeStamps = (project: Project) => {
  const { createdAt, updatedAt, ...rest } = project;
  const filteredImages = rest.images?.map((image) => {
    const { createdAt, updatedAt, ...imageRest } = image;
    return imageRest;
  });
  const filteredLibs = rest.libs?.map((lib) => {
    const { createdAt, updatedAt, ...libRest } = lib;
    return libRest;
  });
  return {
    ...rest,
    images: filteredImages,
    libs: filteredLibs,
  };
};

const getProjects = async () => {
  const data = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },

    include: {
      images: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      libs: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return data.map((project) => removeTimeStamps(project))
};

export default async function RscProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of projects I've worked on."
        />
        {projects?.map((project) => {
          return (
            <div
              key={project.name}
              className="my-5"
            >
              <ProjectCard
                key={project.name}
                project={project}
              />
            </div>
          );
        })}
      </Container>
    </>
  );
}
