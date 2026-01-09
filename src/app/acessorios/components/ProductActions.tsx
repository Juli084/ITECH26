"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingBag, ShoppingCart, CreditCard, Plus } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
    id: number;
    name: string;
    slug: string;
    price: number;
    promoPrice?: number | null;
    image: string | null;
}

export function ProductActions({ id, name, slug, price, promoPrice, image }: ProductActionsProps) {
    const { addItem } = useCart();
    const router = useRouter();

    const whatsappMessage = `Olá, tenho interesse no produto: ${name}%0AValor: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(promoPrice || price)}`;

    const handleWhatsApp = () => {
        window.open(`${SITE_CONFIG.whatsappLink}?text=${whatsappMessage}`, '_blank');
    };

    const handleAddToCart = () => {
        addItem({ id, name, slug, price, promoPrice, image, quantity: 1 });
    };

    const handleBuyNow = () => {
        addItem({ id, name, slug, price, promoPrice, image, quantity: 1 });
        router.push("/pagamento");
    };

    return (
        <>
            {/* Desktop Actions */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-16 rounded-2xl text-lg font-bold gap-3 border-2 hover:bg-slate-50 transition-all"
                        onClick={handleAddToCart}
                    >
                        <Plus className="w-5 h-5" /> Carrinho
                    </Button>
                    <Button
                        className="h-16 rounded-2xl text-lg font-bold gap-3 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all bg-primary"
                        onClick={handleBuyNow}
                    >
                        <CreditCard className="w-5 h-5" /> Comprar Agora
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        variant="ghost"
                        className="h-14 rounded-2xl text-base font-semibold gap-2 text-slate-500 hover:text-green-600 hover:bg-green-50"
                        onClick={handleWhatsApp}
                    >
                        <MessageCircle className="w-5 h-5" /> Dúvidas? WhatsApp
                    </Button>
                    <Link href={`/contato?produto=${slug}`} className="block">
                        <Button variant="ghost" className="w-full h-14 rounded-2xl text-base font-semibold text-slate-500">
                            Solicitar Proposta
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Floating Mobile Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t md:hidden z-50 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <Button
                    variant="outline"
                    className="flex-1 h-14 rounded-xl font-bold border-2"
                    onClick={handleAddToCart}
                >
                    + Carrinho
                </Button>
                <Button
                    className="flex-[2] h-14 rounded-xl font-black gap-2"
                    onClick={handleBuyNow}
                >
                    <ShoppingCart className="w-5 h-5 font-bold" /> Comprar
                </Button>
            </div>

            {/* Padding for scroll content */}
            <div className="h-24 md:hidden" />
        </>
    );
}
