"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
  avatarGradient: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Claude Task Manager completely transformed how our team handles sprints. The AI suggestions alone saved us 10+ hours per week on planning.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "Vercel",
    avatarInitials: "SC",
    avatarGradient: "from-cyan-400 to-blue-500",
  },
  {
    quote:
      "The smart priority scheduling is a game-changer. It feels like having a personal project manager that actually understands our workflow.",
    author: "Marcus Rodriguez",
    role: "Product Manager",
    company: "Stripe",
    avatarInitials: "MR",
    avatarGradient: "from-purple-400 to-pink-500",
  },
  {
    quote:
      "We tried every task management tool out there. This is the first one where AI actually delivers on its promise — not just a gimmick.",
    author: "Aisha Patel",
    role: "CTO",
    company: "Linear",
    avatarInitials: "AP",
    avatarGradient: "from-green-400 to-emerald-500",
  },
  {
    quote:
      "Real-time collaboration combined with AI insights makes this the best tool for distributed teams. Our productivity increased by 40%.",
    author: "James O'Brien",
    role: "Director of Ops",
    company: "Notion",
    avatarInitials: "JO",
    avatarGradient: "from-yellow-400 to-orange-500",
  },
  {
    quote:
      "The intelligent analytics helped us identify bottlenecks we didn't even know existed. It's like having a consultant on staff 24/7.",
    author: "Elena Kowalski",
    role: "VP Engineering",
    company: "Figma",
    avatarInitials: "EK",
    avatarGradient: "from-pink-400 to-rose-500",
  },
];

const companyLogos = ["Vercel", "Stripe", "Linear", "Notion", "Figma"];

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "glass relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
        isActive && "border-primary/20"
      )}
      layout
    >
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="h-8 w-8 text-primary/30" />
      </div>

      {/* Quote text */}
      <p className="mb-6 flex-1 text-base leading-relaxed text-foreground/90 sm:text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Avatar with glow ring */}
        <div className="relative">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
              testimonial.avatarGradient
            )}
          >
            {testimonial.avatarInitials}
          </div>
          {/* Glow ring */}
          <div
            className={cn(
              "absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br opacity-40 blur-sm",
              testimonial.avatarGradient
            )}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.author}
          </p>
          <p className="text-xs text-foreground-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, shouldReduceMotion, nextSlide]);

  // Get visible testimonials (current + neighbors for desktop)
  const getVisibleIndices = () => {
    const prev =
      (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <SectionWrapper id="testimonials" padding="xl" animation="fade">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.p>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="text-foreground">Loved by </span>
          <GradientText variant="primary" animate glow>
            teams everywhere
          </GradientText>
        </motion.h2>

        <motion.p
          className="text-lg text-foreground-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          See what engineering teams are saying about Claude Task Manager.
        </motion.p>
      </div>

      {/* Carousel */}
      <div
        className="relative mt-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Desktop: 3-card view */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleIndices.map((idx, position) => (
              <motion.div
                key={`${testimonials[idx].author}-${idx}`}
                initial={{ opacity: 0, scale: 0.9, x: position === 2 ? 50 : position === 0 ? -50 : 0 }}
                animate={{
                  opacity: position === 1 ? 1 : 0.6,
                  scale: position === 1 ? 1 : 0.95,
                  x: 0,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <TestimonialCard
                  testimonial={testimonials[idx]}
                  isActive={position === 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile/Tablet: single card view */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                isActive
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background-secondary/50 text-foreground-muted transition-colors hover:border-primary/30 hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-foreground-muted/30 hover:bg-foreground-muted/50"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background-secondary/50 text-foreground-muted transition-colors hover:border-primary/30 hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Company logos */}
      <motion.div
        className="mt-16 border-t border-white/5 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="mb-6 text-center text-sm text-foreground-muted/60">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {companyLogos.map((company, idx) => (
            <motion.span
              key={company}
              className="text-lg font-semibold text-foreground-muted/40 transition-colors hover:text-foreground-muted/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
              }}
            >
              {company}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
