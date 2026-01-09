import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BentoGrid />
      <WhyChooseUs />
      <AboutTeaser />
    </div>
  );
}
