"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/app/actions/blog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select id="status" name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="DRAFT">Rascunho</option>
                        <option value="PUBLISHED">Publicado</option>
                    </select>
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
