"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FolderPlus,
  ListTodo,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Circle,
  Clock,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FolderPlus,
    title: "Create your workspace",
    description:
      "Set up your personalized workspace in seconds. Organize projects, teams, and goals all in one place.",
  },
  {
    number: 2,
    icon: ListTodo,
    title: "Add and organize tasks",
    description:
      "Quickly add tasks with natural language. Claude understands context and auto-categorizes everything.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Let Claude optimize",
    description:
      "AI analyzes your patterns, suggests priorities, and automates repetitive work so you can focus on what matters.",
  },
  {
    number: 4,
    icon: TrendingUp,
    title: "Track and achieve goals",
    description:
      "Visualize your progress with intelligent dashboards. Celebrate milestones and stay motivated.",
  },
];

function StepItem({ step, index }: { step: Step; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const isLast = index === steps.length - 1;

  return (
    <div className="relative flex gap-6 lg:gap-8">
      {/* Left column: number + vertical line */}
      <div className="flex flex-col items-center">
        {/* Step number circle */}
        <motion.div
          className={cn(
            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            "border-2 border-primary/40 bg-background text-lg font-bold text-primary"
          )}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4,
            delay: shouldReduceMotion ? 0 : index * 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {/* Glow pulse behind number */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
          <span className="relative">{step.number}</span>
        </motion.div>

        {/* Connecting vertical line */}
        {!isLast && (
          <div className="relative w-px flex-1 min-h-8">
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-primary/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.15 + 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            />
          </div>
        )}
      </div>

      {/* Right column: content */}
      <motion.div
        className={cn("pb-12", isLast && "pb-0")}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay: shouldReduceMotion ? 0 : index * 0.15 + 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {/* Icon + Title row */}
        <div className="flex items-center gap-3 pt-2">
          <step.icon className="h-5 w-5 text-primary/70" />
          <h3 className="text-xl font-semibold text-foreground">
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 max-w-md text-foreground-muted leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

const mockTasks = [
  { title: "Design system updates", status: "done", priority: "High" },
  { title: "API integration tests", status: "done", priority: "High" },
  { title: "User onboarding flow", status: "active", priority: "Medium" },
  { title: "Dashboard analytics", status: "pending", priority: "Medium" },
  { title: "Mobile responsive fixes", status: "pending", priority: "Low" },
];

function AppMockup() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Glow behind mockup */}
      <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />

      {/* App window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-primary/5">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-background-secondary/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="ml-3 flex-1 text-center">
            <span className="text-xs text-foreground-muted/60">Claude Task Manager</span>
          </div>
        </div>

        {/* App content */}
        <div className="p-4">
          {/* Stats row */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: "Completed", value: "12", icon: CheckCircle2, color: "text-green-400" },
              { label: "In Progress", value: "3", icon: Clock, color: "text-yellow-400" },
              { label: "Insights", value: "8", icon: BarChart3, color: "text-primary" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/[0.06] bg-background-secondary/50 p-3"
              >
                <stat.icon className={cn("mb-1 h-4 w-4", stat.color)} />
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div className="space-y-1.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground-muted">Today&apos;s Tasks</span>
              <span className="text-[10px] text-primary">View all</span>
            </div>
            {mockTasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-background-secondary/30 px-3 py-2.5"
              >
                {task.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400/70" />
                ) : task.status === "active" ? (
                  <Clock className="h-4 w-4 shrink-0 text-yellow-400/70" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-foreground-muted/40" />
                )}
                <span
                  className={cn(
                    "flex-1 text-xs",
                    task.status === "done"
                      ? "text-foreground-muted/60 line-through"
                      : "text-foreground/90"
                  )}
                >
                  {task.title}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[9px] font-medium",
                    task.priority === "High"
                      ? "bg-red-500/10 text-red-400/80"
                      : task.priority === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400/80"
                        : "bg-foreground-muted/10 text-foreground-muted/60"
                  )}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>

          {/* AI suggestion bar */}
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-[10px] text-primary/80">
              Claude suggests: Focus on &quot;User onboarding flow&quot; next for maximum impact.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" padding="xl" className="bg-background-secondary/30">
      {/* Section header */}
      <div className="mb-16">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.p>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Get started in minutes
        </motion.h2>

        <motion.p
          className="max-w-xl text-lg text-foreground-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Four simple steps to transform your productivity with the power of
          AI.
        </motion.p>
      </div>

      {/* Two column layout: timeline + mockup */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Left: Steps timeline */}
        <div>
          {steps.map((step, index) => (
            <StepItem key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Right: App mockup */}
        <div className="hidden lg:block">
          <AppMockup />
        </div>
      </div>
    </SectionWrapper>
  );
}
