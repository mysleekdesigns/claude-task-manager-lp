"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type GradientVariant = "primary" | "secondary" | "rainbow";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: GradientVariant;
  animate?: boolean;
  glow?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

const gradientStyles: Record<GradientVariant, string> = {
  primary: "from-primary via-primary-glow to-cyan-300",
  secondary: "from-purple-400 via-pink-500 to-primary",
  rainbow: "from-cyan-400 via-purple-500 to-pink-500",
};

// Pre-create motion components outside render to avoid recreation on each render
const MotionSpan = motion.span;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;
const MotionH4 = motion.h4;
const MotionP = motion.p;

const motionComponents = {
  span: MotionSpan,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  h4: MotionH4,
  p: MotionP,
} as const;

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps & MotionProps>(
  (
    {
      className,
      variant = "primary",
      animate = false,
      glow = false,
      as = "span",
      children,
      ...props
    },
    ref
  ) => {
    const MotionComponent = motionComponents[as];

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          "bg-gradient-to-r bg-clip-text text-transparent",
          gradientStyles[variant],
          animate && "animate-gradient bg-[length:200%_auto]",
          glow && "text-glow",
          className
        )}
        initial={animate ? { backgroundPosition: "0% center" } : undefined}
        animate={
          animate ? { backgroundPosition: ["0% center", "200% center"] } : undefined
        }
        transition={
          animate
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : undefined
        }
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

GradientText.displayName = "GradientText";

export { GradientText, type GradientTextProps };
