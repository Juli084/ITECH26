import { ServiceHero } from "./components/ServiceHero";
import { ServiceDashboard } from "./components/ServiceDashboard";
import { ServiceAudience } from "./components/ServiceAudience";
import { ServiceProcess } from "./components/ServiceProcess";
import { ServiceCTA } from "./components/ServiceCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tráfego Pago e Gestão de Anúncios | iTech Soluções Digitais",
    description: "Gestão estratégica de tráfego pago no Google e Meta Ads para gerar leads e vendas. Fale com a iTech.",
};

export default function TrafegoPagoPage() {
    return (
        <main className="min-h-screen">
            <ServiceHero />
            <ServiceDashboard />
            <ServiceAudience />
            <ServiceProcess />
            <ServiceCTA />
        </main>
    );
}
