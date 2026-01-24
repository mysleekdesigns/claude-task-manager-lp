import { Hero } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Spacer for footer visibility during development */}
      <div className="h-32" />
    </>
  );
}
