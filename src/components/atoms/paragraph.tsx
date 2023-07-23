import type { ReactNode } from "react";

export const Paragraph = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`my-4 text-base ${className || ""}`}>{children}</div>;
};
