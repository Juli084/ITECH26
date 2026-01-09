"use client";

import { CheckCircle2, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

const reasons = [
    {
        title: "Especialistas Certificados",
        description: "Técnicos altamente capacitados em ecossistema Apple e desenvolvimento moderno.",
        icon: ShieldCheck,
    },
    {
        title: "Atendimento Transparente",
        description: "Você acompanha cada etapa. Sem letras miúdas, taxas escondidas ou surpresas.",
        icon: HeartHandshake,
    },
    {
        title: "Agilidade na Entrega",
        description: "Sabemos que seu tempo é valioso. Reparos e projetos entregues no prazo combinado.",
        icon: Zap,
    },
    {
        title: "Garantia Real",
        description: "Oferecemos garantia estendida em nossos serviços e suporte pós-venda dedicado.",
        icon: CheckCircle2,
    },
];

export function WhyChooseUs() {
    return (
        <section className="bg-muted/30 py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Por que escolher a iTech?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Não somos apenas mais uma assistência ou agência. Somos parceiros do seu sucesso digital.
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
