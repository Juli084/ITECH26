"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSiteSettings, updateProfile } from "./actions";
import { Globe, User, ShieldCheck, MessageSquare, Instagram, Linkedin, Mail, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function ConfigForm({ initialSettings, initialUser }: { initialSettings: any, initialUser: any }) {
    const [loadingSettings, setLoadingSettings] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    async function handleSettingsSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingSettings(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);
        try {
            await updateSiteSettings(formData);
            setMessage({ type: "success", text: "Configurações do site atualizadas com sucesso!" });
        } catch (error) {
            setMessage({ type: "error", text: "Erro ao atualizar configurações." });
        } finally {
            setLoadingSettings(false);
        }
    }

    async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingProfile(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);
        try {
            await updateProfile(formData);
            setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
        } catch (error) {
            setMessage({ type: "error", text: "Erro ao atualizar perfil." });
        } finally {
            setLoadingProfile(false);
        }
    }

    return (
        <div className="grid gap-8 pb-10">
            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border animate-in slide-in-from-top duration-300 ${message.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}>
                    {message.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Site Settings */}
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm overflow-hidden">
                    <form onSubmit={handleSettingsSubmit}>
                        <CardHeader className="border-b bg-slate-50/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Globe className="h-5 w-5 text-primary" />
                                <CardTitle className="text-xl">Informações da Plataforma</CardTitle>
                            </div>
                            <CardDescription>Configure como sua empresa aparece para os clientes.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Nome da Empresa</Label>
                                <Input id="siteName" name="siteName" defaultValue={initialSettings?.siteName} required className="bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="siteDescription">Descrição curta (Moto)</Label>
                                <Textarea id="siteDescription" name="siteDescription" defaultValue={initialSettings?.siteDescription} rows={3} className="bg-white resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="whatsappNumber" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-green-500" /> WhatsApp
                                    </Label>
                                    <Input id="whatsappNumber" name="whatsappNumber" defaultValue={initialSettings?.whatsappNumber} placeholder="Ex: 5511999999999" className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-primary" /> Email Público
                                    </Label>
                                    <Input id="contactEmail" name="contactEmail" type="email" defaultValue={initialSettings?.contactEmail} className="bg-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                                        <Instagram className="h-4 w-4 text-pink-500" /> Instagram URL
                                    </Label>
                                    <Input id="instagramUrl" name="instagramUrl" defaultValue={initialSettings?.instagramUrl} className="bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                                        <Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn URL
                                    </Label>
                                    <Input id="linkedinUrl" name="linkedinUrl" defaultValue={initialSettings?.linkedinUrl} className="bg-white" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 border-t py-4">
                            <Button type="submit" className="ml-auto flex items-center gap-2" disabled={loadingSettings}>
                                {loadingSettings ? "Salvando..." : <><Save className="h-4 w-4" /> Salvar Alterações</>}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Profile Settings */}
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm overflow-hidden h-fit">
                    <form onSubmit={handleProfileSubmit}>
                        <CardHeader className="border-b bg-slate-50/50">
                            <div className="flex items-center gap-2 mb-1">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle className="text-xl">Meu Perfil</CardTitle>
                            </div>
                            <CardDescription>Atualize suas informações de login e acesso.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/20">
                                    {initialUser?.name?.[0] || "A"}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{initialUser?.name}</p>
                                    <p className="text-sm text-muted-foreground">{initialUser?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" name="name" defaultValue={initialUser?.name} required className="bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Administrativo</Label>
                                <Input id="email" name="email" type="email" defaultValue={initialUser?.email} required className="bg-white" />
                            </div>

                            <hr className="my-4 border-slate-100" />

                            <div className="space-y-2">
                                <Label htmlFor="newPassword" id="label-pass" className="flex items-center gap-2 text-amber-600">
                                    <ShieldCheck className="h-4 w-4" /> Alterar Senha
                                </Label>
                                <Input id="newPassword" name="newPassword" type="password" placeholder="Nova senha (min. 6 caracteres)" className="bg-white" />
                                <p className="text-[10px] text-muted-foreground">Deixe em branco para manter a senha atual.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 border-t py-4">
                            <Button type="submit" className="ml-auto flex items-center gap-2" disabled={loadingProfile}>
                                {loadingProfile ? "Atualizando..." : <><Save className="h-4 w-4" /> Atualizar Perfil</>}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
