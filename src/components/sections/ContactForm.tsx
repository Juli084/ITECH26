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
import { User, Mail, Phone, MessageSquare, Briefcase, Send, Lock } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone inválido"),
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
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const service = searchParams.get("servico");
        const product = searchParams.get("produto");

        if (service) {
            const validServices = ["web_app", "traffic", "iphone_repair", "systems", "api", "other"];
            if (validServices.includes(service)) {
                setValue("service", service);
            } else {
                setCustomService(service);
                setValue("service", service);
            }
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
                className="text-center p-8 py-12 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-inner"
            >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Send className="w-7 h-7 translate-x-0.5 -translate-y-0.5" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Mensagem Enviada!</h3>
                <p className="text-slate-500 mb-8 text-sm max-w-[280px] mx-auto leading-relaxed">Nossos especialistas retornarão em breve via WhatsApp ou E-mail.</p>
                <Button
                    onClick={() => setSuccess(false)}
                    variant="default"
                    className="h-12 px-8 rounded-full font-bold bg-primary hover:bg-primary/90 transition-all"
                >
                    Enviar outra
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-1">
                        <User className="w-3.5 h-3.5" /> Nome Completo
                    </Label>
                    <div className="relative group">
                        <Input
                            id="name"
                            placeholder="Julio Silva"
                            className="h-12 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-0 focus:border-primary px-4 text-sm font-medium transition-all placeholder:text-slate-300"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 font-medium mt-1.5 ml-1">{errors.name.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-1">
                            <Mail className="w-3.5 h-3.5" /> E-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemplo@gmail.com"
                            className="h-12 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-0 focus:border-primary px-4 text-sm font-medium transition-all placeholder:text-slate-300"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 font-medium mt-1.5 ml-1">{errors.email.message}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-1">
                            <Phone className="w-3.5 h-3.5" /> WhatsApp
                        </Label>
                        <Input
                            id="phone"
                            placeholder="(15) 99999-9999"
                            className="h-12 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-0 focus:border-primary px-4 text-sm font-medium transition-all placeholder:text-slate-300"
                            {...register("phone")}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 font-medium mt-1.5 ml-1">{errors.phone.message}</p>}
                    </div>
                </div>

                {/* Serviço */}
                <div className="space-y-2">
                    <Label htmlFor="service" className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-1">
                        <Briefcase className="w-3.5 h-3.5" /> Serviço de Interesse
                    </Label>
                    <div className="relative">
                        <select
                            id="service"
                            className="flex h-12 w-full rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:bg-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-0 focus:border-primary appearance-none cursor-pointer transition-all text-slate-700"
                            {...register("service")}
                        >
                            <option value="">Selecione...</option>
                            {customService && (
                                <option value={customService}>{customService}</option>
                            )}
                            <option value="web_app">Desenvolvimento Web / App</option>
                            <option value="traffic">Tráfego Pago</option>
                            <option value="iphone_repair">Assistência Técnica iPhone</option>
                            <option value="systems">Sistemas Internos / Dashboards</option>
                            <option value="api">APIs e Integrações</option>
                            <option value="other">Outro</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.service && <p className="text-[11px] text-red-500 font-medium mt-1.5 ml-1">{errors.service.message}</p>}
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-1">
                        <MessageSquare className="w-3.5 h-3.5" /> Como podemos ajudar?
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Conte brevemente sobre seu projeto ou objetivo..."
                        className="min-h-[120px] rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:bg-white focus:ring-0 focus:border-primary p-4 text-sm font-medium leading-relaxed transition-all resize-none placeholder:text-slate-300"
                        {...register("message")}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 font-medium mt-1.5 ml-1">{errors.message.message}</p>}
                </div>
            </div>

            <div className="pt-2">
                {error && <p className="text-[11px] text-red-500 font-bold text-center mb-4 p-3 bg-red-50 rounded-xl">{error}</p>}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 rounded-full text-base font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all bg-primary hover:bg-primary/95 flex items-center justify-center gap-2 uppercase tracking-widest"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : "Solicitar Atendimento"}
                </Button>

                <div className="mt-6 flex flex-col items-center gap-1 opacity-60">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                        <Lock className="w-2.5 h-2.5" /> Ambiente Seguro
                    </p>
                </div>
            </div>
        </form>
    );
}

export function ContactForm() {
    return (
        <Suspense fallback={<div className="h-[500px] w-full bg-slate-50/50 rounded-2xl animate-pulse" />}>
            <ContactFormContent />
        </Suspense>
    );
}
