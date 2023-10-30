"use client";

import { useReducer } from "react";
import Image from "next/image";
import Link from "next/link";
import { IKImage } from "imagekitio-react";

import type { Project } from "~/types";
import { BgColor } from "~/types/enums";

import { Header } from "~/components/atoms/header";
import { SubHeader } from "~/components/atoms/subheader";
import { Paragraph } from "~/components/atoms/paragraph";
import { UrlHeader } from "~/components/atoms/urlHeader";
import { Modal } from "~/components/organisms/modal";
import { Button } from "~/components/atoms/button";

import { env } from "~/env/client.mjs";

import { useDeviceWidth } from "~/utils/hooks/misc";
import { SocialMediaIcon } from "../atoms/socialMediaIcon";
import { Slider } from "./slider";

/* Experiment: let's try useReducer instead useState */

type State = {
  showImageModal: boolean;
  showImageIdx: number;
};

type Action = {
  type: "open" | "close" | "next";
  payload?: number;
};

const initialState: State = {
  showImageModal: false,
  showImageIdx: 0,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        showImageModal: true,
        showImageIdx: action.payload ?? 0,
      };
    case "close":
      return {
        ...state,
        showImageModal: false,
      };
    case "next":
      return {
        ...state,
        showImageIdx: action.payload ?? 0,
      };
    default:
      throw new Error('Invalid action type: ' + action.type);
  }
};

export const ProjectCard = ({ project }: { project: Project<false> }) => {
  const { isMobile } = useDeviceWidth();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenImageModal = (idx: number) => {
    dispatch({ type: "open", payload: idx });
  };

  const handleCloseImageModal = () => {
    dispatch({ type: "close", payload: 0 });
  };

  const handleNextImage = () => {
    const next = state.showImageIdx === project.images.length - 1 ? 0 : state.showImageIdx + 1;

    dispatch({ type: "next", payload: next });
  };

  const renderModalContent = () => (
    <>
      <IKImage
        urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL}
        path={project?.images?.[state.showImageIdx]?.path ?? ""}
      />
      {/* close & next img btns */}
      <div className="mx-auto">
        <Button
          onClick={handleCloseImageModal}
          className="mr-4"
        >
          Close
        </Button>
        <Button
          onClick={handleNextImage}
          className="ml-4"
        >
          Next
        </Button>
      </div>
    </>
  );

  return (
    <div className="card--bg overflow-hidden rounded-lg">
      {state.showImageModal && (
        <Modal
          onClose={handleCloseImageModal}
          isOpen={state.showImageModal}
          bgColor={BgColor.darkGray}
          outerCloseBtn
          maxWidth="md:max-w-3xl lg:min-w-[40%]"
        >
          {renderModalContent()}
        </Modal>
      )}
      <div className="px-4 py-5 sm:p-6">
        <Header>{project.name}</Header>
        {project.url && (
          <div className="my-6">
            <UrlHeader url={project.url} />
          </div>
        )}
        <SubHeader>{project.subheader}</SubHeader>
        <Paragraph className="dark:text-gray-400">
          {project.description}
        </Paragraph>
      </div>
      {/* if it has a repo url */}
      {project.repoUrl && (
        <div className="mx-2 mb-4 rounded-md border border-gray-200 px-4 py-4 sm:px-6">
          Check the code!
          {project.repoUrl.includes("github") && (
            <SocialMediaIcon
              url={project.repoUrl}
              icon="github"
              className="my-4"
            />
          )}
          <UrlHeader
            url={project.repoUrl}
            className="break-all"
          />
        </div>
      )}
      {project.images.length > 0 && (
        <div className="mb-6 rounded-lg px-4 py-4 sm:px-6 md:mb-0">
          {/* for ImageKit hosted pages */}
          <Slider
            autoPlay
            bullets={isMobile}
          >
            {project.images.map((image, index) => {
              // show youtube video - PoC
              // TODO: pass the correct w/h to the iframe depending on the device
              // if (image.ytUrl) {
              //   return (
              //     <div key={index}>
              //       <iframe
              //         width="300"
              //         height="150"
              //         src={'https://www.youtube.com/embed/8vnHJNjwuqg'}
              //         title={image.alt}
              //         allow="accelerometer; autoplay; clipboard-write;
              //                encrypted-media; gyroscope; picture-in-picture"
              //         allowFullScreen
              //       />
              //     </div>
              //   );
              // }

              if (image.path) {
                return (
                  <div
                    key={index}
                    onClick={() => handleOpenImageModal(index)}
                    className="cursor-pointer"
                  >
                    <IKImage
                      path={image.path}
                      urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL}
                    />
                  </div>
                );
              }

              if (image.url) {
                return (
                  <div key={index}>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      width={600}
                      height={600}
                    />
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      )}
      <SubHeader>Main libs used in this project:</SubHeader>
      <ul className="px-4 py-4 dark:text-gray-400 sm:px-6">
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
      <div className="px-4 py-4 dark:text-gray-400 sm:px-6">
        <b>Stack: </b>
        {project.tags}
      </div>
    </div>
  );
};
