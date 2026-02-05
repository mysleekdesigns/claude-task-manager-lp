"use client";

import { useCallback, useTransition } from "react";

/**
 * Hook that wraps state updates in the View Transitions API
 * when supported by the browser, falling back gracefully.
 *
 * Uses React 19.2's startTransition for concurrent rendering
 * combined with the native View Transitions API for cross-fade effects.
 */
function useViewTransition() {
  const [isPending, startTransition] = useTransition();

  const startViewTransition = useCallback(
    (callback: () => void) => {
      // Check for View Transitions API support
      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        document.startViewTransition(() => {
          startTransition(callback);
        });
      } else {
        // Fallback: just use React transition
        startTransition(callback);
      }
    },
    [startTransition]
  );

  return { isPending, startViewTransition };
}

export { useViewTransition };
