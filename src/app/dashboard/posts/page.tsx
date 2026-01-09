import { getPosts, deletePost } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminPostsPage() {
    const posts = await getPosts();

    async function handleDelete(id: number) {
        "use server";
        await deletePost(id);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                    <p className="text-muted-foreground">Gerencie o conteúdo do seu blog.</p>
                </div>
                <Link href="/dashboard/posts/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Novo Post
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {posts.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            Nenhum post encontrado.
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                            <div className="flex items-center p-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{post.title}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${post.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">/{post.slug}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/blog/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                    </Link>
                                    <form action={handleDelete.bind(null, post.id)}>
                                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
