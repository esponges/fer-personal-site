import type { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return <div className="text-2xl font-bold">{children}</div>;
};
