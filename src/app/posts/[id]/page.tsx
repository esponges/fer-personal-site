import { Container } from "~/components/organisms/container";
import { getPostDetails } from "~/utils/posts";

import Markdown from "markdown-to-jsx";

const CustomElement = ({ children, type, ...props }: { children: React.ReactNode; type: 'strong' | 'p' | 'pre' | 'code'; props: HTMLElement }) => {

  switch (type) {
    case 'strong':
      return <strong {...props}>{children}</strong>;
    case 'p':
      return <p {...props}>{children}</p>;
    case 'pre':
      return <pre {...props}>{children}</pre>;
    case 'code':
      return <code {...props}>{children}</code>;
    default:
      return <p {...props}>{children}</p>;
  }
};

export default async function PostDetails({ params }: { params: { id: string } }) {
  const { body_markdown: markdown } = await getPostDetails(params.id);

  return (
    <Container textCenter={false}>
      <Markdown
        options={{
          overrides: {
            p: {
              component: CustomElement,
              props: {
                className: "text-md leading-7 my-4 md:my-6 dark:text-gray-300",
                type: 'p',
              },
            },
            pre: {
              component: CustomElement,
              props: {
                className: "rounded-md bg-gray-700 text-white p-4 my-4 md:my-6",
                type: 'pre',
              },
            },
            code: {
              component: CustomElement,
              props: {
                className: "text-sm bg-gray-700 text-white p-1 rounded-md",
                type: 'code',
              },
            },
            strong: {
              component: CustomElement,
              props: {
                className: "font-bold text-lg leading-7 my-4 md:my-6 dark:text-gray-300",
                type: 'strong',
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
