import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iTech Soluções Digitais – Tecnologia, Tráfego Pago e Assistência Apple em Sorocaba",
  description: "A iTech Soluções Digitais é um hub completo de tecnologia em Sorocaba, especializado em assistência técnica Apple, desenvolvimento de sites e sistemas e gestão de tráfego pago.",
};

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
