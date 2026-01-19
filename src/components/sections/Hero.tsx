"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, BarChart } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-40 md:pb-48 lg:pt-48 lg:pb-56 min-h-[90vh] flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                <Image
                    src="/images/hero_bg_tech.png"
                    alt="Background Tech"
                    fill
                    className="object-cover opacity-40 dark:opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-background/80 dark:bg-background/80 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            </div>

            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground mb-8 backdrop-blur-md bg-background/30 border-primary/20"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                    iTech Soluções Digitais
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mb-6"
                >
                    Tecnologia que <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">resolve problemas</span> e impulsiona resultados.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
                >
                    A iTech Soluções Digitais é um hub completo de tecnologia em Sorocaba, especializado em assistência técnica Apple, desenvolvimento de sites e sistemas e gestão de tráfego pago para pessoas e empresas que buscam eficiência, segurança e crescimento digital.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link href="/contato">
                        <Button size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                            Fale com um especialista <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/servicos">
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto text-base backdrop-blur-sm bg-background/50">
                            Conhecer nossas soluções
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating Icons / Visual Interest */}
                <div className="absolute top-1/2 left-4 md:left-20 xl:left-40 hidden lg:block opacity-30 pointer-events-none">
                    <Smartphone className="w-12 h-12 md:w-16 md:h-16 -rotate-12" />
                </div>
                <div className="absolute top-2/3 right-4 md:right-20 xl:right-40 hidden lg:block opacity-30 pointer-events-none">
                    <BarChart className="w-12 h-12 md:w-16 md:h-16 rotate-12" />
                </div>
            </div>
        </section>
    );
}
