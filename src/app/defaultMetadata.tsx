import { Metadata, ResolvingMetadata } from "next";

type Props = {
  title?: string;
  description?: string;
};

export async function generateMetadata ({ title, description }: Props = {}): Promise<Metadata> {
  return {
    title: title || "Fer Tostado's Personal site",
    description: description || "Welcome to my realm!"
  }
}
