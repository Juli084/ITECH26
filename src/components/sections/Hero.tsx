"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, Smartphone, Laptop, BarChart, ShoppingBag } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-40 md:pb-48 lg:pt-48 lg:pb-56">
            {/* Background Gradients */}
            <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-[100%] blur-[100px] -z-10" />

            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground mb-8 backdrop-blur-sm bg-background/50"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                    iTech Soluções Digitais
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6"
                >
                    Tecnologia que <span className="text-primary/80">impulsiona</span> o seu crescimento.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                >
                    O hub completo para sua presença digital. Da assistência técnica especializada Apple ao desenvolvimento de software e estratégias de tráfego.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link href="/contato">
                        <Button size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto text-base">
                            Falar com Especialista <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/servicos">
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto text-base">
                            Conhecer Serviços
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating Icons / Visual Interest */}
                <div className="absolute top-1/2 left-4 md:left-20 xl:left-40 hidden lg:block opacity-20 pointer-events-none">
                    <Smartphone className="w-12 h-12 md:w-16 md:h-16 -rotate-12" />
                </div>
                <div className="absolute top-2/3 right-4 md:right-20 xl:right-40 hidden lg:block opacity-20 pointer-events-none">
                    <BarChart className="w-12 h-12 md:w-16 md:h-16 rotate-12" />
                </div>
            </div>
        </section>
    );
}
