import { pgTable, serial, uniqueIndex, timestamp, text, integer, numeric } from 'drizzle-orm/pg-core';

/* 
    TODO:
    Create relationships between tables
    https://orm.drizzle.team/docs/rqb#declaring-relations
*/

// CREATE TABLE public."Project" (
//     id STRING NOT NULL,
//     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
//     "updatedAt" TIMESTAMP(3) NOT NULL,
//     name STRING NOT NULL,
//     subheader STRING NULL,
//     description STRING NULL,
//     url STRING NULL,
//     tags STRING NULL,
//     relevance FLOAT8 NULL DEFAULT 1.0:::FLOAT8,
//     "repoUrl" STRING NULL,
//     CONSTRAINT "Project_pkey" PRIMARY KEY (id ASC)
//   )

export const project = pgTable('project', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    name: text('name').notNull(),
    subheader: text('subheader'),
    description: text('description'),
    url: text('url'),
    tags: text('tags'),
    relevance: numeric('relevance'),
    repoUrl: text('repo_url'),
}, (project) => {
    return {
        uniqueIndex: uniqueIndex('project_pkey').on(project.id),
    };
});

// CREATE TABLE public."Lib" (
//     id STRING NOT NULL,
//     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
//     "updatedAt" TIMESTAMP(3) NOT NULL,
//     name STRING NOT NULL,
//     url STRING NOT NULL,
//     CONSTRAINT "Lib_pkey" PRIMARY KEY (id ASC)
//   )

export const lib = pgTable('lib', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    name: text('name').notNull(),
    url: text('url').notNull(),
}, (lib) => {
    return {
        uniqueIndex: uniqueIndex('lib_pkey').on(lib.id),
    };
});

// CREATE TABLE public."Image" (
//     id STRING NOT NULL,
//     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
//     "updatedAt" TIMESTAMP(3) NOT NULL,
//     url STRING NULL,
//     alt STRING NOT NULL,
//     title STRING NULL,
//     placeholder STRING NULL,
//     width INT4 NULL,
//     height INT4 NULL,
//     path STRING NULL,
//     "projectId" STRING NULL,
//     "ytUrl" STRING NULL,
//     CONSTRAINT "Image_pkey" PRIMARY KEY (id ASC),
//     CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON DELETE SET NULL ON UPDATE CASCADE
//   )

export const image = pgTable('image', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    url: text('url'),
    alt: text('alt').notNull(),
    title: text('title'),
    placeholder: text('placeholder'),
    width: integer('width'),
    height: integer('height'),
    path: text('path'),
    projectId: text('projectId'),
    ytUrl: text('ytUrl'),
}, (image) => {
    return {
        uniqueIndex: uniqueIndex('image_pkey').on(image.id),
    };
});