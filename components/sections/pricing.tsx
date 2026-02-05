"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useViewTransition } from "@/lib/use-view-transition";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "Perfect for individuals getting started with AI task management.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 50 tasks",
      "Basic AI suggestions",
      "Single workspace",
      "7-day task history",
      "Community support",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    description: "For professionals and small teams who need the full AI experience.",
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      "Unlimited tasks",
      "Advanced AI priority scheduling",
      "Up to 10 workspaces",
      "Real-time collaboration (5 users)",
      "Intelligent analytics & insights",
      "Unlimited task history",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Enterprise",
    description: "For organizations that need advanced security and custom integrations.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "Everything in Pro",
      "Unlimited workspaces & users",
      "Custom AI model training",
      "SSO & SAML authentication",
      "Advanced security & audit logs",
      "API access & custom integrations",
      "Dedicated account manager",
      "99.9% SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

function PricingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-background-secondary/50 p-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <button
        onClick={() => !isYearly || onToggle()}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          !isYearly
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground-muted hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => isYearly || onToggle()}
        className={cn(
          "relative rounded-full px-4 py-2 text-sm font-medium transition-all",
          isYearly
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground-muted hover:text-foreground"
        )}
      >
        Yearly
        <span className="ml-1.5 rounded-full bg-green-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">
          -20%
        </span>
      </button>
    </motion.div>
  );
}

function PricingCard({
  plan,
  isYearly,
  index,
}: {
  plan: PricingPlan;
  isYearly: boolean;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {/* Popular badge */}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </div>
        </div>
      )}

      <motion.div
        className={cn(
          "glass relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
          plan.highlighted && "border-primary/30"
        )}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -4,
                boxShadow: plan.highlighted
                  ? "0 0 40px rgba(6, 182, 212, 0.2), 0 0 80px rgba(6, 182, 212, 0.05)"
                  : "0 0 30px rgba(6, 182, 212, 0.1)",
                borderColor: plan.highlighted
                  ? "rgba(6, 182, 212, 0.5)"
                  : "rgba(6, 182, 212, 0.2)",
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect for highlighted card */}
        {plan.highlighted && (
          <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-primary/10 blur-sm" />
        )}

        {/* Plan header */}
        <div className="mb-6">
          <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
          <p className="text-sm text-foreground-muted">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                className="text-4xl font-bold text-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                ${price}
              </motion.span>
            </AnimatePresence>
            {price > 0 && (
              <span className="text-foreground-muted">/month</span>
            )}
          </div>
          {isYearly && price > 0 && (
            <p className="mt-1 text-xs text-green-400">
              Billed annually (${price * 12}/year)
            </p>
          )}
          {price === 0 && (
            <p className="mt-1 text-xs text-foreground-muted">
              Free forever
            </p>
          )}
        </div>

        {/* CTA Button */}
        <AnimatedButton
          variant={plan.highlighted ? "primary" : "outline"}
          glow={plan.highlighted}
          className="mb-6 w-full"
        >
          {plan.cta}
        </AnimatedButton>

        {/* Features list */}
        <ul className="flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  plan.highlighted ? "text-primary" : "text-foreground-muted/60"
                )}
              />
              <span className="text-sm text-foreground-muted">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const { startViewTransition } = useViewTransition();

  const handleToggle = () => {
    startViewTransition(() => setIsYearly(!isYearly));
  };

  return (
    <SectionWrapper id="pricing" padding="xl" animation="fade">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Pricing
        </motion.p>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="text-foreground">Simple, </span>
          <GradientText variant="primary" animate glow>
            transparent pricing
          </GradientText>
        </motion.h2>

        <motion.p
          className="mb-8 text-lg text-foreground-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Start free, scale as you grow. No hidden fees, cancel anytime.
        </motion.p>

        {/* Toggle */}
        <PricingToggle
          isYearly={isYearly}
          onToggle={handleToggle}
        />
      </div>

      {/* Pricing cards */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isYearly={isYearly}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
