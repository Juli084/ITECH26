"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronRight, Home, Info, Briefcase, ShoppingBag, MessageSquare, Newspaper, LayoutDashboard, LogOut, UserPlus, LogIn } from "lucide-react";

const menuItems = [
    { title: "Início", href: "/", icon: Home },
    { title: "Sobre", href: "/sobre", icon: Info },
    { title: "Serviços", href: "/servicos", icon: Briefcase },
    { title: "Acessórios", href: "/acessorios", icon: ShoppingBag },
    { title: "Blog", href: "/blog", icon: Newspaper },
    { title: "Contato", href: "/contato", icon: MessageSquare },
];

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-all"
                    onClick={toggleMenu}
                />
            )}

            {/* Drawer */}
            <div className={`fixed left-0 top-0 h-full w-[300px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
                    <span className="font-bold text-lg font-heading">Menu iTech</span>
                    <button onClick={toggleMenu} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Navegação</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={toggleMenu}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                    <span className="font-semibold">{item.title}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 pt-8 border-t space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Acesso</p>
                        {session ? (
                            <>
                                <Link href="/dashboard" onClick={toggleMenu} className="flex items-center gap-3 p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="font-bold">Ir para Dashboard</span>
                                </Link>
                                <button
                                    onClick={() => { signOut(); toggleMenu(); }}
                                    className="flex items-center gap-3 p-4 w-full rounded-2xl border text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-semibold"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sair da Conta
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                <Link href="/login" onClick={toggleMenu} className="flex items-center gap-3 p-4 rounded-2xl border text-slate-900 transition-all font-bold hover:bg-slate-50">
                                    <LogIn className="w-5 h-5 text-primary" />
                                    Fazer Login
                                </Link>
                                <Link href="/cadastro" onClick={toggleMenu} className="flex items-center gap-3 p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 font-bold">
                                    <UserPlus className="w-5 h-5" />
                                    Criar Conta
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t bg-slate-50/50">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] text-center">
                        © {new Date().getFullYear()} iTech Soluções Digitais
                    </p>
                </div>
            </div>
        </div>
    );
}
