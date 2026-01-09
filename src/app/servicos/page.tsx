import { Smartphone, Laptop, BarChart, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Nossos Serviços | iTech Soluções Digitais",
    description: "Conheça nossas soluções em assistência Apple, desenvolvimento de software e tráfego pago.",
};

const services = [
    {
        title: "Assistência Apple Premium",
        description: "Especialistas em iPhone, MacBook e iPad. Peças de alta qualidade e serviço expresso com garantia.",
        icon: Smartphone,
        link: "/servicos/assistencia-iphone",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        features: ["Reparos Rápidos", "Peças Originais/Premium", "Garantia de 90 dias"]
    },
    {
        title: "Desenvolvimento Web & App",
        description: "Criação de sites de alta conversão, e-commerces e sistemas personalizados para o seu negócio.",
        icon: Laptop,
        link: "/servicos/desenvolvimento-web",
        color: "bg-purple-50 text-purple-600 border-purple-100",
        features: ["Sites Ultra Rápidos", "Foco em UX/UI", "SEO Nativo"]
    },
    {
        title: "Tráfego Pago & Estratégia",
        description: "Gestão profissional de Google Ads e Meta Ads para escalar suas vendas e gerar leads qualificados.",
        icon: BarChart,
        link: "/servicos/trafego-pago",
        color: "bg-green-50 text-green-600 border-green-100",
        features: ["Google Ads", "Meta Ads", "Relatórios Mensais"]
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Hub */}
            <section className="bg-white border-b py-24 lg:py-32">
                <div className="container mx-auto px-4 text-center max-w-5xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                        Soluções Completas <br />
                        <span className="text-primary">Para Sua Evolução Digital</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Da manutenção do seu device Apple à estratégia de escala do seu negócio. Escolha o pilar que você precisa hoje.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                href={service.link}
                                className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-2 flex flex-col items-center text-center h-full"
                            >
                                <div className={`w-14 h-14 ${service.color} border rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-sm group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                                    {service.description}
                                </p>

                                <ul className="space-y-3 mb-10 flex flex-col items-center">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase text-[10px] tracking-[0.2em]">
                                    Detalhes do Serviço <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ready CTA */}
            <section className="py-24 lg:py-32 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Não sabe por onde começar?</h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-12 font-medium leading-relaxed">
                        Nossa equipe técnica pode te ajudar com uma consultoria gratuita para identificar sua maior necessidade no momento.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contato">
                            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 h-14 px-8 rounded-2xl font-bold text-base w-full sm:w-auto">
                                Falar com Especialista
                            </Button>
                        </Link>
                        <Link href="/contato?servico=outros">
                            <Button
                                size="lg"
                                className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white h-14 px-8 rounded-2xl font-bold text-base w-full sm:w-auto transition-colors"
                            >
                                Mais Informações
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
