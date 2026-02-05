"use client";

import { motion, useReducedMotion } from "motion/react";
import { Brain, CalendarClock, Users, BarChart3, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  glowColor: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI-Powered Task Management",
    description:
      "Let Claude analyze your tasks and automatically categorize, prioritize, and organize your workflow for maximum efficiency.",
    iconColor: "text-primary",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    icon: CalendarClock,
    title: "Smart Priority Scheduling",
    description:
      "Intelligent scheduling that adapts to your work patterns, deadlines, and energy levels throughout the day.",
    iconColor: "text-yellow-400",
    glowColor: "rgba(250, 204, 21, 0.4)",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work seamlessly with your team. Share tasks, assign responsibilities, and track progress together in real-time.",
    iconColor: "text-purple-400",
    glowColor: "rgba(192, 132, 252, 0.4)",
  },
  {
    icon: BarChart3,
    title: "Intelligent Insights & Analytics",
    description:
      "Gain deep insights into your productivity patterns with AI-generated reports and actionable recommendations.",
    iconColor: "text-green-400",
    glowColor: "rgba(74, 222, 128, 0.4)",
  },
];

function FeatureIcon({
  icon: Icon,
  iconColor,
  glowColor,
}: {
  icon: LucideIcon;
  iconColor: string;
  glowColor: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-xl",
        "bg-background-secondary/80 border border-white/10"
      )}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.05,
              boxShadow: `0 0 30px ${glowColor}`,
            }
      }
      transition={{ duration: 0.2 }}
    >
      {/* Icon glow background */}
      <div
        className="absolute inset-0 rounded-xl opacity-20 blur-sm"
        style={{ backgroundColor: glowColor }}
      />
      <Icon className={cn("relative h-7 w-7", iconColor)} />
    </motion.div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <GlassCard
        className="group h-full"
        padding="lg"
        hover
      >
        <div className="flex flex-col gap-4">
          <FeatureIcon
            icon={feature.icon}
            iconColor={feature.iconColor}
            glowColor={feature.glowColor}
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Features() {
  return (
    <SectionWrapper id="features" padding="xl">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-foreground">Everything you need to </span>
            <GradientText variant="primary" animate glow>
              work smarter
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
          Powerful features designed to transform how you manage tasks and
          collaborate with your team.
        </motion.p>
      </div>

      {/* Feature cards grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
