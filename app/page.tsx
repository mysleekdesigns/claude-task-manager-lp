import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedBadge } from "@/components/ui/animated-badge";

export default function Home() {
  return (
    <>
      {/* Hero placeholder - demonstrates Phase 2 components */}
      <SectionWrapper padding="xl" className="pt-32">
        <div className="flex flex-col items-center text-center">
          <AnimatedBadge variant="primary" pulse className="mb-6">
            Now in Beta
          </AnimatedBadge>

          <GradientText
            as="h1"
            variant="primary"
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Claude Task Manager
          </GradientText>

          <p className="mb-8 max-w-2xl text-lg text-foreground-muted sm:text-xl">
            AI-powered task management that understands your workflow. Built
            with Claude to help you focus on what matters.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <AnimatedButton size="lg" glow>
              Get Started Free
            </AnimatedButton>
            <AnimatedButton size="lg" variant="outline">
              Watch Demo
            </AnimatedButton>
          </div>
        </div>
      </SectionWrapper>

      {/* Component showcase section */}
      <SectionWrapper padding="lg">
        <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
          Phase 2 Components Demo
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GlassCard>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Glass Card
            </h3>
            <p className="text-sm text-foreground-muted">
              Glassmorphism card with hover effects and animations.
            </p>
          </GlassCard>

          <GlassCard glow>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Glass Card with Glow
            </h3>
            <p className="text-sm text-foreground-muted">
              Same card with glow effect enabled.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Button Variants
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <AnimatedButton size="sm">Primary</AnimatedButton>
              <AnimatedButton size="sm" variant="secondary">
                Secondary
              </AnimatedButton>
              <AnimatedButton size="sm" variant="outline">
                Outline
              </AnimatedButton>
              <AnimatedButton size="sm" variant="ghost">
                Ghost
              </AnimatedButton>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Badge Variants
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <AnimatedBadge>Default</AnimatedBadge>
              <AnimatedBadge variant="primary">Primary</AnimatedBadge>
              <AnimatedBadge variant="outline">Outline</AnimatedBadge>
              <AnimatedBadge variant="primary" pulse>
                Pulse
              </AnimatedBadge>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Gradient Text
            </h3>
            <div className="mt-4 space-y-2">
              <GradientText variant="primary" className="block text-lg font-medium">
                Primary Gradient
              </GradientText>
              <GradientText variant="secondary" className="block text-lg font-medium">
                Secondary Gradient
              </GradientText>
              <GradientText variant="rainbow" className="block text-lg font-medium">
                Rainbow Gradient
              </GradientText>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Button Sizes
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <AnimatedButton size="sm">Small</AnimatedButton>
              <AnimatedButton size="md">Medium</AnimatedButton>
              <AnimatedButton size="lg">Large</AnimatedButton>
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* Spacer for footer visibility */}
      <div className="h-32" />
    </>
  );
}
