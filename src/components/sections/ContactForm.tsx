"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { createLead } from "@/app/actions/leads";
import { useSearchParams } from "next/navigation";
import { User, Mail, Phone, MessageSquare, Briefcase, Send } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    service: z.string().min(1, "Selecione um serviço"),
    message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

function ContactFormContent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [customService, setCustomService] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const service = searchParams.get("servico");
        const product = searchParams.get("produto");

        if (service) {
            const standardServices = ["iphone", "web", "traffic", "accessories", "support", "other"];
            if (!standardServices.includes(service)) {
                setCustomService(service);
            }
            setValue("service", service);
        } else if (product) {
            const productLabel = `Acessório: ${product}`;
            setCustomService(productLabel);
            setValue("service", productLabel);
        }
    }, [searchParams, setValue]);

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        setError("");

        const result = await createLead({
            name: data.name,
            email: data.email,
            phone: data.phone,
            serviceInterest: data.service,
            message: data.message,
        });

        if (result.success) {
            setSuccess(true);
            reset();
            setCustomService(null);
        } else {
            setError(result.error || "Algo deu errado.");
        }

        setIsSubmitting(false);
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 py-20 border-2 border-primary/20 rounded-[2.5rem] bg-slate-50 shadow-inner"
            >
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
                    <Send className="w-10 h-10 translate-x-1 -translate-y-1" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-slate-900">Mensagem Enviada!</h3>
                <p className="text-slate-600 mb-10 text-lg max-w-sm mx-auto leading-relaxed">Sua solicitação já está na mesa de nossos especialistas. Retornaremos em breve.</p>
                <Button
                    onClick={() => setSuccess(false)}
                    variant="default"
                    className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 bg-primary"
                >
                    Enviar outra mensagem
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                {/* Nome */}
                <div className="space-y-3">
                    <Label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Nome Completo *
                    </Label>
                    <div className="relative group">
                        <Input
                            id="name"
                            placeholder="Ex: Julio Silva"
                            className="h-16 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary px-6 text-lg font-medium transition-all placeholder:text-slate-400"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-xs text-red-500 font-bold mt-2 ml-2">{errors.name.message}</p>}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Seu Email Principal *
                    </Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemplo@gmail.com"
                            className="h-16 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary px-6 text-lg font-medium transition-all placeholder:text-slate-400"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-bold mt-2 ml-2">{errors.email.message}</p>}
                    </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-3">
                    <Label htmlFor="phone" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> WhatsApp / Celular
                    </Label>
                    <div className="relative">
                        <Input
                            id="phone"
                            placeholder="(15) 99999-9999"
                            className="h-16 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary px-6 text-lg font-medium transition-all placeholder:text-slate-400"
                            {...register("phone")}
                        />
                    </div>
                </div>

                {/* Serviço */}
                <div className="space-y-3">
                    <Label htmlFor="service" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Interesse *
                    </Label>
                    <div className="relative">
                        <select
                            id="service"
                            className="flex h-16 w-full rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:bg-white px-6 py-2 text-lg font-medium ring-offset-background focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary appearance-none cursor-pointer transition-all text-slate-700"
                            {...register("service")}
                        >
                            <option value="">Selecione uma opção...</option>
                            {customService && (
                                <option value={customService}>{customService}</option>
                            )}
                            <option value="iphone">Assistência Apple Premium</option>
                            <option value="web">Desenvolvimento Web/App</option>
                            <option value="traffic">Google & Meta Ads</option>
                            <option value="accessories">Loja de Acessórios</option>
                            <option value="support">Suporte Técnico</option>
                            <option value="other">Outros assuntos</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.service && <p className="text-xs text-red-500 font-bold mt-2 ml-2">{errors.service.message}</p>}
                </div>
            </div>

            {/* Mensagem */}
            <div className="space-y-3">
                <Label htmlFor="message" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Como podemos ajudar? *
                </Label>
                <div className="relative">
                    <Textarea
                        id="message"
                        placeholder="Conte um pouco sobre o que você precisa..."
                        className="min-h-[200px] rounded-3xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary p-8 text-lg font-medium leading-relaxed transition-all resize-none placeholder:text-slate-400"
                        {...register("message")}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-bold mt-2 ml-2">{errors.message.message}</p>}
                </div>
            </div>

            <div className="pt-4">
                {error && <p className="text-sm text-red-500 font-bold text-center mb-6 p-4 bg-red-50 rounded-2xl">{error}</p>}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full h-20 rounded-3xl text-xl font-black shadow-2xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary flex items-center justify-center gap-3 uppercase tracking-widest"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⏳</motion.span>
                            Enviando...
                        </>
                    ) : (
                        <>
                            Solicitar Atendimento <Send className="w-6 h-6" />
                        </>
                    )}
                </Button>
                <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-8">
                    Análise técnica humanizada em menos de 24 horas.
                </p>
            </div>
        </form>
    );
}

export function ContactForm() {
    return (
        <Suspense fallback={<div className="h-[600px] w-full bg-slate-50 rounded-3xl animate-pulse" />}>
            <ContactFormContent />
        </Suspense>
    );
}
