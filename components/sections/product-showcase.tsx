"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Sparkles,
  BarChart3,
  CheckCircle2,
  Clock,
  Circle,
  Users,
  Calendar,
  ArrowUpRight,
  Bell,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

// Floating annotation data
interface Annotation {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  position: string;
  delay: number;
  duration: number;
}

const annotations: Annotation[] = [
  {
    icon: Zap,
    label: "AI Suggestions",
    value: "24 today",
    color: "text-primary",
    position: "-left-6 top-[15%] lg:-left-12",
    delay: 0.6,
    duration: 5,
  },
  {
    icon: Users,
    label: "Team Active",
    value: "12 online",
    color: "text-green-400",
    position: "-right-6 top-[25%] lg:-right-12",
    delay: 0.8,
    duration: 4.5,
  },
  {
    icon: Bell,
    label: "Notifications",
    value: "3 new",
    color: "text-yellow-400",
    position: "-left-4 bottom-[20%] lg:-left-10",
    delay: 1.0,
    duration: 5.5,
  },
];

// Mock data for the detailed product view
const sidebarItems = [
  { label: "Dashboard", active: true },
  { label: "My Tasks", active: false },
  { label: "Projects", active: false },
  { label: "Team", active: false },
  { label: "Analytics", active: false },
];

const projectTasks = [
  {
    title: "Redesign landing page",
    assignee: "AK",
    status: "done" as const,
    priority: "High",
    dueDate: "Today",
  },
  {
    title: "API v2 migration plan",
    assignee: "SL",
    status: "done" as const,
    priority: "High",
    dueDate: "Today",
  },
  {
    title: "User research interviews",
    assignee: "MJ",
    status: "active" as const,
    priority: "Medium",
    dueDate: "Tomorrow",
  },
  {
    title: "Performance optimization",
    assignee: "RK",
    status: "active" as const,
    priority: "High",
    dueDate: "Wed",
  },
  {
    title: "Write test coverage",
    assignee: "AK",
    status: "pending" as const,
    priority: "Medium",
    dueDate: "Thu",
  },
  {
    title: "Design system tokens",
    assignee: "SL",
    status: "pending" as const,
    priority: "Low",
    dueDate: "Fri",
  },
];

