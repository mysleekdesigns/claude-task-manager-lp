"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedButton } from "@/components/ui/animated-button";

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <SectionWrapper id="cta" padding="xl" animation="fade">
      <div ref={containerRef} className="relative">
        {/* CTA card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={shouldReduceMotion ? undefined : { y: backgroundY }}
          >
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-secondary to-purple-900/20" />

            {/* Animated orbs */}
            <motion.div
              className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, 40, 0],
                      y: [0, 30, 0],
                      scale: [1, 1.2, 1],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <motion.div
              className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, -40, 0],
                      y: [0, -30, 0],
                      scale: [1, 1.3, 1],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Start for free today
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-foreground">Ready to transform </span>
                <br className="hidden sm:block" />
                <GradientText variant="primary" animate glow>
                  your workflow?
                </GradientText>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="mb-10 text-lg text-foreground-muted sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Join thousands of teams using Claude Task Manager to work
                smarter, not harder. Get started in under a minute.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AnimatedButton size="lg" glow>
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  Schedule a Demo
                </AnimatedButton>
              </motion.div>

              {/* Trust line */}
              <motion.p
                className="mt-6 text-sm text-foreground-muted/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                No credit card required · Free plan available · Setup in 60
                seconds
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
