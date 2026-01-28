"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
    Menu, X, Home, Info, Briefcase, ShoppingBag,
    MessageSquare, Newspaper, LayoutDashboard, LogOut, LogIn, UserPlus
} from "lucide-react";

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
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const menuContent = (
        <div className="md:hidden">
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[9998]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-[9999] h-full w-[85vw] max-w-sm border-r shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ backgroundColor: "hsl(var(--background))" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-border">
                    <span className="font-bold text-lg">iTech Soluções</span>
                    <button onClick={() => setIsOpen(false)} className="p-2">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navegação */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-primary transition-all"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-border space-y-3 bg-background">
                    {session ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Button>
                            </Link>

                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-red-600"
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                            >
                                <LogOut className="w-4 h-4" />
                                Sair da conta
                            </Button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full">Entrar</Button>
                            </Link>
                            <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                                <Button className="w-full">Conta</Button>
                            </Link>
                        </div>
                    )}

                    <Link href="/contato" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mt-2">Falar com Especialista</Button>
                    </Link>
                </div>
            </aside>
        </div>
    );

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="p-2 md:hidden">
                <Menu className="w-6 h-6" />
            </button>
            {createPortal(menuContent, document.body)}
        </>
    );
}