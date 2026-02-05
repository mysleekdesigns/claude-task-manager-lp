"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FolderPlus,
  ListTodo,
  Sparkles,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  glowColor: string;
  borderGlow: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FolderPlus,
    title: "Create your workspace",
    description:
      "Set up your personalized workspace in seconds. Organize projects, teams, and goals all in one place.",
    iconColor: "text-primary",
    glowColor: "rgba(6, 182, 212, 0.4)",
    borderGlow: "rgba(6, 182, 212, 0.3)",
  },
  {
    number: 2,
    icon: ListTodo,
    title: "Add and organize tasks",
    description:
      "Quickly add tasks with natural language. Claude understands context and auto-categorizes everything.",
    iconColor: "text-yellow-400",
    glowColor: "rgba(250, 204, 21, 0.4)",
    borderGlow: "rgba(250, 204, 21, 0.3)",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Let Claude optimize",
    description:
      "AI analyzes your patterns, suggests priorities, and automates repetitive work so you can focus on what matters.",
    iconColor: "text-purple-400",
    glowColor: "rgba(192, 132, 252, 0.4)",
    borderGlow: "rgba(192, 132, 252, 0.3)",
  },
  {
    number: 4,
    icon: TrendingUp,
    title: "Track and achieve goals",
    description:
      "Visualize your progress with intelligent dashboards. Celebrate milestones and stay motivated.",
    iconColor: "text-green-400",
    glowColor: "rgba(74, 222, 128, 0.4)",
    borderGlow: "rgba(74, 222, 128, 0.3)",
  },
];

function ConnectingArrow({
  index,
  glowColor,
}: {
  index: number;
  glowColor: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Desktop: horizontal arrow */}
      <motion.div
        className="hidden shrink-0 lg:flex items-center justify-center px-2"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          delay: shouldReduceMotion ? 0 : index * 0.15 + 0.3,
        }}
      >
        <ChevronRight
          className="h-5 w-5"
          style={{ color: glowColor }}
        />
      </motion.div>

      {/* Mobile: vertical arrow */}
      <motion.div
        className="flex shrink-0 items-center justify-center py-2 lg:hidden"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          delay: shouldReduceMotion ? 0 : index * 0.1 + 0.2,
        }}
      >
        <ChevronDown
          className="h-5 w-5"
          style={{ color: glowColor }}
        />
      </motion.div>
    </>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isLast = index === steps.length - 1;

  return (
    <>
      <motion.div
        className="flex-1 min-w-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: shouldReduceMotion ? 0 : index * 0.15,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <Card
          className={cn(
            "group relative overflow-hidden border-white/[0.08] bg-background-secondary/60 backdrop-blur-md",
            "transition-all duration-300",
            "hover:-translate-y-1"
          )}
          style={
            {
              "--step-glow": step.glowColor,
              "--step-border": step.borderGlow,
            } as React.CSSProperties
          }
        >
          {/* Top glow accent line */}
          <div
            className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(to right, transparent, ${step.glowColor}, transparent)`,
            }}
          />

          {/* Hover glow overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${step.glowColor.replace("0.4", "0.06")}, transparent 70%)`,
            }}
          />

          <CardContent className="relative flex flex-col items-center p-6 text-center">
            {/* Step number + icon */}
            <div className="relative mb-4">
              {/* Glow ring on hover */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: step.glowColor }}
              />

              {/* Icon container */}
              <div
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-xl",
                  "border border-white/10 bg-background/80"
                )}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-15"
                  style={{ backgroundColor: step.glowColor }}
                />
                <step.icon className={cn("relative h-7 w-7", step.iconColor)} />
              </div>

              {/* Step number badge */}
              <div
                className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  background: step.glowColor,
                  color: "#0a0a0f",
                }}
              >
                {step.number}
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-base font-semibold text-foreground">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-foreground-muted">
              {step.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Connecting arrow */}
      {!isLast && (
        <ConnectingArrow index={index} glowColor={step.glowColor} />
      )}
    </>
  );
}

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" padding="xl">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-foreground">Simple steps to </span>
            <GradientText variant="primary" animate glow>
              supercharge your workflow
            </GradientText>
          </h2>
        </motion.div>

        <motion.p
          className="text-lg text-foreground-muted sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get up and running in minutes. Four simple steps to transform your
          productivity.
        </motion.p>
      </div>

      {/* Steps */}
      <div className="mx-auto mt-16 w-full max-w-6xl px-4">
        <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
