import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { PageHeader } from "~/components/atoms/pageHeader";
import { Container } from "~/components/organisms/container";
import { getPostDetails } from "~/utils/posts";

export default async function PostDetails({ params }: { params: { id: string } }) {
  const { body_markdown: markdown, body_html: html } = await getPostDetails(params.id);

  return (
    <Container>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Container>
  );
}
