import { getProjects } from "~/utils/projects";
import { Project } from "~/types";
import { ProjectCard } from "~/components/molecules/projectCard";

export default async function Projects() {
  const projects = await getProjects() as Project<false>[];

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
