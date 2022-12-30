import { useEffect, useState } from "react";

export const useDeviceWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const isMobile = width <= 768;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, isMobile };
};
