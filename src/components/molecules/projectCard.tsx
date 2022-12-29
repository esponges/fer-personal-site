import Image from "next/image";
import AwesomeSlider from "react-awesome-slider";

import type { Project } from "~/types";

import { Header } from "~/components/atoms/header";
import { SubHeader } from "~/components/atoms/subheader";
import { Paragraph } from "../atoms/paragraph";
import Link from "next/link";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="card--bg overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <Header>{project.name}</Header>
        <SubHeader>{project.subheader}</SubHeader>
        <Paragraph>{project.description}</Paragraph>
      </div>
      <SubHeader>Main libs used in this project:</SubHeader>
      <ul className="px-4 py-4 sm:px-6">
        {project.libs.map((lib, index) => {
          return (
            <li key={index}>
              <Link href={lib.url}>
                <span className="underline hover:text-blue-600">
                  {lib.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-4 sm:px-6">
        <AwesomeSlider bullets={false}>
          {project.images.map((image, index) => {
            return (
              <div key={index} className="pointer-events-auto">
                <Image
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  width={600}
                  height={600}
                />
              </div>
            );
          })}
        </AwesomeSlider>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <b>Stack: </b>
        {project.tags}
      </div>
    </div>
  );
};
