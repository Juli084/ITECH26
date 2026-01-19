"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
    return (
        <section className="py-24 px-4 container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="lg:w-1/2 relative">
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden flex items-center justify-center relative">
                        {/* Placeholder for an actual image later */}
                        <div className="absolute inset-0 bg-muted/20" />
                        <div className="relative z-10 text-9xl font-bold text-primary/10 select-none">iTech</div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
                </div>

                <div className="lg:w-1/2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Quem Somos</h2>
                        <h3 className="text-xl text-primary font-medium mt-2">Simplificando a tecnologia para pessoas e empresas</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        A iTech Soluções Digitais nasceu como uma assistência técnica especializada em Apple e evoluiu para um hub de soluções digitais.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Hoje, ajudamos clientes em Sorocaba e região com assistência técnica para iPhone, desenvolvimento de sites, web apps e gestão de tráfego pago, sempre com foco em qualidade, clareza e resultados sustentáveis.
                    </p>
                    <div className="pt-4">
                        <Link href="/sobre">
                            <Button variant="ghost" className="gap-2 pl-0 hover:pl-4 transition-all">
                                Conheça nossa história <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
