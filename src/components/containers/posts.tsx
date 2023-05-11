import { getPosts } from "~/utils/posts";
import { Posts as PostElements } from "../organisms/posts";

export default async function Posts() {
  const posts = await getPosts();

  return <PostElements posts={posts} />;
}
