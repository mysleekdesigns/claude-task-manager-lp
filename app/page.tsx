import { Hero, Features, HowItWorks } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />

      {/* Spacer for footer visibility during development */}
      <div className="h-32" />
    </>
  );
}
