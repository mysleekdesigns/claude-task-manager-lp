"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play, ArrowRight, Sparkles, Zap, Brain, Target } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { cn } from "@/lib/utils";

// Pre-computed particle positions for background animation (avoiding Math.random during render)
const PARTICLE_POSITIONS = [
  { left: 5, top: 10, duration: 3.2, delay: 0.1 },
  { left: 15, top: 25, duration: 4.1, delay: 0.5 },
  { left: 25, top: 5, duration: 3.8, delay: 1.2 },
  { left: 35, top: 45, duration: 4.5, delay: 0.3 },
  { left: 45, top: 15, duration: 3.3, delay: 1.8 },
  { left: 55, top: 55, duration: 4.2, delay: 0.7 },
  { left: 65, top: 30, duration: 3.6, delay: 1.5 },
  { left: 75, top: 70, duration: 4.8, delay: 0.2 },
  { left: 85, top: 20, duration: 3.4, delay: 1.1 },
  { left: 95, top: 50, duration: 4.3, delay: 0.9 },
  { left: 10, top: 80, duration: 3.9, delay: 1.7 },
  { left: 20, top: 60, duration: 4.0, delay: 0.4 },
  { left: 30, top: 85, duration: 3.5, delay: 1.3 },
  { left: 40, top: 35, duration: 4.6, delay: 0.6 },
  { left: 50, top: 75, duration: 3.7, delay: 1.9 },
  { left: 60, top: 40, duration: 4.4, delay: 0.8 },
  { left: 70, top: 90, duration: 3.1, delay: 1.4 },
  { left: 80, top: 65, duration: 4.7, delay: 1.0 },
  { left: 90, top: 8, duration: 3.0, delay: 1.6 },
  { left: 12, top: 95, duration: 4.9, delay: 0.0 },
];

// Floating element component for hero decorations
function FloatingElement({
  className,
  delay = 0,
  duration = 4,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: shouldReduceMotion ? 0 : [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated mesh/particle background
function AnimatedMeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15)_0%,_transparent_70%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {!shouldReduceMotion && (
        <>
          {PARTICLE_POSITIONS.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/40"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

// Hero illustration - Abstract app mockup with floating elements
function HeroIllustration() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-[400px] w-full lg:h-[500px]">
      {/* Main app mockup frame */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[320px] w-[480px] -translate-x-1/2 -translate-y-1/2 lg:h-[400px] lg:w-[600px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* App window frame */}
        <div className="glass relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          {/* Window header */}
          <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-background-secondary/50 px-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <div className="ml-4 h-5 w-48 rounded bg-background-tertiary/50" />
          </div>

          {/* App content mockup */}
          <div className="flex h-[calc(100%-40px)] gap-4 p-4">
            {/* Sidebar */}
            <div className="hidden w-48 flex-shrink-0 space-y-3 rounded-lg bg-background-secondary/30 p-3 sm:block">
              <div className="h-4 w-24 rounded bg-primary/30" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-8 rounded bg-background-tertiary/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 space-y-3">
              {/* Task cards */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-background-secondary/40 p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full",
                      i === 0
                        ? "bg-primary/60"
                        : i === 1
                          ? "bg-purple-500/60"
                          : "bg-green-500/60"
                    )}
                  />
                  <div className="flex-1">
                    <div className="mb-1 h-3 w-3/4 rounded bg-foreground/20" />
                    <div className="h-2 w-1/2 rounded bg-foreground-muted/20" />
                  </div>
                  <div className="h-6 w-16 rounded bg-background-tertiary/50" />
                </motion.div>
              ))}

              {/* AI suggestion card */}
              <motion.div
                className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <div className="h-3 w-24 rounded bg-primary/30" />
                </div>
                <div className="h-2 w-full rounded bg-primary/20" />
                <div className="mt-1.5 h-2 w-3/4 rounded bg-primary/20" />
              </motion.div>
            </div>
          </div>

          {/* Glow overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 30px rgba(6, 182, 212, 0.1)",
                      "0 0 60px rgba(6, 182, 212, 0.2)",
                      "0 0 30px rgba(6, 182, 212, 0.1)",
                    ],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Floating annotation cards */}
      <FloatingElement
        className="-left-4 top-16 lg:left-8 lg:top-20"
        delay={0.8}
        duration={5}
      >
        <div className="glass flex items-center gap-2 rounded-lg px-3 py-2 shadow-lg">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-foreground">AI Powered</span>
        </div>
      </FloatingElement>

      <FloatingElement
        className="-right-4 top-24 lg:right-8 lg:top-28"
        delay={1}
        duration={4.5}
      >
        <div className="glass flex items-center gap-2 rounded-lg px-3 py-2 shadow-lg">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span className="text-xs font-medium text-foreground">Smart Priority</span>
        </div>
      </FloatingElement>

      <FloatingElement
        className="-left-2 bottom-24 lg:left-12 lg:bottom-28"
        delay={1.2}
        duration={5.5}
      >
        <div className="glass flex items-center gap-2 rounded-lg px-3 py-2 shadow-lg">
          <Target className="h-4 w-4 text-green-400" />
          <span className="text-xs font-medium text-foreground">Goal Tracking</span>
        </div>
      </FloatingElement>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* Background effects */}
      <AnimatedMeshBackground />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10">
        <SectionWrapper padding="xl" className="pt-12 lg:pt-20">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
            {/* Text content */}
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedBadge variant="primary" pulse className="mb-6">
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Now in Beta
                </AnimatedBadge>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-foreground">Task Management</span>
                  <GradientText
                    as="span"
                    variant="primary"
                    animate
                    glow
                    className="block"
                  >
                    Powered by AI
                  </GradientText>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="mb-8 max-w-xl text-lg text-foreground-muted sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Let Claude understand your workflow and intelligently prioritize
                your tasks. Focus on what matters while AI handles the
                complexity.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton size="lg" glow>
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
                <AnimatedButton size="lg" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </AnimatedButton>
              </motion.div>

              {/* Social proof */}
              <motion.div
                className="mt-8 flex items-center gap-4 text-sm text-foreground-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/60 to-purple-500/60"
                    />
                  ))}
                </div>
                <span>
                  Trusted by <span className="text-foreground">2,000+</span>{" "}
                  early adopters
                </span>
              </motion.div>
            </div>

            {/* Hero illustration */}
            <div className="flex-1">
              <HeroIllustration />
            </div>
          </div>
        </SectionWrapper>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-foreground-muted">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border border-foreground-muted/30 p-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
