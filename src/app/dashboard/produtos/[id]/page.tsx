import { getProductById } from "@/app/actions/products";
import { notFound } from "next/navigation";
import { ProductForm } from "../components/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(parseInt(id));

    if (!product) {
        notFound();
    }

    // Prepara os dados para o formulário
    const initialData = {
        ...product,
        status: product.status as "ACTIVE" | "INACTIVE",
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/dashboard/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Voltar para lista
            </Link>

            <ProductForm initialData={initialData} />
        </div>
    );
}
