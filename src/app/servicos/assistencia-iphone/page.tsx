import { ServiceHero } from "./components/ServiceHero";
import { ServiceProblems } from "./components/ServiceProblems";
import { ServiceWhy } from "./components/ServiceWhy";
import { ServiceCTA } from "./components/ServiceCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Assistência Técnica Especializada em iPhone | iTech",
    description: "Conserto de iPhone com diagnóstico rápido, transparência e atendimento especializado. Fale com a iTech.",
};

export default function AssistenciaIphonePage() {
    return (
        <main className="min-h-screen">
            <ServiceHero />
            <ServiceProblems />
            <ServiceWhy />
            <ServiceCTA />
        </main>
    );
}
