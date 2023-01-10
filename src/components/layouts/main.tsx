import { Navbar } from "~/components/layouts/navbar";
import { Footer } from "./footer";
import { useEffect, useState } from "react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);

  // fix hydration issue
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowLoaded(true);
    }
  }, []);

  if (!isWindowLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#093679] to-[#00d4ff] text-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
