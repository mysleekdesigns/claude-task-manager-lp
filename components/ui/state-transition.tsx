"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

interface StateTransitionProps {
  /** Unique key to trigger re-animation when state changes */
  stateKey: string;
  children: ReactNode;
  className?: string;
  mode?: "wait" | "popLayout" | "sync";
  variant?: "fade" | "slideUp" | "slideDown" | "scale" | "crossfade";
  duration?: number;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  slideDown: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

function StateTransition({
  stateKey,
  children,
  className,
  mode = "wait",
  variant = "fade",
  duration = 0.25,
}: StateTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = transitionVariants[variant];
  const effectiveDuration = shouldReduceMotion ? 0 : duration;

  return (
    <AnimatePresence mode={mode}>
      <MotionDiv
        key={stateKey}
        className={className}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration: effectiveDuration,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
}

export { StateTransition, type StateTransitionProps };
