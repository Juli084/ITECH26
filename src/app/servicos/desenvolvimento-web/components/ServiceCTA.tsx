"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";

export function ServiceCTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Vamos tirar sua ideia do papel?
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Entre em contato, explique sua necessidade e nós cuidamos de toda a parte técnica — do planejamento à entrega.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                    <Link href="/contato?servico=web">
                        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                            Solicitar proposta
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-10 text-lg rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white w-full sm:w-auto backdrop-blur-sm"
                        onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=Olá, gostaria de falar sobre um projeto de Desenvolvimento Web.`, '_blank')}
                    >
                        Falar no WhatsApp
                    </Button>
                </div>

                {/* Social Connect Section */}
                <div className="border-t border-white/10 pt-12 max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold mb-8 opacity-90">Conecte-se com a iTech</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <Link href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-bold">Instagram</div>
                                <div className="text-sm opacity-70">Acompanhar projetos, bastidores e novidades</div>
                            </div>
                        </Link>

                        <Link href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-bold">LinkedIn</div>
                                <div className="text-sm opacity-70">Conteúdo profissional, tecnologia e negócios</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
