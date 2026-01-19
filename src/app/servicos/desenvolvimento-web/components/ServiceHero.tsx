"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceHero() {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[80vh] flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                <Image
                    src="/images/hero_bg_tech.png"
                    alt="Web Development Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-purple-500/30 px-3 py-1 text-sm text-purple-200 mb-6 backdrop-blur-md bg-purple-500/10"
                    >
                        <Code2 className="h-4 w-4 mr-2 text-purple-400" />
                        <span className="font-medium">Software House & Digital Studio</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-tight"
                    >
                        Desenvolvimento Web <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">sob medida</span> para o seu negócio.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
                    >
                        Criamos sites, sistemas e aplicações web modernas, rápidas e seguras, pensadas para gerar resultado real. Atendemos desde MVPs e sites institucionais até sistemas complexos e plataformas SaaS, sempre com foco em performance, escalabilidade e crescimento.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/contato?servico=web">
                            <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full w-full sm:w-auto bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all">
                                Solicitar proposta <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                            onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, gostaria de falar sobre um projeto de Desenvolvimento Web.`, '_blank')}
                        >
                            Falar no WhatsApp
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
