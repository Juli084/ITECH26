"use client";

import { CheckCircle2, Zap, HeartHandshake, Lightbulb } from "lucide-react";

const reasons = [
    {
        title: "Especialistas em Tecnologia",
        description: "Conhecimento técnico no ecossistema Apple, desenvolvimento web moderno e estratégias de tráfego pago baseadas em dados.",
        icon: Lightbulb,
    },
    {
        title: "Atendimento Transparente",
        description: "Comunicação clara em todas as etapas, prazos definidos e total acompanhamento do serviço.",
        icon: HeartHandshake,
    },
    {
        title: "Agilidade e Organização",
        description: "Processos bem definidos para garantir eficiência na entrega de reparos, sites e campanhas.",
        icon: Zap,
    },
    {
        title: "Garantia e Suporte",
        description: "Garantia nos serviços prestados e suporte pós-venda para garantir segurança e confiança.",
        icon: CheckCircle2,
    },
];

export function WhyChooseUs() {
    return (
        <section className="bg-muted/30 py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Por que escolher a iTech Soluções Digitais?</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Experiência técnica, atendimento claro e foco em resultado. <br className="hidden md:block" />
                        Trabalhamos para entregar soluções confiáveis tanto para clientes finais quanto para empresas que precisam de tecnologia e marketing digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border transition-transform hover:-translate-y-1">
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <reason.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
