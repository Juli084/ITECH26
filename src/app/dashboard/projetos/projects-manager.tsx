"use client";

import { useState } from "react";
import { createProject, deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Trash2, Plus, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string;
    projectUrl: string | null;
    createdAt: Date | null;
}

export function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [projectUrl, setProjectUrl] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await createProject({
                title,
                description,
                imageUrl,
                projectUrl
            });

            if (res.success) {
                // Clear form
                setTitle("");
                setDescription("");
                setImageUrl("");
                setProjectUrl("");
                router.refresh(); // Refresh server data
                // Optimistically update or wait for refresh? 
                // Since we passed initialProjects, we might want to just rely on router.refresh() 
                // but router.refresh() doesn't update props automatically without re-render from server.
                // Usually router.refresh() re-runs the server component and sends new payload to client, 
                // causing this component to re-render with new props if we are careful.
                // But for now, to be safe, I'd suggest a window reload or just trust the router.refresh() if structured correctly.
                // Actually, router.refresh() updates the Server Component that renders this.
                // WE MUST NOT update local state 'projects' manually if we rely on props, 
                // OR we update local state and router.refresh() in background.
                // I will update local state manually for instant feedback, then router.refresh ensures consistency.
                // Wait, I don't have the new ID. So better to just refresh.
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja remover este projeto?")) return;

        try {
            await deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    // Update local state when props change (if router.refresh works as expected)
    // Actually, Next.js re-renders the component with new props.
    // So we should sync state with props.
    // useState(initialProjects) only initializes once.
    // We can use a key on the component in the parent to force re-mount, or use useEffect.

    // Better yet, just use the router to reload.

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projetos Desenvolvidos</h1>
                    <p className="text-muted-foreground">Gerencie os projetos exibidos na página de Desenvolvimento Web.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Form Section */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Adicionar Novo Projeto</CardTitle>
                            <CardDescription>Preencha os dados do projeto realizado.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título do Projeto</Label>
                                    <Input
                                        id="title"
                                        placeholder="Ex: E-commerce de Roupas"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">URL da Imagem</Label>
                                    <Input
                                        id="image"
                                        placeholder="https://..."
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Recomendado: 800x600px ou 16:9.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="url">Link do Projeto (Opcional)</Label>
                                    <Input
                                        id="url"
                                        placeholder="https://cliente.com.br"
                                        value={projectUrl}
                                        onChange={e => setProjectUrl(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="desc">Legenda / Descrição</Label>
                                    <Textarea
                                        id="desc"
                                        placeholder="Breve descrição sobre o que foi feito..."
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                    Adicionar Projeto
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* List Section */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold">Projetos Ativos</h2>
                    {initialProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
                            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">Nenhum projeto cadastrado ainda.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {initialProjects.map((project) => (
                                <Card key={project.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="aspect-video relative bg-muted">
                                        {/* Simple img tag for now, next/image requires domain config */}
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Sem+Imagem';
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(project.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold truncate">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {project.description || "Sem descrição"}
                                        </p>
                                        {project.projectUrl && (
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center text-xs text-primary mt-3 hover:underline"
                                            >
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                Acessar Projeto
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
