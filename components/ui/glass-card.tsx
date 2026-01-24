"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps & MotionProps>(
  (
    {
      className,
      hover = true,
      glow = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass rounded-xl",
          paddingStyles[padding],
          glow && "glow",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={
          hover
            ? {
                y: -4,
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
                borderColor: "rgba(6, 182, 212, 0.3)",
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard, type GlassCardProps };
