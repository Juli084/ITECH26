"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/app/actions/blog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Image, Video, FileText, Settings, Plus } from "lucide-react";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
    const [preview, setPreview] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const result = await createPost(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push("/dashboard/posts");
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Novo Post</h2>
                <p className="text-muted-foreground">Publique conteúdo relevante para seus clientes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border shadow-sm">
                <div className="space-y-2">
                    <Label htmlFor="title">Título do Post</Label>
                    <Input id="title" name="title" placeholder="Ex: Dicas para cuidar do seu iPhone" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select id="status" name="status" defaultValue="PUBLISHED" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="PUBLISHED">Publicado (Visível no Blog)</option>
                            <option value="DRAFT">Rascunho (Privado)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mediaType">Tipo de Mídia</Label>
                        <select id="mediaType" name="mediaType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="IMAGE">Imagem</option>
                            <option value="VIDEO">Vídeo (YouTube/Vimeo/Direct URL)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 border-y py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Label className="text-base font-semibold">Mídia do Post</Label>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setUploadMethod('upload')}
                                className={`px-3 py-1 text-xs rounded-md transition-all ${uploadMethod === 'upload' ? 'bg-white shadow-sm font-bold' : 'text-muted-foreground'}`}
                            >
                                Subir Arquivo
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMethod('url')}
                                className={`px-3 py-1 text-xs rounded-md transition-all ${uploadMethod === 'url' ? 'bg-white shadow-sm font-bold' : 'text-muted-foreground'}`}
                            >
                                Link Externo
                            </button>
                        </div>
                    </div>

                    {uploadMethod === 'upload' ? (
                        <div className="space-y-2">
                            <Label htmlFor="imageFile" className="flex items-center gap-2">
                                <Image className="h-4 w-4" /> Selecionar Imagem do Computador
                            </Label>
                            <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer relative">
                                <input
                                    id="imageFile"
                                    name="imageFile"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setPreview(URL.createObjectURL(file));
                                    }}
                                />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="h-32 w-auto rounded-lg shadow-md" />
                                ) : (
                                    <>
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                                            <Plus className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-medium">Clique para selecionar ou arraste a imagem</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (Max. 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="featuredImage" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" /> URL da Mídia (Imagem ou Vídeo)
                            </Label>
                            <Input
                                id="featuredImage"
                                name="featuredImage"
                                placeholder="https://exemplo.com/imagem.jpg"
                                onChange={(e) => setPreview(e.target.value)}
                            />
                            {preview && <img src={preview} alt="Preview URL" className="h-20 w-auto rounded mt-2 border" />}
                            <p className="text-[10px] text-muted-foreground">Cole o link direto da imagem ou do vídeo (YouTube/Vimeo).</p>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo (Markdown ou Texto Simples)</Label>
                    <Textarea id="content" name="content" className="min-h-[400px] font-mono" placeholder="Escreva o conteúdo aqui..." required />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-4">
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Post"}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}
