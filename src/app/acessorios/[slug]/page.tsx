import { getProductBySlug } from "@/app/actions/products";
export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import { Check, ShoppingCart, ArrowLeft, ShieldCheck, Truck, Film } from "lucide-react";
import Link from "next/link";
import { ProductActions } from "../components/ProductActions";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Produto não encontrado" };

    return {
        title: `${product.name} | iTech Soluções Digitais`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: product.media?.[0]?.url ? [{ url: product.media[0].url }] : [],
        }
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug, true);

    if (!product) {
        notFound();
    }

    const hasPromo = product.promoPrice && product.promoPrice < product.price;

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 md:py-16">
                <Link href="/acessorios" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary mb-12 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar para acessórios
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Gallery - Premium Look */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 group">
                            {product.media && product.media.length > 0 ? (
                                product.media[0].type === "VIDEO" ? (
                                    <video
                                        src={product.media[0].url}
                                        controls
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={product.media[0].url}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                                    />
                                )
                            ) : (
                                <ShoppingCart className="w-32 h-32 text-slate-100" />
                            )}
                        </div>

                        {product.media && product.media.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.media.map((item, i) => (
                                    <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors">
                                        {item.type === "VIDEO" ? (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-lg">
                                                <Film className="w-6 h-6 text-white" />
                                            </div>
                                        ) : (
                                            <img src={item.url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Side */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary/5 text-primary font-bold text-[10px] uppercase tracking-[0.2em] rounded-full">
                                    {product.category}
                                </span>
                                {product.stockQuantity > 0 ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        <Check className="w-3 h-3" /> Em estoque
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Sob consulta
                                    </span>
                                )}
                                {hasPromo && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Oferta Especial
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 decoration-primary/10 decoration-8 underline-offset-8">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3 mb-8">
                                {hasPromo ? (
                                    <>
                                        <span className="text-5xl font-black text-red-600">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promoPrice!)}
                                        </span>
                                        <span className="text-xl font-medium text-slate-400 line-through">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-5xl font-black text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                    </span>
                                )}
                                <span className="text-slate-400 text-sm font-medium">à vista ou via Pix</span>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none mb-10">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                Destaques do produto
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed italic whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </div>

                        {/* CTAs via Client Component */}
                        <ProductActions
                            id={product.id}
                            name={product.name}
                            slug={product.slug}
                            price={product.price}
                            promoPrice={product.promoPrice}
                            image={product.media?.[0]?.url || null}
                        />

                        {/* Premium Trust Badges */}
                        <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Garantia iTech</h4>
                                    <p className="text-xs text-slate-500 mt-1">90 dias com cobertura total contra defeitos.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Retirada Express</h4>
                                    <p className="text-xs text-slate-500 mt-1">Pronta entrega para Sorocaba e região.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
