"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border",
  ghost:
    "bg-transparent text-foreground hover:bg-secondary/50 border-transparent",
  outline:
    "bg-transparent text-foreground hover:bg-secondary/30 border-border hover:border-primary/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      glow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          glow && variant === "primary" && "glow",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled}
        {...props}
      >
        {/* Ripple/glow effect overlay */}
        <motion.span
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
            background:
              variant === "primary"
                ? "radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, type AnimatedButtonProps };
