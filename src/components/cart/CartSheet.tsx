"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartSheet() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Fecha o drawer ao mudar de rota (opcional)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const toggleCart = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Botão Flutuante / Navbar Trigger */}
            <button
                onClick={toggleCart}
                className="relative p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-all"
                    onClick={toggleCart}
                />
            )}

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-bold">Seu Carrinho</h2>
                            <span className="text-sm text-muted-foreground">({totalItems} itens)</span>
                        </div>
                        <button onClick={toggleCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-6 bg-slate-50 rounded-full">
                                    <ShoppingBag className="w-12 h-12 text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-slate-900">Seu carrinho está vazio</p>
                                    <p className="text-sm text-slate-500">Que tal explorar nossos acessórios?</p>
                                </div>
                                <Button onClick={toggleCart} variant="outline" className="rounded-xl">
                                    Continuar Comprando
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl border overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="text-primary font-black">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.promoPrice || item.price))}
                                        </p>

                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="flex items-center border rounded-lg bg-slate-50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t bg-slate-50/50 space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-slate-500 text-sm">Subtotal</span>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-slate-900">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                                    </p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">ou em até 12x no cartão</p>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Link href="/pagamento" onClick={toggleCart}>
                                    <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                                        Finalizar Compra
                                    </Button>
                                </Link>
                                <button
                                    onClick={toggleCart}
                                    className="w-full py-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
                                >
                                    Continuar Navegando
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
