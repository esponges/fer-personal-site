'use client';

import { usePagination } from '~/utils/hooks/usePagination';
import { PostCard } from '~/components/molecules/postCard';
import { Pagination } from '~/components/molecules/pagination';

import type { Post } from '~/types';

const POSTS_PER_PAGE = 4;

export const Posts = ({ posts }: { posts: Post[] }) => {
  const { toShow, currentPage, totalPages, handlePageChange } = usePagination<Post>({
    elementsPerPage: POSTS_PER_PAGE,
    elements: posts,
  });

  return (
    <>
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
    </>
  );
};
