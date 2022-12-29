import type { CarouselElement } from "~/types";

export const PROJECTS: CarouselElement[] = [
  {
    name: "React Native",
    description: "A framework for building native apps using React",
    stack: "React Navite, Mysql",
    libs: [
      {
        name: "React Navigation",
        url: "https://reactnavigation.org/",
      },
      {
        name: "React Native Paper",
        url: "https://callstack.github.io/react-native-paper/",
      },
    ],
    url: "https://reactnative.dev/",
    images: [
      {
        url: "/771796.png",
        alt: "React Native Logo",
      },
      {
        url: "/56a8c2.png",
        alt: "React Native Logo",
      },
      {
        url: "/d32776.png",
        alt: "React Native Logo",
      },
      {
        url: "/b0f7cc.png",
        alt: "React Native Logo",
      },
    ],
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces",
    stack: "React, Mysql",
    libs: [
      {
        name: "React Router",
        url: "https://reactrouter.com/",
      },
      {
        name: "React Bootstrap",
        url: "https://react-bootstrap.github.io/",
      },
    ],
    url: "https://reactjs.org/",
    images: [
      {
        url: "https://reactjs.org/logo-og.png",
        alt: "React Logo",
      },
      {
        url: "https://reactjs.org/favicon.ico",
        alt: "React Logo",
      },
    ],
  },
];
