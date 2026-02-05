"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const dismiss = () => setIsLoading(false);

    // Small delay after load for smooth transition
    const handleLoad = () => {
      setTimeout(dismiss, 600);
    };

    // Safety timeout: always dismiss after 3s max
    const maxTimeout = setTimeout(dismiss, 3000);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(maxTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <MotionDiv
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0.1 : 0.5,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          }}
        >
          {/* Logo mark with animation */}
          <div className="flex flex-col items-center gap-6">
            {/* Animated logo / spinner */}
            <MotionDiv
              className="relative flex h-16 w-16 items-center justify-center"
              animate={
                shouldReduceMotion
                  ? {}
                  : { rotate: 360 }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              {/* Animated arc */}
              <MotionDiv
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
                animate={
                  shouldReduceMotion
                    ? {}
                    : { rotate: 360 }
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Inner glow dot */}
              <MotionDiv
                className="h-3 w-3 rounded-full bg-primary"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 10px rgba(6, 182, 212, 0.3)",
                          "0 0 20px rgba(6, 182, 212, 0.6)",
                          "0 0 10px rgba(6, 182, 212, 0.3)",
                        ],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </MotionDiv>

            {/* Loading bar */}
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-primary/10">
              <MotionDiv
                className="h-full rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                initial={{ x: "-100%" }}
                animate={
                  shouldReduceMotion
                    ? { x: "0%" }
                    : { x: ["-100%", "100%"] }
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

export { PageLoader };
