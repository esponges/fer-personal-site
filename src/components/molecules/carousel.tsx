import NextImage from "next/image";
import { useState } from "react";

import type { Image } from "~/types";

interface Props {
  elements: Image[];
}

export const Carousel = ({ elements }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === elements.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(elements.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleTransitionEnd = () => {
    setActiveIndex(0);
  };

  const images = elements.map((element, index) => {
    return (
      <NextImage
        key={index}
        src={element.url}
        alt={element.alt}
        className="h-full w-full object-cover"
        // placeholder="blur"
        // blurDataURL="/"
        width={600}
        height={600}
      />
    );
  });

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 mb-4 flex justify-center p-0">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-content-wrapper relative h-full w-full overflow-hidden">
        <div
          className="carousel-content flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          // onTransitionEnd={handleTransitionEnd}
        >
          {images}
          <div className="carousel-caption absolute hidden text-center md:block">
            <h5 className="text-xl">First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev 
        absolute top-0 bottom-0 left-0 flex items-center justify-center border-0 p-0 text-center 
        hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next 
        absolute top-0 bottom-0 right-0 flex items-center justify-center border-0 p-0 text-center 
        hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
