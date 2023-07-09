import React from "react";

export const Container = ({ children, textCenter = true }: { children: React.ReactNode; textCenter?: boolean }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className={`mx-auto mt-10 max-w-3xl ${textCenter ? "text-center" : ""}`}>{children}</div>
    </div>
  );
};
