"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

export function CartTrigger() {
    const { toggleCart, totalItems } = useCart();

    return (
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
    );
}
