import { pgTable, serial, uniqueIndex, varchar, timestamp, text, integer, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* 
    TODO:
    Confirm this works?
    Inspired from: https://github.com/drizzle-team/drizzle-orm/issues/468
*/

// model Account {
//     id                String  @id @default(cuid())
//     userId            String
//     type              String
//     provider          String
//     providerAccountId String
//     refresh_token     String? // @db.Text
//     access_token      String? // @db.Text
//     expires_at        Int?
//     token_type        String?
//     scope             String?
//     id_token          String? // @db.Text
//     session_state     String?
//     user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

//     @@unique([provider, providerAccountId])
//   }

export const accounts = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }),
    type: text("type"),
    provider: varchar("provider", { length: 50 }), // Changed to VARCHAR with length 50
    providerAccountId: varchar("provider_account_id", { length: 100 }), // Changed to VARCHAR with length 100
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: timestamp("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (accs) => ({
    userIdIndex: uniqueIndex("user_id_idx").on(accs.userId),
    providerIndex: uniqueIndex("provider_idx").on(accs.provider),
    providerAccountIdIndex: uniqueIndex("provider_account_id_idx").on(accs.providerAccountId),
  })
);

// model User {
//     id            String    @id @default(cuid())
//     name          String?
//     email         String?   @unique
//     emailVerified DateTime?
//     image         String?
//     accounts      Account[]
//     sessions      Session[]
//   }

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
});

// model Session {
//     id           String   @id @default(cuid())
//     sessionToken String   @unique
//     userId       String
//     expires      DateTime
//     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   }

export const sessions = pgTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    sessionToken: text("session_token"),
    userId: text("user_id"),
    expires: timestamp("expires"),
  },
  (s) => ({
    sessionTokenIndex: uniqueIndex("session_token_idx").on(s.sessionToken),
    // to confirm
    userIdIndex: uniqueIndex("user_id_idx").on(s.userId),
  })
);

// model VerificationToken {
//     identifier String
//     token      String   @unique
//     expires    DateTime

//     @@unique([identifier, token])
//   }

export const verificationTokens = pgTable(
  // to confirm or verificationTokens label
  "verification_tokens",
  {
    identifier: text("identifier"),
    token: text("token"),
    expires: timestamp("expires"),
  },
  // to confirm
  (vTokens) => ({
    identifierTokenIndex: uniqueIndex("identifier_token_idx").on(vTokens.identifier, vTokens.token),
  })
);

// model Image {
//     id          String   @id @default(cuid())
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//     url         String?
//     alt         String
//     title       String?
//     placeholder String?
//     width       Int?
//     height      Int?
//     // imagekey relative path
//     path        String?
//     ytUrl       String?
//     Project     Project? @relation(fields: [projectId], references: [id])
//     projectId   String?
//   }

export const images = pgTable(
  "images",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    url: text("url"),
    alt: text("alt"),
    title: text("title"),
    placeholder: text("placeholder"),
    width: integer("width"),
    height: integer("height"),
    path: text("path"),
    ytUrl: text("yt_url"),
    projectId: text("project_id"),
  },
  (imgs) => ({
    projectIdIndex: uniqueIndex("project_id_idx").on(imgs.projectId),
  })
);

// model Lib {
//     id        String   @id @default(cuid())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     name      String
//     url       String
//     // many to many project to lib
//     Project   Project[]
//   }

export const libs = pgTable(
  "libs",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    name: text("name"),
    url: text("url"),
  },
  (ls) => ({
    nameIndex: uniqueIndex("name_idx").on(ls.name),
  })
);

// model Project {
//     id          String   @id @default(cuid())
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//     name        String
//     subheader   String?
//     description String?
//     url         String?
//     tags        String?
//     relevance   Float?  @default(1)
//     images      Image[]
//     libs        Lib[]
//     repoUrl     String?
//   }

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    name: text("name"),
    subheader: text("subheader"),
    description: text("description"),
    url: text("url"),
    tags: text("tags"),
    relevance: numeric("relevance"),
    repoUrl: text("repo_url"),
  },
  (projs) => ({
    nameIndex: uniqueIndex("name_idx").on(projs.name),
  })
);

export const langChainDocs = pgTable("LangChainDocs", {
  id: varchar("id").primaryKey(),
  createdAt: text("createdAt"),
  name: text("name"),
  nameSpace: text("nameSpace"),
});

export const langChainDocRelations = relations(langChainDocs, ({ many }) => ({
  docs: many(docs),
}));

export const docs = pgTable("Docs", {
  id: varchar("id").primaryKey(),
  createdAt: text("createdAt"),
  metadata: text("metadata"),
  pageContent: text("pageContent"),
  name: text("name"),
  langChainDocsId: text("langChainDocsId"),
});

export const docsRelations = relations(docs, ({ one }) => ({
  langChainDocs: one(langChainDocs, {
    fields: [docs.langChainDocsId],
    references: [langChainDocs.id],
  }),
}));
