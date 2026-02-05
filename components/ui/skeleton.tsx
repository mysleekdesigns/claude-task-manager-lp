"use client";

import { type HTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

function Skeleton({
  className,
  variant = "text",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses = "relative overflow-hidden bg-foreground/[0.06] rounded";

  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl",
  };

  const shimmer = shouldReduceMotion ? {} : {
    backgroundPosition: ["200% 0", "-200% 0"],
  };

  const shimmerTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  };

  const shimmerStyle = {
    backgroundImage:
      "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.04) 20%, rgba(6, 182, 212, 0.08) 50%, rgba(6, 182, 212, 0.04) 80%, transparent 100%)",
    backgroundSize: "200% 100%",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <MotionDiv
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4"
            )}
            style={{
              width: i === lines - 1 ? "75%" : width,
              height,
              ...shimmerStyle,
            }}
            animate={shimmer}
            transition={{
              ...shimmerTransition,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <MotionDiv
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width,
        height,
        ...shimmerStyle,
      }}
      animate={shimmer}
      transition={shimmerTransition}
    />
  );
}

// Pre-composed skeleton patterns for common use cases

function SkeletonCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton variant="rectangular" className="h-40 w-full" />
      <Skeleton variant="text" className="h-5 w-3/4" />
      <Skeleton variant="text" lines={2} />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton variant="text" className="h-4 w-24" />
      </div>
    </div>
  );
}

function SkeletonFeatureCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton variant="circular" className="h-12 w-12" />
      <Skeleton variant="text" className="h-5 w-2/3" />
      <Skeleton variant="text" lines={3} />
    </div>
  );
}

function SkeletonTestimonial({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton variant="text" lines={3} />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-28" />
          <Skeleton variant="text" className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

function SkeletonPricingCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-8 space-y-6",
        className
      )}
      {...props}
    >
      <Skeleton variant="text" className="h-5 w-20" />
      <Skeleton variant="text" className="h-10 w-32" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <div className="space-y-3 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton variant="circular" className="h-5 w-5" />
            <Skeleton variant="text" className="h-4 w-full" />
          </div>
        ))}
      </div>
      <Skeleton variant="rectangular" className="h-11 w-full rounded-lg" />
    </div>
  );
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonFeatureCard,
  SkeletonTestimonial,
  SkeletonPricingCard,
  type SkeletonProps,
};
