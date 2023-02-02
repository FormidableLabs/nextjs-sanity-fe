import { useEffect, useState } from "react";

// https://tailwindcss.com/docs/responsive-design#overview
const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;

export const useDeviceSize = () => {
  const [size, setSize] = useState<{
    width?: number;
    height?: number;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
  }>({
    width: undefined,
    height: undefined,
    isSm: false,
    isMd: false,
    isLg: false,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;

      setSize({
        width,
        height: window.innerHeight,
        isSm: width < MD_BREAKPOINT,
        isMd: width >= SM_BREAKPOINT && width < LG_BREAKPOINT,
        isLg: width >= LG_BREAKPOINT,
      });
    };

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return size;
};
