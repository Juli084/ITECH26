import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { ServiceProblems } from "./components/ServiceProblems";
import { ServiceWhy } from "./components/ServiceWhy";
import { Metadata } from "next";
import { Smartphone } from "lucide-react";

export const metadata: Metadata = {
    title: "Assistência Técnica Especializada em iPhone | iTech",
    description: "Conserto de iPhone com diagnóstico rápido, transparência e atendimento especializado. Fale com a iTech.",
};

export default function AssistenciaIphonePage() {
    return (
        <main className="min-h-screen">
            <ServiceHero
                badgeIcon={<Smartphone className="h-4 w-4 text-primary" />}
                badgeText="Especialistas em Apple"
                title={<>Seu iPhone novo, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">de novo.</span></>}
                subtitle="Assistência técnica especializada com peças de alta qualidade, garantia real e laboratório próprio."
                imageSrc="/images/assistencia_hero_bg.png"
                imageAlt="iPhone Repair Service"
                ctaLink="/contato?servico=iphone"
                whatsappMessage="Olá, preciso de ajuda com meu iPhone."
            />
            <ServiceProblems />
            <ServiceWhy />
            <ServiceCTA
                title="Precisa resolver o problema do seu iPhone?"
                description="Entre em contato agora e receba uma avaliação rápida do seu aparelho."
                ctaLink="/contato?servico=iphone"
                whatsappMessage="Olá, preciso de ajuda com meu iPhone."
            />
        </main>
    );
}
