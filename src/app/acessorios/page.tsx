import { getProducts } from "@/app/actions/products";
import { ProductCard } from "./components/ProductCard";
import { ShoppingBag } from "lucide-react";

export const metadata = {
    title: "Acessórios e Tecnologia | iTech Soluções Digitais",
    description: "Cabos, fontes, capinhas, películas e periféricos de alta qualidade. Confira nossa seleção curada de acessórios.",
};

export default async function AccessoriesPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Store */}
            <section className="bg-white border-b py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/5 text-primary mb-6">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Acessórios iTech
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Qualidade premium para seus dispositivos. De carregadores a periféricos gamer, selecionamos apenas o melhor.
                    </p>
                </div>
            </section>

            {/* Grid de Produtos */}
            <section className="py-16 container mx-auto px-4">
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                        <p className="text-muted-foreground">Nenhum acessório cadastrado no momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                slug={product.slug}
                                price={product.price}
                                promoPrice={product.promoPrice}
                                category={product.category}
                                image={product.mainImage}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-white border-t">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <h3 className="font-bold mb-2">Qualidade Garantida</h3>
                            <p className="text-sm text-muted-foreground">Todos os nossos acessórios passam por testes rigorosos.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold mb-2">Suporte Especializado</h3>
                            <p className="text-sm text-muted-foreground">Dúvida sobre compatibilidade? Nossa equipe ajuda você.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold mb-2">Retirada em Sorocaba</h3>
                            <p className="text-sm text-muted-foreground">Compre online e retire no mesmo dia em nossa unidade.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
