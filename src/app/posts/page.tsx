import { Container } from "~/components/organisms/container";
import { PageHeader } from "~/components/atoms/pageHeader";
import Posts from "~/components/containers/posts";
import { generateMetadata } from "~/app/defaultMetadata";

export const metadata = await generateMetadata({
  title: "Posts",
  description: "Stuff I learned and liked enough.",
});

// revalidate posts each 24
// been having problems using the next.revalidate option
// in the getPosts server side fetch
export const revalidate = 86400;

// eslint-disable-next-line @typescript-eslint/require-await
export default async function PostsPage() {
  return (
    <Container>
      <PageHeader
        title="Blog"
        description="I love to write about things I'm learning. 
            Blogging is a great way to improve and share knowledge.
            And who knows, maybe one day it might help me to write a book!"
      />
      <Posts />
    </Container>
  );
}
