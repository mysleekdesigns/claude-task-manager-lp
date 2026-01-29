import { Hero, Features } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />

      {/* Spacer for footer visibility during development */}
      <div className="h-32" />
    </>
  );
}
