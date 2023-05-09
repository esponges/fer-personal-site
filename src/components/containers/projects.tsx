import { getProjects } from "~/utils/projects";
import { ProjectCard } from "../molecules/projectCard";

export default async function Projects() {
  const projects = await getProjects();

  return projects?.map((project) => {
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
  });
}
