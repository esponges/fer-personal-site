import type { Metadata, ResolvingMetadata } from "next";
// import Markdown from "markdown-to-jsx";
import { createElement, lazy } from "react";

import { Container } from "~/components/organisms/container";
import { PageHeader } from "~/components/atoms/pageHeader";
import { getPostDetails } from "~/utils/posts";
import Image from "next/image";

// do not import directly to avoid
const Markdown = lazy(() => import("markdown-to-jsx"));

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = searchParams.ref as string;

  // fetch data
  const details = await getPostDetails(id);

  const { title, description, tags, user, url } = details ?? {};

  // optionally access and extend (rather than replace) parent metadata
  return {
    title: title ?? "Post not found",
    description: description ?? "Post not found",
    authors: [
      {
        name: user?.name ?? "Unknown",
        url: !!user ? `https://github.com/${user.github_username}` : undefined,
      },
    ],
    keywords: tags ?? [],
    alternates: {
      canonical: url ?? "https://dev.to/",
    },
  };
}

type CustomElementProps = {
  children: React.ReactNode;
  type: keyof HTMLElementTagNameMap;
  props: HTMLElement;
};

// to do: react-syntax-highlighter doesn't work with server components
// find a way to make it work
const overrideCustomElement = (type: keyof HTMLElementTagNameMap, className: string) => {
  return {
    component: CustomElement,
    props: {
      className,
      type,
    },
  };
};

const CustomElement = ({ children, type, ...props }: CustomElementProps) => {
  return createElement(type, props, children);
};

// todo: figure out if there's a way to use the slug instead of the id
// not sure if possible in RSCs directly yet
// id prefer this router to be posts/[slug]?id=123
export default async function PostDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ref: string };
}) {
  const details = await getPostDetails(searchParams.ref);

  if (!details) {
    // todo: improve error handling views
    return (
      <Container textCenter={false}>
        <PageHeader title="Post not found" />
        <p className="text-center text-gray-500">No post found. Please try again later.</p>
      </Container>
    );
  }

  const { body_markdown: markdown, title, url, cover_image: cover } = details;

  return (
    <Container textCenter={false}>
      <PageHeader title={title} />
      {cover ? (
        <Image
          src={cover}
          alt={title}
          width={500}
          height={300}
          className="mx-auto my-4 rounded-xl md:my-10"
          placeholder="blur"
          blurDataURL="/images/cover-placeholder.png"
        />
      ) : null}
      <Markdown
        options={{
          overrides: {
            p: overrideCustomElement("p", "text-md leading-7 my-4 md:my-6 dark:text-gray-300"),
            pre: overrideCustomElement("pre", "rounded-md bg-gray-700 text-white p-4 my-4 md:my-6 overflow-x-auto"),
            code: overrideCustomElement("code", "text-sm bg-gray-700 text-white p-1 rounded-md"),
            strong: overrideCustomElement("strong", "font-bold text-lg leading-7 my-4 md:my-6 dark:text-gray-300"),
            img: overrideCustomElement("img", "rounded-md my-4 md:my-6 mx-auto"),
            ul: overrideCustomElement("ul", "list-disc list-inside my-4 md:my-6"),
            a: overrideCustomElement("a", "text-blue-500 underline hover:text-blue-600"),
            h1: overrideCustomElement("h1", "text-3xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300"),
            h2: overrideCustomElement("h2", "text-2xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300"),
            h3: overrideCustomElement("h3", "text-xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300"),
          },
        }}
      >
        {markdown}
      </Markdown>
      {/* add a reference to the original post */}
      <p className="my-6 text-center text-gray-500 md:my-10">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          Read the original post on Dev.to
        </a>
      </p>
    </Container>
  );
}
