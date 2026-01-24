"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "secondary" | "outline";
type BadgeSize = "sm" | "md" | "lg";

interface AnimatedBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pulse?: boolean;
  glow?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground border-border",
  primary: "bg-primary/20 text-primary border-primary/30",
  secondary: "bg-secondary text-secondary-foreground border-border",
  outline: "bg-transparent text-foreground border-border",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const AnimatedBadge = forwardRef<
  HTMLSpanElement,
  AnimatedBadgeProps & MotionProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      pulse = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-full border font-medium",
          variantStyles[variant],
          sizeStyles[size],
          glow && variant === "primary" && "shadow-[0_0_10px_rgba(6,182,212,0.3)]",
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {pulse && (
          <motion.span
            className="absolute -left-0.5 h-2 w-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        {pulse && <span className="ml-2" />}
        {children}
      </motion.span>
    );
  }
);

AnimatedBadge.displayName = "AnimatedBadge";

export { AnimatedBadge, type AnimatedBadgeProps };
