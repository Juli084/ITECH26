"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

interface ServiceCTAProps {
    title: string;
    description: string;
    ctaLink: string;
    whatsappMessage: string;
}

export function ServiceCTA({
    title,
    description,
    ctaLink,
    whatsappMessage
}: ServiceCTAProps) {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Decorative Background Pattern (Subtle) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    {title}
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href={ctaLink}>
                        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                            Solicitar orçamento
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-10 text-lg rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white w-full sm:w-auto backdrop-blur-sm"
                        onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
                    >
                        Falar no WhatsApp
                    </Button>
                </div>
            </div>
        </section>
    );
}
