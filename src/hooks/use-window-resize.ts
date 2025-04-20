import { useState, useEffect } from "react";

/**
 * Custom React hook to get the current window size.
 *
 * @returns {{ width: number | undefined, height: number | undefined }}
 * An object containing the width and height of the window.
 * @example
 * const Component = () => {
 *   const { width, height } = useWindowResize();
 *   return (
 *     <div>
 *       <p>Width: {width}</p>
 *       <p>Height: {height}</p>
 *     </div>
 *   );
 * };
 */

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
