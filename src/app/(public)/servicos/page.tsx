"use client";

import { Smartphone, Laptop, BarChart, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const services = [
    {
        title: "Assistência Apple Premium",
        description: "Especialistas em iPhone, MacBook e iPad. Peças de alta qualidade e serviço expresso com garantia.",
        icon: Smartphone,
        link: "/servicos/assistencia-iphone",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        hoverColor: "group-hover:text-blue-600",
        features: ["Reparos Rápidos", "Peças Originais/Premium", "Garantia de 90 dias"]
    },
    {
        title: "Desenvolvimento Web & App",
        description: "Criação de sites de alta conversão, e-commerces e sistemas personalizados para o seu negócio.",
        icon: Laptop,
        link: "/servicos/desenvolvimento-web",
        color: "bg-purple-50 text-purple-600 border-purple-100",
        hoverColor: "group-hover:text-purple-600",
        features: ["Sites Ultra Rápidos", "Foco em UX/UI", "SEO Nativo"]
    },
    {
        title: "Tráfego Pago & Estratégia",
        description: "Gestão profissional de Google Ads e Meta Ads para escalar suas vendas e gerar leads qualificados.",
        icon: BarChart,
        link: "/servicos/trafego-pago",
        color: "bg-green-50 text-green-600 border-green-100",
        hoverColor: "group-hover:text-green-600",
        features: ["Google Ads", "Meta Ads", "Relatórios Mensais"]
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden">
            {/* Hero Hub - Enhanced with Background Image */}
            <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_bg_tech.png"
                        alt="Services Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-white" />
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
                    <ScrollReveal delay={0.2} width="100%">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                            Soluções Completas <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Para Sua Evolução Digital
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                            Da manutenção do seu device Apple à estratégia de escala do seu negócio. Escolha o pilar que você precisa hoje.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services Grid - With Animations */}
            <section className="py-20 lg:py-32 relative">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                    >
                        {services.map((service, index) => (
                            <motion.div key={index} variants={item} className="h-full">
                                <Link
                                    href={service.link}
                                    className="group relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center h-full overflow-hidden"
                                >
                                    {/* Card Hover Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col items-center h-full w-full">
                                        <div className={`w-16 h-16 ${service.color} border rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            <service.icon className="w-7 h-7" />
                                        </div>

                                        <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${service.hoverColor} transition-colors duration-300`}>
                                            {service.title}
                                        </h3>

                                        <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                                            {service.description}
                                        </p>

                                        <ul className="space-y-3 mb-10 w-full">
                                            {service.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center justify-center gap-2 text-sm text-slate-600 font-semibold bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
                                                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${service.hoverColor.replace('group-hover:text-', 'text-')}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto flex items-center justify-center gap-2 text-primary font-bold uppercase text-[10px] tracking-[0.2em]">
                                            Detalhes do Serviço <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Ready CTA - Enhanced */}
            <section className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
                {/* Abstract Shapes/Images */}
                <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Não sabe por onde começar?</h2>
                        <p className="text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed">
                            Nossa equipe técnica pode te ajudar com uma consultoria gratuita para identificar sua maior necessidade no momento.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contato">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 border-0 h-14 px-10 rounded-2xl font-bold text-base w-full sm:w-auto shadow-lg shadow-white/10 transition-all hover:scale-105">
                                    Falar com Especialista
                                </Button>
                            </Link>
                            <Link href="/contato?servico=outros">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white h-14 px-10 rounded-2xl font-bold text-base w-full sm:w-auto transition-all"
                                >
                                    Mais Informações
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
