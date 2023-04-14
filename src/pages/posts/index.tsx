import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import type { Post } from '~/types';

import { PostCard } from '~/components/molecules/postCard';
import { Container } from '~/components/organisms/container';
import { PageHeader } from '~/components/atoms/pageHeader';
import { Pagination } from '~/components/molecules/pagination';
import { usePagination } from '~/utils/hooks/usePagination';

const POSTS_PER_PAGE = 4;

const PostsPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { posts } = props;

  const { toShow, currentPage, totalPages, handlePageChange } = usePagination<Post>({
    elementsPerPage: POSTS_PER_PAGE,
    elements: posts,
  });

  return (
    <>
      <Head>
        <title>Posts | FerTostado</title>
        <meta
          name="description"
          content="This is a list of all the posts I've written on dev.to."
        />
      </Head>
      <Container>
        <PageHeader
          title="Posts"
          description="I love to write about things I'm learning. 
            Blogging is a great way to improve and share knowledge.
            And who knows, maybe one day it might help me to write a book!"
        />
        {!!toShow.length ? (
          toShow.map((post) => (
            <article key={post.id}>
              <PostCard
                title={post.title}
                description={post.description}
                canonical_url={post.canonical_url}
                cover_image={post.cover_image}
                social_image={post.social_image}
              />
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found. Please try again later.</p>
        )}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default PostsPage;

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  // get the posts from the dev.to api
  const url = 'https://dev.to/api/articles?username=esponges';

  const res = await fetch(url);
  const posts = (await res.json()) as Post[];

  // order the posts by positive_reactions_count
  posts.sort((a, b) => b.positive_reactions_count - a.positive_reactions_count);

  return {
    props: {
      posts,
    },
  };
};
