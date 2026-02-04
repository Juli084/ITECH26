import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { ServiceProcess } from "./components/ServiceProcess";
import { ServiceDashboard } from "./components/ServiceDashboard";
import { ServiceDelivery } from "./components/ServiceDelivery";
import { ServiceAudience } from "./components/ServiceAudience";
import { Metadata } from "next";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Gestão de Tráfego Pago (Ads) | iTech",
    description: "Escale suas vendas com Google Ads e Meta Ads. Gestão profissional focada em ROI e resultados reais.",
};

export default function TrafegoPagoPage() {
    return (
        <main className="min-h-screen">
            <ServiceHero
                badgeIcon={<TrendingUp className="h-4 w-4 text-green-400" />}
                badgeText="Foco Total em ROI"
                title={<>Transformamos tráfego pago em <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">vendas previsíveis</span> para o seu negócio.</>}
                subtitle="Não buscamos curtidas. Gerenciamos Google Ads e Meta Ads com um único objetivo: Colocar dinheiro no seu caixa."
                imageSrc="/images/trafego_pago_hero_bg.png"
                imageAlt="Growth Analytics Background"
                ctaLink="/contato?servico=traffic"
                whatsappMessage="Olá, gostaria de saber mais sobre Tráfego Pago."
            />
            <ServiceProcess />
            <ServiceDashboard />
            <ServiceDelivery />
            <ServiceAudience />
            <ServiceCTA
                title="Pare de queimar dinheiro com anúncios errados."
                description="Fale agora com um especialista em tráfego e descubra o potencial real o seu negócio."
                ctaLink="/contato?servico=traffic"
                whatsappMessage="Olá, gostaria de saber mais sobre Tráfego Pago."
            />
        </main>
    );
}
