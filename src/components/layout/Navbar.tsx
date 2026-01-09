"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

import { CartSheet } from "@/components/cart/CartSheet";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4">
                <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
                    <MobileMenu />
                    <Link className="flex items-center space-x-2" href="/">
                        <span className="font-bold font-heading text-xs sm:text-sm md:text-base whitespace-nowrap">iTech Soluções</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium mx-6">
                    <Link href="/sobre" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:text-foreground">Sobre</Link>
                    <Link href="/servicos" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:text-foreground">Serviços</Link>
                    <Link href="/acessorios" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:text-foreground">Acessórios</Link>
                    <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:text-foreground">Blog</Link>
                    <Link href="/contato" className="transition-colors hover:text-foreground/80 text-foreground/60 focus:text-foreground">Contato</Link>
                </nav>

                <div className="flex items-center justify-end space-x-2 flex-1">
                    <nav className="flex items-center gap-1 md:gap-4">
                        <CartSheet />
                        <div className="hidden sm:flex items-center gap-2">
                            {session ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="ghost" size="sm" className="px-3">Dash</Button>
                                    </Link>
                                    <Button variant="outline" size="sm" onClick={() => signOut()} className="px-3 hidden lg:flex">Sair</Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="px-3">Entrar</Button>
                                    </Link>
                                    <Link href="/cadastro">
                                        <Button size="sm" className="px-4">Começar</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
