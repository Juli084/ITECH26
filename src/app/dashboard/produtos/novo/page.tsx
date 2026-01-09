"use client";

import { ProductForm } from "../components/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/dashboard/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Voltar para lista
            </Link>

            <ProductForm />
        </div>
    );
}
