"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, uploadFile } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, X, Image as ImageIcon, ExternalLink, Upload, Film } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
    initialData?: {
        id: number;
        name: string;
        description: string;
        price: number;
        promoPrice?: number | null;
        stockQuantity: number;
        category: string;
        status: "ACTIVE" | "INACTIVE";
        media?: { url: string; type: string }[];
    };
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Múltiplas imagens (URLs)
    const [imageUrls, setImageUrls] = useState<string[]>(
        initialData?.media?.map(m => m.url) || [""]
    );

    const categories = ["Cabos", "Carregadores", "Capinhas", "Películas", "Gamer", "Áudio", "Outros"];

    const addImageField = () => setImageUrls([...imageUrls, ""]);

    const removeImageField = (index: number) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls.length > 0 ? newUrls : [""]);
    };

    const updateImageUrl = (index: number, value: string) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);

        if (result.success && result.url) {
            // Encontra o primeiro campo vazio ou adiciona um novo
            const emptyIndex = imageUrls.findIndex(url => url.trim() === "");
            if (emptyIndex !== -1) {
                updateImageUrl(emptyIndex, result.url);
            } else {
                setImageUrls([...imageUrls, result.url]);
            }
        } else {
            setError(result.error || "Erro ao fazer upload");
        }
        setUploading(false);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const price = parseFloat(formData.get("price") as string);
        const promoPriceRaw = formData.get("promoPrice") as string;
        const promoPrice = promoPriceRaw ? parseFloat(promoPriceRaw) : null;

        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: price,
            promoPrice: promoPrice,
            stockQuantity: parseInt(formData.get("stockQuantity") as string),
            category: formData.get("category") as string,
            status: formData.get("status") as "ACTIVE" | "INACTIVE",
            images: imageUrls.filter(url => url.trim() !== ""),
        };

        let result;
        if (initialData) {
            result = await updateProduct(initialData.id, data);
        } else {
            result = await createProduct(data);
        }

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push("/dashboard/produtos");
            router.refresh();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Coluna Principal: Informações Gerais */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="rounded-2xl shadow-sm overflow-hidden border-slate-200">
                    <CardHeader className="border-b bg-slate-50/30">
                        <CardTitle className="text-xl">Especificações Técnicas</CardTitle>
                        <CardDescription>Defina o nome, descrição e categoria do seu acessório.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-slate-700">Nome Comercial</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                className="h-12 rounded-xl focus-visible:ring-primary"
                                placeholder="Ex: Carregador Rápido 20W Apple Original"
                                defaultValue={initialData?.name}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-bold text-slate-700">Categoria</Label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    defaultValue={initialData?.category || ""}
                                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary"
                                >
                                    <option value="">Selecionar Categoria...</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-bold text-slate-700">Status de Visibilidade</Label>
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    defaultValue={initialData?.status || "ACTIVE"}
                                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary"
                                >
                                    <option value="ACTIVE">Publicado (Ativo)</option>
                                    <option value="INACTIVE">Rascunho (Oculto)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-bold text-slate-700">Descrição e Detalhes</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                className="min-h-[150px] rounded-xl focus-visible:ring-primary resize-none leading-relaxed"
                                placeholder="Descreva as características técnicas..."
                                defaultValue={initialData?.description}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Gestão de Fotos / Vídeos */}
                <Card className="rounded-2xl shadow-sm overflow-hidden border-slate-200">
                    <CardHeader className="border-b bg-slate-50/30">
                        <CardTitle className="text-xl">Mídias do Produto</CardTitle>
                        <CardDescription>Faça upload de fotos/vídeos ou insira links externos.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors relative cursor-pointer group">
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                                {uploading ? (
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                ) : (
                                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
                                )}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-slate-700">Fazer Upload</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Imagem ou Vídeo</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Links Externos</p>
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={url}
                                            onChange={(e) => updateImageUrl(index, e.target.value)}
                                            className="h-10 rounded-xl"
                                            placeholder="https://..."
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-slate-400 hover:text-red-500 rounded-xl flex-shrink-0"
                                            onClick={() => removeImageField(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary text-xs font-bold"
                                    onClick={addImageField}
                                >
                                    + Adicionar Campo de Link
                                </Button>
                            </div>
                        </div>

                        {/* Preview Grid */}
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                            {imageUrls.filter(url => url.trim() !== "").map((url, index) => (
                                <div key={index} className="aspect-square rounded-xl bg-slate-50 border overflow-hidden relative group">
                                    {url.match(/\.(mp4|webm|ogg)$/i) ? (
                                        <div className="h-full w-full flex items-center justify-center bg-slate-900">
                                            <Film className="h-6 w-6 text-white" />
                                        </div>
                                    ) : (
                                        <img src={url} alt="" className="h-full w-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold uppercase">{index === 0 ? 'Capa' : `#${index + 1}`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Coluna Lateral: Preço e Estoque */}
            <div className="space-y-8">
                <Card className="rounded-2xl shadow-sm overflow-hidden border-slate-200">
                    <CardHeader className="border-b bg-slate-50/30">
                        <CardTitle className="text-xl">Preço & Promoção</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-bold text-slate-700">Preço Normal (R$)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-medium">R$</span>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    className="h-11 rounded-xl pl-10 bg-slate-50/50"
                                    placeholder="0,00"
                                    defaultValue={initialData?.price}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="promoPrice" className="text-sm font-bold text-slate-700 flex items-center justify-between">
                                <span>Preço Promocional (R$)</span>
                                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Oferta</span>
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-medium">R$</span>
                                <Input
                                    id="promoPrice"
                                    name="promoPrice"
                                    type="number"
                                    step="0.01"
                                    className="h-11 rounded-xl pl-10 bg-red-50/30 border-red-100"
                                    placeholder="0,00"
                                    defaultValue={initialData?.promoPrice || ""}
                                />
                            </div>
                            <p className="text-[10px] text-slate-400">Deixe em branco para não usar promoção.</p>
                        </div>

                        <div className="pt-6 border-t space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Estoque Atual</span>
                                <Input
                                    id="stockQuantity"
                                    name="stockQuantity"
                                    type="number"
                                    required
                                    className="w-20 h-10 rounded-xl text-center font-bold"
                                    placeholder="0"
                                    defaultValue={initialData?.stockQuantity}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ações Fixas */}
                <div className="sticky top-24 space-y-3">
                    <Button
                        type="submit"
                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 gap-2"
                        disabled={loading || uploading}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                        {initialData ? "Atualizar Produto" : "Publicar Produto"}
                    </Button>
                    <Link href="/dashboard/produtos" className="block text-center text-sm text-slate-400 hover:text-slate-600 transition-colors">
                        Cancelar e Voltar
                    </Link>
                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
