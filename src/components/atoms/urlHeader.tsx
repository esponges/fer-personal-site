import Link from "next/link";

export const UrlHeader = ({ url,  className = '' }: { url: string, className?: string }) => {
  return (
    <h2 className="text-2xl font-bold">
      <Link href={url} passHref>
        <span className={`underline hover:text-blue-600 ${className}`}>{url}</span>
      </Link>
    </h2>
  );
};
