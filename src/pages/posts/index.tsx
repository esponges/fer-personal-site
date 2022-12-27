import Link from "next/link";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { Post } from "../../types"; 

const PostsPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const posts = props.posts;

  return (
    <div className="text-center mt-10">
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  // get the posts from the dev.to api
  const url = 'https://dev.to/api/articles?username=esponges';

  const res = await fetch(url);
  const posts = await res.json() as Post[];

  return {
    props: {
      posts,
    },
  };
};
