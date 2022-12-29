import type { ReactNode } from "react";

export const Paragraph = ({ children }: { children: ReactNode }) => {
  return <div className="text-base my-4">{children}</div>;
};
