import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, MessageCircle, Clock, CheckCircle2, ShieldCheck, Instagram, Linkedin, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
    title: "Contato | iTech Soluções Digitais",
    description: "Entre em contato com a iTech. Vamos analisar sua necessidade e retornar com a melhor solução tecnológica.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Ultra Clean */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative max-w-7xl">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Estamos Online
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            Vamos tirar sua ideia <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-500">do papel hoje.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-2xl">
                            Conte pra gente o que você precisa. Nossa equipe técnica vai analisar seu caso e retornar com uma solução estratégica e personalizada.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-32">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                        {/* Left Column: Premium Contact Cards */}
                        <div className="lg:w-[380px] space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8">Canais Diretos</h2>

                                <div className="grid gap-4">
                                    {/* WhatsApp Card - Premium Card Style */}
                                    <Link
                                        href={SITE_CONFIG.whatsappLink}
                                        target="_blank"
                                        className="group relative p-1 rounded-[2rem] bg-gradient-to-br from-green-400 to-green-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <div className="bg-white rounded-[1.9rem] p-6 flex items-center gap-5">
                                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12">
                                                <MessageCircle className="w-7 h-7" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">WhatsApp</p>
                                                <p className="text-xl font-black text-slate-900">Conversar Agora</p>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Email Card */}
                                    <div className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 text-primary rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-1">
                                                <Mail className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">E-mail</p>
                                                <p className="text-lg font-bold text-slate-900">{SITE_CONFIG.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Schedule Card */}
                                    <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-dashed border-slate-200 flex items-center gap-5">
                                        <div className="w-14 h-14 bg-slate-100/50 text-slate-400 rounded-2xl flex items-center justify-center">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Atendimento</p>
                                            <p className="text-sm font-bold text-slate-600">Seg à Sex: 09h — 18h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social & Proof */}
                            <div className="pt-10 border-t border-slate-100 space-y-8">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Siga a iTech</h3>
                                <div className="flex gap-4">
                                    <Link href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                                        <MapPin className="w-5 h-5" />
                                    </Link>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-primary text-white space-y-5 relative overflow-hidden shadow-2xl shadow-primary/20">
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed">
                                            Sua mensagem será analisada por um especialista técnico, não por um robô.
                                        </p>
                                    </div>
                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: The Form - Apple Card Style */}
                        <div className="flex-1 w-full">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-primary/10 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
                                    <div className="mb-12">
                                        <h2 className="text-3xl font-black text-slate-900 mb-4">Mande sua mensagem</h2>
                                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                            Preencha os detalhes abaixo e daremos o primeiro passo para o seu sucesso digital.
                                        </p>
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
