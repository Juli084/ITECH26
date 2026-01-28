import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
    title: "iTech Soluções Digitais – Tecnologia, Tráfego Pago e Assistência Apple em Sorocaba",
    description: "A iTech Soluções Digitais é um hub completo de tecnologia em Sorocaba, especializado em assistência técnica Apple, desenvolvimento de sites e sistemas e gestão de tráfego pago.",
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollReveal className="w-full">
                <Hero />
            </ScrollReveal>

            <ScrollReveal className="w-full" delay={0.2}>
                <BentoGrid />
            </ScrollReveal>

            <ScrollReveal className="w-full" delay={0.2}>
                <WhyChooseUs />
            </ScrollReveal>

            <ScrollReveal className="w-full" delay={0.2}>
                <AboutTeaser />
            </ScrollReveal>
        </div>
    );
}
