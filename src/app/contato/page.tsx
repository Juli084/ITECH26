
"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, MessageCircle, Clock, Instagram, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary selection:text-white">

            {/* 1. Hero Section - Refinado e Legível */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_bg_tech.png"
                        alt="Background Tech"
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950" />
                </div>

                <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Fale com a <span className="text-blue-400">iTech</span> <br className="sm:hidden" /> Soluções Digitais
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Atendimento especializado para transformar seus projetos em realidade. Escolha o canal ideal abaixo.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            {/* 2. Grid de Canais de Contato Centralizados (2 Colunas) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">

                        {/* WhatsApp */}
                        <FadeInUp delay={0.1}>
                            <Link
                                href="https://wa.me/5515997534529"
                                target="_blank"
                                className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500 h-full"
                            >
                                <div className="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 shadow-inner">
                                    <MessageCircle className="h-10 w-10" />
                                </div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">WhatsApp Business</h3>
                                <p className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">(15) 99753-4529</p>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">Atendimento instantâneo para dúvidas e suporte técnico rápido.</p>
                                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-widest">
                                    Chamar agora <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </Link>
                        </FadeInUp>

                        {/* E-mail */}
                        <FadeInUp delay={0.2}>
                            <div className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-500 h-full">
                                <div className="h-20 w-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-8 shadow-inner">
                                    <Mail className="h-10 w-10" />
                                </div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">E-mail Corporativo</h3>
                                <p className="text-sm font-bold text-slate-900 mb-4 break-all">contato@itechsolucoesdigitais.com</p>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">Ideal para orçamentos formais e propostas de parcerias detalhadas.</p>
                                <div className="mt-8 flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-widest">
                                    Enviar Mensagem
                                </div>
                            </div>
                        </FadeInUp>
                    </div>

                    {/* 3. Formulário Centralizado */}
                    <FadeInUp delay={0.4}>
                        <div className="max-w-4xl mx-auto">
                            <div className="relative group p-1 rounded-[3rem] bg-gradient-to-b from-slate-100 to-transparent">
                                <div className="bg-white border border-slate-100 rounded-[2.8rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
                                    <div className="text-center mb-16">
                                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Solicitar Orçamento</h2>
                                        <p className="text-slate-500 font-medium text-lg">Preencha o formulário e tenha uma análise humanizada em até 24h.</p>
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </section>
        </div>
    );
}
