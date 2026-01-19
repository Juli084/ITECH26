"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceHero() {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[85vh] flex flex-col justify-center bg-zinc-950">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image
                    src="/images/service_marketing.png"
                    alt="Growth Analytics Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-zinc-950/80" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-green-500/30 px-3 py-1 text-sm text-green-400 mb-8 backdrop-blur-md bg-green-500/10 hover:bg-green-500/20 transition-colors cursor-default">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            <span className="font-semibold tracking-wide uppercase text-xs">Foco Total em ROI</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                            Transformamos tráfego pago em <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">vendas previsíveis</span> para o seu negócio.
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed mx-auto max-w-2xl font-light">
                            Não buscamos curtidas. Gerenciamos Google Ads e Meta Ads com um único objetivo: <span className="text-zinc-200 font-medium">Colocar dinheiro no seu caixa.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link href="/contato?servico=traffic" className="w-full sm:w-auto">
                                <Button size="lg" className="h-16 px-10 text-lg font-bold gap-3 rounded-xl w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white shadow-[0_0_30px_-5px_rgba(22,163,74,0.4)] hover:shadow-[0_0_40px_-5px_rgba(22,163,74,0.6)] transition-all border-0 ring-0">
                                    Quero vender mais com tráfego pago <ArrowRight className="h-6 w-6" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Replaced with text if no icons available, or simple SVGs could be used here. For now, text representation of platform authority */}
                            <span className="text-zinc-500 font-semibold text-sm tracking-wider">SPECIALISTAS EM</span>
                            <div className="h-6 w-px bg-zinc-800" />
                            <span className="text-zinc-400 font-bold">Google Ads</span>
                            <span className="text-zinc-400 font-bold">Meta Ads</span>
                            <span className="text-zinc-400 font-bold">LinkedIn Ads</span>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
