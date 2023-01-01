import Image from "next/image";
import AwesomeSlider from "react-awesome-slider";
import Link from "next/link";
import { IKImage } from "imagekitio-react";

import type { Project } from "~/types";

import { Header } from "~/components/atoms/header";
import { SubHeader } from "~/components/atoms/subheader";
import { Paragraph } from "~/components/atoms/paragraph";

import { env } from "~/env/client.mjs";
import { UrlHeader } from "../atoms/urlHeader";
import { useDeviceWidth } from "~/utils/hooks/misc";
import { useState } from "react";
import { Modal } from "~/components/organisms/modal";
import { BgColor } from "~/types/enums";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  const { isMobile } = useDeviceWidth();

  const [showImageModal, setShowImageModal] = useState(false);
  const [showImageIdx, setShowImageIdx] = useState(0);

  const handleOpenImageModal = (idx: number) => {
    setShowImageIdx(idx);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="card--bg overflow-hidden rounded-lg">
      {showImageModal && (
        <Modal
          onClose={handleCloseImageModal}
          isOpen={showImageModal}
          bgColor={BgColor.darkGray}
          outerCloseBtn
        >
          <IKImage
            urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL}
            path={project?.images?.[showImageIdx]?.path ?? ""}
          />
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
      <div className="mb-6 rounded-lg px-4 py-4 sm:px-6 md:mb-0">
        {/* for ImageKit hosted pages */}
        <AwesomeSlider bullets={isMobile} startup>
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
            //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //         allowFullScreen
            //       />
            //     </div>
            //   );
            // }

            if (image.path) {
              return (
                <div key={index} onClick={() => handleOpenImageModal(index)} className='cursor-pointer'>
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
        </AwesomeSlider>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <b>Stack: </b>
        {project.tags}
      </div>
    </div>
  );
};
