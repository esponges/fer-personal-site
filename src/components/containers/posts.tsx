import { getPosts } from "~/utils/posts";
import { PostCard } from "../molecules/postCard";

export default async function Posts() {
  const posts = await getPosts();

  return posts?.map((post) => (
    <article key={post.id}>
      <PostCard
        title={post.title}
        description={post.description}
        canonical_url={post.canonical_url}
        cover_image={post.cover_image}
        social_image={post.social_image}
      />
    </article>
  ));
}
