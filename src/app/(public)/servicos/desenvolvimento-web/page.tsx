import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { ServiceWhatWeBuild } from "./components/ServiceWhatWeBuild";
import { ServiceWhy } from "./components/ServiceWhy";
import { ServiceAudience } from "./components/ServiceAudience";
import { ProjectsCarousel } from "./components/ProjectsCarousel";
import { Metadata } from "next";
import { Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Desenvolvimento Web & Software House | iTech",
    description: "Sites de alta conversão, e-commerces e sistemas sob medida. Tecnologia de ponta para o seu negócio.",
};

const projects = [
    {
        id: 1,
        title: "E-commerce Premium",
        description: "Plataforma de alta conversão para varejo de moda.",
        imageUrl: "/images/project_ecommerce.jpg",
        projectUrl: null
    },
    {
        id: 2,
        title: "SaaS Financeiro",
        description: "Dashboard administrativo complexo para gestão de ativos.",
        imageUrl: "/images/project_saas.jpg",
        projectUrl: null
    },
    {
        id: 3,
        title: "Landing Page Imobiliária",
        description: "Geração de leads qualificados para lançamentos de alto padrão.",
        imageUrl: "/images/project_realestate.jpg",
        projectUrl: null
    }
];

export default function DesenvolvimentoWebPage() {
    return (
        <main className="min-h-screen">
            <ServiceHero
                badgeIcon={<Code2 className="h-4 w-4 text-purple-400" />}
                badgeText="Software House & Digital Studio"
                title={<>Desenvolvimento Web <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">sob medida</span> para o seu negócio.</>}
                subtitle="Criamos sites, sistemas e aplicações web modernas, rápidas e seguras, pensadas para gerar resultado real. Atendemos desde MVPs e sites institucionais até sistemas complexos e plataformas SaaS."
                imageSrc="/images/desenvolvimento_web_hero_bg.png"
                imageAlt="Web Development Background"
                ctaLink="/contato?servico=web"
                whatsappMessage="Olá, gostaria de falar sobre um projeto de Desenvolvimento Web."
            />
            <ServiceWhatWeBuild />
            <ProjectsCarousel projects={projects} />
            <ServiceAudience />
            <ServiceWhy />
            <ServiceCTA
                title="Vamos tirar sua ideia do papel?"
                description="Entre em contato, explique sua necessidade e nós cuidamos de toda a parte técnica — do planejamento à entrega."
                ctaLink="/contato?servico=web"
                whatsappMessage="Olá, gostaria de falar sobre um projeto de Desenvolvimento Web."
            />
        </main>
    );
}
