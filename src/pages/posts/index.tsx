import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import type { Post } from "~/types";

import { PostCard } from "~/components/molecules/postCard";
import { Container } from "~/components/organisms/container";
import { PageHeader } from "~/components/atoms/pageHeader";

const PostsPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const posts = props.posts;

  return (
    <Container>
      <PageHeader
        title="Posts"
        description="I love to write about things I'm learning. 
          Blogging is a great way to improve and share knowledge.
          And who knows, maybe one day it might help me to write a book!"
      />
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard
              title={post.title}
              description={post.description}
              canonical_url={post.canonical_url}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default PostsPage;

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  // get the posts from the dev.to api
  const url = "https://dev.to/api/articles?username=esponges";

  const res = await fetch(url);
  const posts = (await res.json()) as Post[];

  return {
    props: {
      posts,
    },
  };
};
