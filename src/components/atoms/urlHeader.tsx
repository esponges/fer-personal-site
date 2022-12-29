import Link from "next/link";

export const UrlHeader = ({ url }: { url: string }) => {
  return (
    <h2 className="text-2xl font-bold">
      <Link href={url} passHref>
        <span className="underline hover:text-blue-600">{url}</span>
      </Link>
    </h2>
  );
};
