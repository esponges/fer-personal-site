import Link from "next/link";
import type { Post } from "~/types";

export const PostCard = (post: Partial<Post>) => {
  return (
    <Link href={post.canonical_url ?? '/#'}>
      <div className="my-10 flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <h3 className="text-2xl font-bold">{post.title}</h3>
        <div className="text-lg">{post.description}</div>
      </div>
    </Link>
  );
};
