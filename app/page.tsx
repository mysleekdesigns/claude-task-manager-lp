import dynamic from "next/dynamic";
import { Hero, Features } from "@/components/sections";

// Lazy load below-fold sections for better initial page load
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((mod) => ({
    default: mod.HowItWorks,
  }))
);
const ProductShowcase = dynamic(() =>
  import("@/components/sections/ProductShowcase").then((mod) => ({
    default: mod.ProductShowcase,
  }))
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => ({
    default: mod.Testimonials,
  }))
);
const Pricing = dynamic(() =>
  import("@/components/sections/Pricing").then((mod) => ({
    default: mod.Pricing,
  }))
);
const CTA = dynamic(() =>
  import("@/components/sections/CTA").then((mod) => ({ default: mod.CTA }))
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((mod) => ({ default: mod.FAQ }))
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
