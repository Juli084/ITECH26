
"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartSheet() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Fecha o drawer ao mudar de rota
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
            {/* --- GATILHO (BOTÃO DO NAVBAR) --- */}
            <button
                onClick={toggleCart}
                className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
            >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* --- OVERLAY (FUNDO ESCURO) --- */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={toggleCart}
                aria-hidden="true"
            />

            {/* --- DRAWER (CARRINHO LATERAL) --- */}
            <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                {/* 1. Header Sólido e Limpo */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Seu Carrinho</h2>
                        <p className="text-sm text-slate-500">
                            Você tem <span className="font-bold text-slate-900">{totalItems}</span> {totalItems === 1 ? 'item' : 'itens'}
                        </p>
                    </div>
                    <button onClick={toggleCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 2. Lista de Itens (Scrollável) */}
                <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50/50">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-80">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                <ShoppingBag className="w-10 h-10 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-900">Sua sacola está vazia</p>
                                <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
                                    Parece que você ainda não adicionou nada.
                                </p>
                            </div>
                            <Button onClick={toggleCart} variant="outline" className="mt-4">
                                Começar a comprar
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-200">

                                    {/* Imagem do Produto - Corrigida */}
                                    <div className="w-24 h-24 bg-slate-50 rounded-lg flex-shrink-0 border border-slate-100 flex items-center justify-center overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover" // Removido mix-blend-multiply
                                            />
                                        ) : (
                                            <ShoppingBag className="w-8 h-8 text-slate-200" />
                                        )}
                                    </div>

                                    {/* Detalhes do Produto */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2" title={item.name}>
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                                                    title="Remover item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500 mt-1">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.promoPrice || item.price))}
                                            </p>
                                        </div>

                                        {/* Controles de Quantidade */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-l-lg transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-slate-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-r-lg transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            {/* Subtotal do Item (Opcional) */}
                                            <p className="text-sm font-bold text-slate-900">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.promoPrice || item.price) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. Footer / Checkout */}
                {items.length > 0 && (
                    <div className="bg-white border-t border-slate-100 p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-extrabold text-slate-900 block">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                                    </span>
                                    <span className="text-xs text-slate-400 font-normal">
                                        Taxas calculadas no checkout
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link href="/pagamento" onClick={toggleCart} className="block">
                            <Button className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                                Finalizar Compra
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="w-full mt-3 py-2 text-sm text-slate-500 font-medium hover:text-slate-800 transition-colors"
                        >
                            Continuar comprando
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}