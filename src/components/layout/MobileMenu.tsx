"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
    Menu,
    X,
    Home,
    Info,
    Briefcase,
    ShoppingBag,
    MessageSquare,
    Newspaper,
    LayoutDashboard,
    LogOut,
    LogIn,
    UserPlus,
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
    const { data: session } = useSession();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Abrir menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/500 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-full w-[85vw] max-w-sm bg-background border-r shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-14 px-4 border-b">
                    <span className="font-semibold text-base">iTech Soluções</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-md hover:bg-muted"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Auth */}
                <div className="mt-auto px-4 py-4 border-t space-y-2">
                    {session ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full justify-start">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600"
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                                <Button className="w-full">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Criar Conta
                                </Button>
                            </Link>
                        </>
                    )}

                    {/* CTA */}
                    <Link href="/contato" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mt-3">Falar com Especialista</Button>
                    </Link>
                </div>
            </aside>
        </div>
    );
}
