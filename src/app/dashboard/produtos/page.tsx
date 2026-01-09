import { db } from "@/db";
export const dynamic = 'force-dynamic';
import { products, productMedia } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Plus, Package, Trash2, Edit, ExternalLink, AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/products";

export default async function AdminProductsPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

    // Buscar imagens para exibição na lista
    const productsWithImages = await Promise.all(
        allProducts.map(async (p) => {
            const [img] = await db.select().from(productMedia).where(eq(productMedia.productId, p.id)).limit(1);
            return { ...p, mainImage: img?.url };
        })
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Produtos</h1>
                    <p className="text-muted-foreground mt-1">Controle de estoque, preços e visibilidade da loja de acessórios.</p>
                </div>
                <Link href="/dashboard/produtos/novo">
                    <Button className="gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                        <Plus className="h-5 w-5" /> Novo Produto
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b bg-slate-50/50">
                                    <th className="px-6 py-4 font-semibold text-slate-700">Produto</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Categoria</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Preço</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Estoque</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right text-slate-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {productsWithImages.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-slate-50 rounded-full">
                                                    <Package className="h-8 w-8 text-slate-300" />
                                                </div>
                                                <p className="text-slate-500 font-medium">Nenhum produto cadastrado até o momento.</p>
                                                <Link href="/dashboard/produtos/novo">
                                                    <Button variant="outline" size="sm">Adicionar primeiro produto</Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    productsWithImages.map((product) => (
                                        <tr key={product.id} className="group transition-colors hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-lg bg-slate-100 border overflow-hidden flex-shrink-0">
                                                        {product.mainImage ? (
                                                            <img src={product.mainImage} alt="" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-slate-300">
                                                                <Package className="h-5 w-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</div>
                                                        <div className="text-xs text-slate-500">Slug: {product.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold ${product.stockQuantity < 5 ? 'text-red-500' : 'text-slate-700'}`}>
                                                        {product.stockQuantity}
                                                    </span>
                                                    {product.stockQuantity < 5 && (
                                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                    )}
                                                </div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-tighter">unidades</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.status === 'ACTIVE' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                                        <Eye className="h-3 w-3" /> Ativo
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                                        <EyeOff className="h-3 w-3" /> Inativo
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/acessorios/${product.slug}`} target="_blank">
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/dashboard/produtos/${product.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-blue-500">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <form action={async () => {
                                                        "use server";
                                                        await deleteProduct(product.id);
                                                    }}>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-500">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
