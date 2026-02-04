"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOrder } from "@/app/actions/checkout";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Redireciona se o carrinho estiver vazio
    useEffect(() => {
        if (items.length === 0 && !isProcessing) {
            router.push("/acessorios");
        }
    }, [items, router, isProcessing]);

    if (items.length === 0 && !isProcessing) return null;

    const handleFinish = async () => {
        setIsProcessing(true);

        // Prepare payload: only IDs and quantities
        const payload = {
            items: items.map(i => ({ id: i.id, quantity: i.quantity }))
        };

        const result = await createOrder(payload);

        if (result.success && result.data) {
            // In a real app, we would redirect to payment gateway with result.data.orderId
            // For MVP, we simulate success
            setTimeout(() => {
                clearCart();
                alert(`Pedido #${result.data?.orderId} criado com sucesso! Total validado: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((result.data?.total || 0) / 100)}`);
                router.push("/");
            }, 1000);
        } else {
            alert(result.error || "Erro ao processar pedido");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/acessorios" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Continuar comprando
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna Esquerda: Itens e Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h1 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-primary" /> Finalizar Pedido
                            </h1>

                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-6 border-b last:border-0">
                                        <div className="w-16 h-16 bg-slate-50 rounded-xl border flex-shrink-0 flex items-center justify-center">
                                            <img src={item.image || ""} alt="" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                            <p className="text-xs text-slate-500">{item.quantity} unidades</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.promoPrice || item.price) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-6 border flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Entrega Expressa</h4>
                                    <p className="text-xs text-slate-500">Retirada em Sorocaba ou envio via Motoboy.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Compra Segura</h4>
                                    <p className="text-xs text-slate-500">Seus dados estão protegidos pela iTech.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita: Resumo */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-lg font-bold mb-6">Resumo da Compra</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Subtotal</span>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Frete</span>
                                    <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded-full">Grátis</span>
                                </div>
                                <div className="pt-3 border-t flex justify-between items-center text-slate-900">
                                    <span className="font-bold">Total (Estimado)</span>
                                    <span className="text-2xl font-black">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 bg-primary mb-4"
                                onClick={handleFinish}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processando..." : "Confirmar e Pagar"}
                            </Button>

                            <p className="text-[10px] text-center text-slate-400">
                                Ao finalizar, você concorda que o valor final será validado pelo servidor.
                            </p>

                            <div className="mt-8 pt-8 border-t flex flex-col items-center gap-4">
                                <p className="text-xs text-slate-500 font-medium">Precisa de ajuda com o pedido?</p>
                                <Button variant="outline" className="w-full h-12 rounded-xl gap-2 text-slate-600 border-2">
                                    <MessageCircle className="w-4 h-4" /> Suporte no WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
