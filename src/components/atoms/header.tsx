import type { ReactNode } from "react";

export const Header = ({ children, className = "dark:text-white" }: { children: ReactNode; className?: string }) => {
  return <div className={`text-2xl font-bold ${className || ""}`}>{children}</div>;
};
