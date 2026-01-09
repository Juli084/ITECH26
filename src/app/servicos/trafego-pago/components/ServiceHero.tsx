"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceHero() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-white border-b">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
                            Tráfego Pago para gerar leads e vendas de forma estratégica
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed mx-auto max-w-2xl">
                            Criamos e gerenciamos campanhas no Google e Meta Ads com foco em performance, não em promessas vazias.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/contato?servico=traffic">
                                <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full">
                                    Quero anunciar com estratégia <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg rounded-full"
                                onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, quero saber mais sobre Gestão de Tráfego Pago.`, '_blank')}
                            >
                                💬 Falar no WhatsApp
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 skew-x-12 translate-x-1/4" />
        </section>
    );
}
