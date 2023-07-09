import { Container } from "~/components/organisms/container";
import { getPostDetails } from "~/utils/posts";

import Markdown from "markdown-to-jsx";
import { createElement } from "react";
import { PageHeader } from "~/components/atoms/pageHeader";

type CustomElementProps = {
  children: React.ReactNode;
  type: keyof HTMLElementTagNameMap;
  props: HTMLElement;
};

const CustomElement = ({ children, type, ...props }: CustomElementProps) => {
  return createElement(type, props, children);
};

export default async function PostDetails({ params }: { params: { id: string } }) {
  const { body_markdown: markdown, title } = await getPostDetails(params.id);

  return (
    <Container textCenter={false}>
      <PageHeader title={title} />
      <Markdown
        options={{
          overrides: {
            p: {
              component: CustomElement,
              props: {
                className: "text-md leading-7 my-4 md:my-6 dark:text-gray-300",
                type: "p",
              },
            },
            pre: {
              component: CustomElement,
              props: {
                className: "rounded-md bg-gray-700 text-white p-4 my-4 md:my-6 overflow-x-auto",
                type: "pre",
              },
            },
            code: {
              component: CustomElement,
              props: {
                className: "text-sm bg-gray-700 text-white p-1 rounded-md",
                type: "code",
              },
            },
            strong: {
              component: CustomElement,
              props: {
                className: "font-bold text-lg leading-7 my-4 md:my-6 dark:text-gray-300",
                type: "strong",
              },
            },
            img: {
              component: CustomElement,
              props: {
                className: "rounded-md my-4 md:my-6 mx-auto",
                type: "img",
              },
            },
            ul: {
              component: CustomElement,
              props: {
                className: "list-disc list-inside my-4 md:my-6",
                type: "ul",
              },
            },
            a: {
              component: CustomElement,
              props: {
                className: "text-blue-500 underline hover:text-blue-600",
                type: "a",
              },
            },
            h1: {
              component: CustomElement,
              props: {
                className: "text-3xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300",
                type: "h1",
              },
            },
            h2: {
              component: CustomElement,
              props: {
                className: "text-2xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300",
                type: "h2",
              },
            },
            h3: {
              component: CustomElement,
              props: {
                className: "text-xl font-bold leading-7 my-4 md:my-6 dark:text-gray-300",
                type: "h3",
              },
            },
          },
        }}
      >
        {markdown}
      </Markdown>
    </Container>
  );
}
