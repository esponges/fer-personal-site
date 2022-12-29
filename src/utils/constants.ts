import type { Project } from "~/types";

export const PROJECTS: Project[] = [
  {
    name: "Polymail 💌",
    url: "https://polymail.io/",
    subheader: "An awesome email web app, also available as a desktop app with Electron.",
    description: "I'm the principal maintainer of Polymail, an email client for managing your email. \
    It relies on awesome caching & performance strategies such as using IndexedDB to store emails, \
    and a Web Worker to process emails in the background.",
    tags: "#React, #mongoDB, #IndexedDB, #WebWorker, #Electron",
    libs: [
      {
        name: "Redux",
        url: "https://www.npmjs.com/package/redux",
      },
      {
        name: "RxJS",
        url: "https://www.npmjs.com/package/rxjs",
      },
      {
        name: "Electron",
        url: "https://www.npmjs.com/package/electron",
      },
      {
        name: "React",
        url: "https://www.npmjs.com/package/react",
      }
    ],
    images: [
      {
        url: "https://reactnative.dev/img/header_logo.svg",
        alt: "Polymail Screenshot 2",
        path: "polymail-screen-1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672354515784"
      },
      {
        url: "https://reactjs.org/logo-og.png",
        alt: "Polymail Screenshot 2",
        path: "polymail-screen-2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672354703596",
      },
    ],
  },
  {
    name: "Roland Cloud CRM 🎹",
    url: "https://roland.com/",
    description: "I built and maintain the Roland Cloud CRM, it's a full stack web app with multiple microservices \
    for managing users and their internal data, such as products, subscriptions, managers, etc. \
    Roland Cloud is a cloud-based subscription service for the Roland products, \
    such as synthesizers, drum machines, and more.",
    tags: "#React, #Parse, #Redux, #MySQL, #NodeJS",
    libs: [
      {
        name: "React",
        url: "https://www.npmjs.com/package/react",
      },
      {
        name: "Redux",
        url: "https://www.npmjs.com/package/redux",
      },
      {
        name: "Parse",
        url: "https://www.npmjs.com/package/parse",
      },
      {
        name: "NodeJS",
        url: "https://www.npmjs.com/package/node",
      },
      {
        name: "knexJS",
        url: "https://www.npmjs.com/package/knex",
      },
    ],
    images: [
      {
        url: "https://reactjs.org/logo-og.png",
        alt: "Customer Views",
        path: "roland-crm-1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672354514473",
      },
      {
        url: "https://reactjs.org/favicon.ico",
        alt: "Product Views",
        path: "roland-crm-2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672354514444",
      },
    ],
  },
];
