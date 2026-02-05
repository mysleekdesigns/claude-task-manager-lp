"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="glass max-w-md rounded-2xl p-8">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="mb-6 text-foreground-muted">
          An unexpected error occurred. Please try again.
        </p>
        <AnimatedButton onClick={reset} glow>
          Try again
        </AnimatedButton>
      </div>
    </div>
  );
}
