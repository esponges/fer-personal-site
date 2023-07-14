import Link from "next/link";
import Image from "next/image";

import type { Post } from "~/types";
import { Header } from "~/components/atoms/header";
import { Paragraph } from "~/components/atoms/paragraph";

export const PostCard = (
  post: Pick<Post, "title" | "canonical_url" | "cover_image" | "description" | "social_image" | "id" | "slug">
) => {
  const detailsUrl = `/posts/${post.slug}?ref=${post.id}`;

  return (
    // <Link href={post.canonical_url}>
    <Link href={detailsUrl}>
      <div className="card--bg my-10 flex flex-col gap-4 rounded-xl p-4">
        <Header>{post.title}</Header>
        <Image
          src={post.cover_image ?? post.social_image ?? "/images/cover-placeholder.png"}
          alt={post.title}
          width={500}
          height={300}
          className="mx-auto my-4 rounded-xl"
          placeholder="blur"
          blurDataURL="/images/cover-placeholder.png"
        />
        <Paragraph>{post.description}</Paragraph>
      </div>
    </Link>
  );
};
