import { ServiceHero } from "./components/ServiceHero";
import { ServiceWhatWeBuild } from "./components/ServiceWhatWeBuild";
import { ServiceAudience } from "./components/ServiceAudience";
import { ServiceWhy } from "./components/ServiceWhy";
import { ServiceCTA } from "./components/ServiceCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Desenvolvimento Web Profissional | iTech Soluções Digitais",
    description: "Desenvolvimento de sites e aplicações web sob medida, com foco em performance e resultado. Fale com a iTech.",
};

export default function DevWebPage() {
    return (
        <main className="min-h-screen">
            <ServiceHero />
            <ServiceWhatWeBuild />
            <ServiceAudience />
            <ServiceWhy />
            <ServiceCTA />
        </main>
    );
}
