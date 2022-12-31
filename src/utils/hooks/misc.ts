import { useEffect, useState } from "react";

export const useDeviceWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  const isMobile = width <= 768;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, isMobile };
};