function FloatingAnnotation({
  annotation,
}: {
  annotation: Annotation;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute z-20", annotation.position)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: shouldReduceMotion ? 0 : [0, -8, 0],
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        opacity: { duration: 0.5, delay: annotation.delay },
        scale: { duration: 0.5, delay: annotation.delay },
        y: {
          duration: annotation.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: annotation.delay,
        },
      }}
    >
      <div className="glass flex items-center gap-3 rounded-lg px-3 py-2 shadow-lg">
        <annotation.icon className={cn("h-4 w-4 shrink-0", annotation.color)} />
        <div>
          <div className="text-[10px] text-foreground-muted">{annotation.label}</div>
          <div className="text-xs font-medium text-foreground">{annotation.value}</div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductMockup() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-primary/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-background-secondary/80 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="ml-3 flex-1 text-center">
          <span className="text-xs text-foreground-muted/60">
            Claude Task Manager — Project Dashboard
          </span>
        </div>
      </div>

      {/* App layout: sidebar + main content */}
      <div className="flex min-h-[400px] lg:min-h-[480px]">
        {/* Sidebar */}
        <div className="hidden w-44 shrink-0 border-r border-white/[0.06] bg-background-secondary/40 p-3 sm:block">
          {/* Workspace header */}
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/[0.06] px-2.5 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">My Workspace</span>
          </div>

          {/* Nav items */}
          <div className="space-y-0.5">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs",
                  item.active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground-muted/70 hover:text-foreground-muted"
                )}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Storage indicator */}
          <div className="mt-6 rounded-lg border border-white/[0.06] bg-background/50 p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] text-foreground-muted">Storage</span>
              <span className="text-[10px] text-primary">67%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-background-tertiary">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 lg:p-5">
          {/* Header row */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Project Alpha</h3>
              <p className="text-[10px] text-foreground-muted">6 tasks · 2 completed</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Team avatars */}
              <div className="flex -space-x-1.5">
                {["AK", "SL", "MJ", "RK"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-gradient-to-br from-primary/50 to-purple-500/50 text-[8px] font-bold text-foreground"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex h-6 items-center rounded-md border border-white/[0.08] bg-background-secondary/50 px-2">
                <Calendar className="mr-1 h-3 w-3 text-foreground-muted/60" />
                <span className="text-[10px] text-foreground-muted">This week</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mb-4 grid grid-cols-3 gap-2 lg:gap-3">
            {[
              { label: "Completed", value: "2", change: "+1 today", icon: CheckCircle2, color: "text-green-400" },
              { label: "In Progress", value: "2", change: "On track", icon: Clock, color: "text-yellow-400" },
              { label: "Insights", value: "5", change: "2 new", icon: BarChart3, color: "text-primary" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/[0.06] bg-background-secondary/40 p-2.5 lg:p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                  <span className="text-[9px] text-foreground-muted/60">{stat.change}</span>
                </div>
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Task table header */}
          <div className="mb-1.5 grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 text-[10px] font-medium text-foreground-muted/60">
            <span>Task</span>
            <span className="hidden sm:inline w-14 text-center">Priority</span>
            <span className="hidden sm:inline w-14 text-center">Due</span>
            <span className="w-8" />
          </div>

          {/* Task list */}
          <div className="space-y-1">
            {projectTasks.map((task, i) => (
              <motion.div
                key={task.title}
                className="group grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-lg border border-white/[0.04] bg-background-secondary/30 px-3 py-2.5 transition-colors hover:border-white/[0.08] hover:bg-background-secondary/50"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  delay: shouldReduceMotion ? 0 : i * 0.05,
                }}
              >
                {/* Task info */}
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {task.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400/70" />
                  ) : task.status === "active" ? (
                    <Clock className="h-4 w-4 shrink-0 text-yellow-400/70" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-foreground-muted/40" />
                  )}
                  <span
                    className={cn(
                      "truncate text-xs",
                      task.status === "done"
                        ? "text-foreground-muted/60 line-through"
                        : "text-foreground/90"
                    )}
                  >
                    {task.title}
                  </span>
                  {/* Assignee avatar */}
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background-tertiary text-[8px] font-medium text-foreground-muted">
                    {task.assignee}
                  </div>
                </div>

                {/* Priority */}
                <span
                  className={cn(
                    "hidden sm:inline-block w-14 text-center rounded-full px-2 py-0.5 text-[9px] font-medium",
                    task.priority === "High"
                      ? "bg-red-500/10 text-red-400/80"
                      : task.priority === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400/80"
                        : "bg-foreground-muted/10 text-foreground-muted/60"
                  )}
                >
                  {task.priority}
                </span>

                {/* Due date */}
                <span className="hidden sm:inline-block w-14 text-center text-[10px] text-foreground-muted/60">
                  {task.dueDate}
                </span>

                {/* Action */}
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground-muted/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* AI insight bar */}
          <motion.div
            className="mt-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              delay: shouldReduceMotion ? 0 : 0.4,
            }}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-[10px] text-primary/80">
              Claude suggests: Reassign &quot;Performance optimization&quot; to AK — they finished early and have
              bandwidth.
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: mockup moves up slightly as user scrolls
  const mockupY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <SectionWrapper
      id="product"
      padding="xl"
      animation="fade"
    >
      <div ref={containerRef}>
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            Product Preview
          </motion.p>

          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Everything you need,{" "}
            <GradientText as="span" variant="primary" animate>
              one dashboard
            </GradientText>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-lg text-foreground-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A powerful workspace where AI meets task management. Collaborate with
            your team, track progress, and let Claude handle the heavy lifting.
          </motion.p>
        </div>

        {/* Product mockup with parallax and floating annotations */}
        <div className="relative mx-auto max-w-5xl">
          {/* Background glow behind mockup */}
          <div className="absolute -inset-8 rounded-3xl bg-primary/[0.04] blur-3xl" />
          <div className="absolute -inset-4 rounded-3xl bg-primary/[0.02] blur-xl" />

          {/* Floating annotation cards */}
          {annotations.map((annotation) => (
            <FloatingAnnotation
              key={annotation.label}
              annotation={annotation}
            />
          ))}

          {/* Mockup with parallax */}
          <motion.div
            className="relative"
            style={{ y: shouldReduceMotion ? 0 : mockupY }}
          >
            {/* Animated glow border */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      boxShadow: [
                        "0 0 20px rgba(6, 182, 212, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.02)",
                        "0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.04)",
                        "0 0 20px rgba(6, 182, 212, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.02)",
                      ],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <ProductMockup />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
