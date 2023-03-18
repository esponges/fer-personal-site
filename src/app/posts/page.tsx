import type { Post } from '~/types';

import { PostCard } from '~/components/molecules/postCard';
import { Container } from '~/components/organisms/container';
import { PageHeader } from '~/components/atoms/pageHeader';

const getPosts = async () => {
  const url = 'https://dev.to/api/articles?username=esponges';

  const res = await fetch(url);
  const posts = (await res.json()) as Post[];

  // order the posts by positive_reactions_count
  return posts.sort((a, b) => b.positive_reactions_count - a.positive_reactions_count);
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <Container>
        <PageHeader
          title="Posts"
          description="I love to write about things I'm learning. 
            Blogging is a great way to improve and share knowledge.
            And who knows, maybe one day it might help me to write a book!"
        />
        {posts?.map((post) => (
          <article key={post.id}>
            <PostCard
              title={post.title}
              description={post.description}
              canonical_url={post.canonical_url}
              cover_image={post.cover_image}
              social_image={post.social_image}
            />
          </article>
        ))}
      </Container>
    </>
  );
}
