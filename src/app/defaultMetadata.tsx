import type { Metadata} from "next";
import { ResolvingMetadata } from "next";

type Props = {
  title?: string;
  description?: string;
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata ({ title, description }: Props = {}): Promise<Metadata> {
  return {
    title: title || "Fer Tostado's Personal site",
    description: description || "Welcome to my realm!"
  };
}
