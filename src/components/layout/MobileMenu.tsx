"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Home, Info, Briefcase, ShoppingBag, MessageSquare, Newspaper } from "lucide-react";

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
            <div className={`fixed left-0 top-0 h-full w-[280px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="font-bold text-lg font-heading">Menu</span>
                        <button onClick={toggleMenu} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={toggleMenu}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </nav>

                    <div className="pt-6 border-t mt-auto">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-center mb-4">
                            iTech Soluções Digitais
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
