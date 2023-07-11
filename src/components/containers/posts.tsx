import { getPosts } from "~/utils/posts";
import { Container } from "../organisms/container";
import { Posts as PostElements } from "../organisms/posts";

export default async function Posts() {
  const posts = await getPosts();

  if (!posts) {
    // todo: improve error handling views
    return <Container>Something went wrong. Please try again later.</Container>;
  }

  return <PostElements posts={posts} />;
}
