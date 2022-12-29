import type { ReactNode } from "react";

export const SubHeader = ({ children }: { children: ReactNode }) => {
  return <div className="text-lg">{children}</div>;
};
