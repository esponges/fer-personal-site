"use client";

import { usePagination } from "~/utils/hooks/usePagination";
import { PostCard } from "~/components/molecules/postCard";
import { Pagination } from "~/components/molecules/pagination";

import type { Post } from "~/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const POSTS_PER_PAGE = 4;

export const Posts = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const params = useSearchParams();
  const { toShow, currentPage, totalPages, handlePageChange: onPageChange } = usePagination<Post>({
    elementsPerPage: POSTS_PER_PAGE,
    elements: posts,
  });

  // if the page is not set, set it to 1, otherwise use the from the currentPage from pagination
  const queryPage = params?.get("page");
  useEffect(() => {
    if (!queryPage) {
      onPageChange(1);
      handlePageChange(1);
    } else {
      onPageChange(parseInt(queryPage));
    }
  }, [queryPage]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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
              id={post.id}
              slug={post.slug}
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
