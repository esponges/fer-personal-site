import { PageHeader } from "~/components/atoms/pageHeader";
import { Container } from "~/components/organisms/container";
import { getPostDetails } from "~/utils/posts";

import Markdown from 'markdown-to-jsx';

export default async function PostDetails({ params }: { params: { id: string } }) {
  const { body_markdown: markdown, body_html: html } = await getPostDetails(params.id);

  return (
    <Container>
      <Markdown>
        {markdown}
      </Markdown>
    </Container>
  );
}
