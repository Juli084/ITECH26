"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

interface ServiceHeroProps {
    badgeIcon: React.ReactNode;
    badgeText: string;
    title: React.ReactNode;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    ctaLink: string;
    whatsappMessage: string;
}

export function ServiceHero({
    badgeIcon,
    badgeText,
    title,
    subtitle,
    imageSrc,
    imageAlt,
    ctaLink,
    whatsappMessage,
}: ServiceHeroProps) {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[80vh] flex flex-col justify-center bg-slate-950">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover opacity-20 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-slate-800 px-3 py-1 text-sm text-slate-300 mb-6 backdrop-blur-md bg-slate-900/50"
                    >
                        {badgeIcon}
                        <span className="font-medium ml-2">{badgeText}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
                    >
                        {title}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href={ctaLink}>
                            <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                Solicitar Orçamento <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-slate-900/50 border-slate-700 text-white hover:bg-slate-800 hover:text-white backdrop-blur-sm"
                            onClick={() => window.open(`${SITE_CONFIG.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
                        >
                            WhatsApp
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
