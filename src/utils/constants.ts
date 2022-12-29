import type { Project } from "~/types";

export const PROJECTS: Project[] = [
  {
    name: "Polymail",
    subheader: "An awesome email web app, also available as a desktop app with Electron.",
    description: "I'm the principal maintainer of Polymail, an email client for managing your email. \
    It relies on awesome caching & performance strategies such as using IndexedDB to store emails, \
    and a Web Worker to process emails in the background.",
    tags: "#React, #mongoDB",
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
        url: "https://reactnative.dev/img/header_logo.svg",
        alt: "React Native Logo",
      },
      {
        url: "https://reactjs.org/logo-og.png",
        alt: "React Native Logo",
      },
      {
        url: "https://reactnative.dev/img/header_logo.svg",
        alt: "React Native Logo",
      },
    ],
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces",
    tags: "React, Mysql",
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
