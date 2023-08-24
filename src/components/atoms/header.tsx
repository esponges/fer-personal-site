import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Header = ({
  children,
  className = "dark:text-white",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("text-2xl font-bold", className)}>{children}</div>
  );
};
