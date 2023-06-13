import { Project } from "~/types";

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
