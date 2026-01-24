"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion, type MotionProps, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type AnimationVariant = "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  animation?: AnimationVariant;
  delay?: number;
  fullWidth?: boolean;
  container?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const paddingStyles = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

// Pre-create motion components outside render to avoid recreation on each render
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const motionComponents = {
  section: MotionSection,
  div: MotionDiv,
  article: MotionArticle,
} as const;

const SectionWrapper = forwardRef<
  HTMLElement,
  SectionWrapperProps & MotionProps
>(
  (
    {
      className,
      as = "section",
      animation = "slideUp",
      delay = 0,
      fullWidth = false,
      container = true,
      padding = "lg",
      children,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const MotionComponent = motionComponents[as];
    const variant = animationVariants[animation];

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          "relative w-full",
          paddingStyles[padding],
          className
        )}
        initial={shouldReduceMotion ? undefined : variant.initial}
        whileInView={shouldReduceMotion ? undefined : variant.animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        {...props}
      >
        {container ? (
          <div
            className={cn(
              "mx-auto px-4 sm:px-6 lg:px-8",
              fullWidth ? "max-w-full" : "max-w-7xl"
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </MotionComponent>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper, type SectionWrapperProps };
