"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceCTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Precisa resolver o problema do seu iPhone?
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Entre em contato agora e receba uma avaliação rápida do seu aparelho.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contato?servico=iphone">
                        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full">
                            Solicitar orçamento
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-10 text-lg rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
                        onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, preciso de ajuda com meu iPhone.`, '_blank')}
                    >
                        Falar no WhatsApp
                    </Button>
                </div>
            </div>
        </section>
    );
}
