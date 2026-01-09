"use client";

import Link from "next/link";
import { ShoppingBag, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
    id: number;
    name: string;
    slug: string;
    price: number;
    promoPrice?: number | null;
    category: string;
    image: string | null;
}

export function ProductCard({ id, name, slug, price, promoPrice, category, image }: ProductCardProps) {
    const { addItem } = useCart();
    const hasPromo = promoPrice && promoPrice < price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, slug, price, promoPrice, image, quantity: 1 });
    };

    return (
        <Card className="group overflow-hidden border-none shadow-none bg-transparent hover:-translate-y-1 transition-all duration-500">
            <Link href={`/acessorios/${slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 mb-6">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="object-contain w-full h-full p-8 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ShoppingBag className="w-12 h-12" />
                        </div>
                    )}

                    {/* Badge de Promoção */}
                    {hasPromo && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/30 uppercase tracking-widest">
                            Oferta
                        </div>
                    )}

                    <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Button
                            size="icon"
                            className="rounded-full h-12 w-12 shadow-xl shadow-primary/20"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-1 px-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{category}</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{name}</h3>
                    <div className="flex items-center gap-2 pt-1">
                        {hasPromo ? (
                            <>
                                <span className="text-xl font-black text-slate-900">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(promoPrice)}
                                </span>
                                <span className="text-sm font-medium text-slate-400 line-through decoration-red-500/50">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-black text-slate-900">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </Card>
    );
}
