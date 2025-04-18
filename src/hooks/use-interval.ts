import { useEffect, useRef } from "react";
import { useIsomorphicEffect } from "./use-isomorphic-effect";

/**
 * A custom hook that sets up an interval and executes a callback function at the specified delay.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The delay in milliseconds for the interval. If `null`, the interval is paused.
 *
 * @example
 * useInterval(() => {
 *   console.log("This will run every second");
 * }, 1000);
 *
 * // To pause the interval:
 * useInterval(() => {
 *   console.log("This will not run");
 * }, null);
 */

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback.
  useIsomorphicEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
