/* eslint-disable @typescript-eslint/no-shadow */
import { prisma } from "~/server/db/client";
import type { Project } from "~/types";

export const removeTimeStamps = (project: Project) => {
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

export const getProjects = async () => {
  const data = await prisma.project.findMany({
    orderBy: {
      relevance: 'desc',
    },
    include: {
      images: true,
      libs: true,
    },
  });

  return data.map((project) => removeTimeStamps(project));
};
