
"use client";

import { motion } from "framer-motion";
import {
    Gem,
    Search,
    Rocket,
    ChevronDown,
    ArrowRight,
    Smartphone,
    Code,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// --- Components ---

const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
    >
        {children}
    </motion.div>
);

const ValueCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <FadeInUp delay={delay}>
        <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group text-center"
        >
            <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tight">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
        </motion.div>
    </FadeInUp>
);

// --- Main Page ---

export default function AboutPage() {
    return (
        <div className="relative bg-white selection:bg-primary selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0 scale-105">
                    <img
                        src="/images/sobre_hero_bg.png"
                        alt="iTech Professional Workspace"
                        className="w-full h-full object-cover opacity-30 grayscale-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />
                </div>

                <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Sobre a <span className="text-primary italic">iTech</span> Soluções
                        </h1>
                        <p className="text-xl md:text-3xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                            Nossa missão é simplificar a tecnologia para pessoas e empresas.
                        </p>

                        <Button
                            variant="link"
                            className="text-white flex-col gap-4 text-sm font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors hover:no-underline group"
                            onClick={() => document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Conheça nossa história
                            <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <ChevronDown className="h-6 w-6 group-hover:scale-125 transition-transform" />
                            </motion.div>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* 2. Quem Somos (2 Column Layout) */}
            <section id="quem-somos" className="py-24 md:py-40">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <FadeInUp>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-6 block">Nossa Origem</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Quem Somos</h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                <p>
                                    A iTech nasceu da paixão por tecnologia e da necessidade de oferecer um serviço <strong>transparente e de alta qualidade</strong>.
                                    Começamos como uma assistência técnica especializada em Apple e expandimos para nos tornarmos um <strong>hub completo</strong> de soluções digitais.
                                </p>
                                <p>
                                    Hoje, não apenas consertamos dispositivos, mas <strong>construímos presenças digitais</strong> através de desenvolvimento web e levamos marcas ao seu público ideal com tráfego pago.
                                    Unimos o detalhe do hardware à inteligência do software para impulsionar o seu negócio.
                                </p>
                            </div>
                            <div className="mt-12">
                                <Link href="/contato">
                                    <Button size="lg" className="h-14 px-8 rounded-full text-base font-bold gap-2 shadow-xl shadow-primary/20">
                                        Falar com um Especialista <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/10 rounded-[4rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                                <div className="rounded-[4rem] overflow-hidden shadow-2xl relative">
                                    <img src="/images/service_iphone.png" alt="Reparo iPhone iTech" className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <p className="text-3xl font-black mb-1">+10 anos</p>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Elevando o padrão técnico</p>
                                    </div>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* 3. Diferenciais (Cards with Icons) */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                    <div className="text-center mb-20">
                        <FadeInUp>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Nossos Diferenciais</h2>
                            <p className="text-slate-500 max-w-xl mx-auto">Valores que norteiam cada linha de código e cada parafuso apertado.</p>
                        </FadeInUp>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={Gem}
                            title="Excelência"
                            description='Não aceitamos o "mais ou menos". Buscamos a perfeição em cada reparo e linha de código.'
                            delay={0.1}
                        />
                        <ValueCard
                            icon={Search}
                            title="Transparência"
                            description="Você acompanha cada etapa do processo. Sem letras miúdas ou taxas surpresa."
                            delay={0.2}
                        />
                        <ValueCard
                            icon={Rocket}
                            title="Inovação"
                            description="Estamos sempre estudando as novas tecnologias para oferecer o que há de mais moderno."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* 4. Pilares de Atuação (Bento Grid Style) */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <FadeInUp>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">O que entregamos</h2>
                            <p className="text-slate-500 max-w-xl mx-auto font-medium">Equilíbrio perfeito entre precisão técnica e visão de negócio.</p>
                        </FadeInUp>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
                        {/* Assistência Apple - Main Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-7"
                        >
                            <Link href="/servicos/assistencia-iphone" className="block relative group overflow-hidden rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 h-full">
                                <img src="/images/service_iphone.png" alt="Assistência Apple" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                    <span className="inline-flex h-12 w-12 rounded-xl bg-primary items-center justify-center text-white mb-6">
                                        <Smartphone className="h-6 w-6" />
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Assistência Apple</h3>
                                    <p className="text-slate-300 text-lg max-w-md">
                                        Reparos de alta precisão com peças premium e garantia total. <strong>Excelência em cada detalhe do seu dispositivo.</strong>
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Right Column with two stacked cards */}
                        <div className="md:col-span-5 grid grid-rows-2 gap-6">
                            {/* Web Dev */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Link href="/servicos/desenvolvimento-web" className="block relative group overflow-hidden rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 h-full">
                                    <img src="/images/service_webdev.png" alt="Web Dev" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white mb-4">
                                            <Code className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">Desenvolvimento Web</h3>
                                        <p className="text-slate-300 text-sm">Sites e sistemas de alta performance focados em <strong>conversão e velocidade.</strong></p>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Marketing */}
                            <motion.div
                                initial={{ opacity: 0, x: 30, y: 30 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Link href="/servicos/trafego-pago" className="block relative group overflow-hidden rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 h-full">
                                    <img src="/images/service_marketing.png" alt="Tráfego Pago" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-600/80" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-center">
                                        <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center text-white mb-4">
                                            <TrendingUp className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">Tráfego Pago</h3>
                                        <p className="text-blue-50 text-sm">Colocamos sua marca na frente de quem <strong>realmente quer comprar.</strong></p>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

