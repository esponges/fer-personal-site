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

const overrideCustomElement = (type: keyof HTMLElementTagNameMap, className: string) => {
  const language = className.replace("lang-", "");
  console.log(language);

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
export default async function PostDetails({ params }: { params: { id: string } }) {
  const { body_markdown: markdown, title } = await getPostDetails(params.id);

  return (
    <Container textCenter={false}>
      <PageHeader title={title} />
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
    </Container>
  );
}
