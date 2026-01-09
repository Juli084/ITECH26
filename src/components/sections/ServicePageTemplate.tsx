"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

interface ServicePageTemplateProps {
    title: string;
    subtitle: string;
    benefits: string[];
    features: string[];
    serviceParam: string;
    icon?: React.ReactNode;
}

export function ServicePageTemplate({
    title,
    subtitle,
    benefits,
    features,
    serviceParam,
    icon,
}: ServicePageTemplateProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border mb-6">
                                {icon}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                                {title}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                                {subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={`/contato?servico=${serviceParam}`}>
                                    <Button size="lg" className="h-14 px-8 text-lg gap-2">
                                        Solicitar Orçamento <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg" onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, gostaria de saber mais sobre ${title}`, '_blank')}>
                                    Falar no WhatsApp
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent hidden lg:block" />
            </section>

            {/* Benefits & Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* What we solve */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight">O que resolvemos</h2>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                        <span className="text-lg text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Why choose iTech */}
                        <div className="space-y-8 bg-slate-50 p-8 md:p-12 rounded-3xl border">
                            <h2 className="text-3xl font-bold tracking-tight">Por que a iTech?</h2>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2.5" />
                                        <span className="text-lg font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        Pronto para transformar seu projeto?
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Nossa equipe está pronta para oferecer o melhor atendimento e solução técnica para sua necessidade.
                    </p>
                    <Link href={`/contato?servico=${serviceParam}`}>
                        <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-bold">
                            Começar Agora
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
