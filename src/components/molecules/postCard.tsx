import Link from "next/link";

import type { Post } from "~/types";
import { Header } from "~/components/atoms/header";
import { Paragraph } from "~/components/atoms/paragraph";

export const PostCard = (post: Partial<Post>) => {
  return (
    <Link href={post.canonical_url ?? '/#'}>
      <div className="my-10 flex flex-col gap-4 rounded-xl p-4 card--bg">
        <Header>
          {post.title}
        </Header>
        <Paragraph>
          {post.description}
        </Paragraph>
      </div>
    </Link>
  );
};
