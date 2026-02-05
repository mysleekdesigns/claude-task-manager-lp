"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does the AI task management work?",
    answer:
      "Claude Task Manager uses advanced AI to analyze your tasks, deadlines, and work patterns. It automatically categorizes and prioritizes your work, suggests optimal scheduling, and provides actionable insights to boost your productivity. The AI learns from your preferences over time to deliver increasingly personalized recommendations.",
  },
  {
    question: "Can I use Claude Task Manager with my existing tools?",
    answer:
      "Yes! Claude Task Manager integrates with popular tools including Slack, GitHub, Jira, Google Calendar, and more. Our API also allows you to build custom integrations. Enterprise plans include dedicated integration support for proprietary tools.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption, SOC 2 Type II compliance, and enterprise-grade security measures. Your data is stored in secure cloud infrastructure with regular backups. Enterprise plans include additional security features like SSO, SAML authentication, and audit logs.",
  },
  {
    question: "What happens when I reach my task limit on the free plan?",
    answer:
      "On the free plan, you can manage up to 50 active tasks. Once you reach the limit, you can archive completed tasks to make room for new ones, or upgrade to Pro for unlimited tasks. We'll always notify you before you hit the limit so there are no surprises.",
  },
  {
    question: "How does real-time collaboration work?",
    answer:
      "Team members can share workspaces, assign tasks, leave comments, and track progress together in real-time. Changes sync instantly across all devices. The AI also provides team-level insights, helping managers identify bottlenecks and optimize resource allocation.",
  },
  {
    question: "Can I try Pro features before committing?",
    answer:
      "Yes! We offer a 14-day free trial of the Pro plan with full access to all features. No credit card required to start. At the end of the trial, you can choose to upgrade or continue with the free plan — your data is never lost.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free users get access to our community forum and help documentation. Pro users receive priority email support with 24-hour response times. Enterprise customers get a dedicated account manager, priority support with 4-hour response times, and custom onboarding.",
  },
];

function FAQAccordion({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "overflow-hidden rounded-xl border transition-colors",
        isOpen
          ? "border-primary/20 bg-primary/[0.02]"
          : "border-white/[0.06] bg-background-secondary/20 hover:border-white/10"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-sm font-medium transition-colors sm:text-base",
            isOpen ? "text-foreground" : "text-foreground/80"
          )}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-primary" : "text-foreground-muted"
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" },
              opacity: { duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : 0.1 },
            }}
          >
            <div className="px-5 pb-4 sm:px-6 sm:pb-5">
              <p className="text-sm leading-relaxed text-foreground-muted">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" padding="xl" animation="fade">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.p>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="text-foreground">Frequently asked </span>
          <GradientText variant="primary" animate glow>
            questions
          </GradientText>
        </motion.h2>

        <motion.p
          className="text-lg text-foreground-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to know about Claude Task Manager.
        </motion.p>
      </div>

      {/* FAQ list */}
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqItems.map((item, index) => (
          <FAQAccordion
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
