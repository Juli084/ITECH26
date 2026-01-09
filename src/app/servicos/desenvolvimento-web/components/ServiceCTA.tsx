"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceCTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Vamos tirar sua ideia do papel?
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Entre em contato e conte o que você precisa. Nós cuidamos da parte técnica.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contato?servico=web">
                        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full">
                            Solicitar proposta
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-10 text-lg rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
                        onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, gostaria de falar sobre um projeto de Desenvolvimento Web.`, '_blank')}
                    >
                        Falar no WhatsApp
                    </Button>
                </div>
            </div>
        </section>
    );
}
