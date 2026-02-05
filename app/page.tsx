import dynamic from "next/dynamic";
import { Hero, Features } from "@/components/sections";

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-foreground/[0.06]" />
        <div className="h-5 w-80 animate-pulse rounded bg-foreground/[0.06]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl bg-foreground/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}

// Lazy load below-fold sections for better initial page load
const HowItWorks = dynamic(
  () =>
    import("@/components/sections/how-it-works").then((mod) => ({
      default: mod.HowItWorks,
    })),
  { loading: () => <SectionSkeleton /> }
);
const ProductShowcase = dynamic(
  () =>
    import("@/components/sections/product-showcase").then((mod) => ({
      default: mod.ProductShowcase,
    })),
  { loading: () => <SectionSkeleton /> }
);
const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((mod) => ({
      default: mod.Testimonials,
    })),
  { loading: () => <SectionSkeleton /> }
);
const Pricing = dynamic(
  () =>
    import("@/components/sections/pricing").then((mod) => ({
      default: mod.Pricing,
    })),
  { loading: () => <SectionSkeleton /> }
);
const CTA = dynamic(
  () =>
    import("@/components/sections/cta").then((mod) => ({ default: mod.CTA })),
  { loading: () => <SectionSkeleton /> }
);
const FAQ = dynamic(
  () =>
    import("@/components/sections/faq").then((mod) => ({ default: mod.FAQ })),
  { loading: () => <SectionSkeleton /> }
);

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Testimonials />
      <Pricing />
      <CTA />
      <FAQ />
    </>
  );
}
