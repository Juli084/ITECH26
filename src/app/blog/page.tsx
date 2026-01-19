import { getPosts } from "@/app/actions/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar } from "lucide-react";

export const metadata = {
    title: "Blog iTech | Novidades e Dicas de Tecnologia",
    description: "Acompanhe as últimas novidades sobre reparos Apple, desenvolvimento web e estratégias digitais.",
};

export default async function BlogPage() {
    const posts = await getPosts(true);

    return (
        <div className="container mx-auto px-4 py-24 max-w-5xl">
            <div className="text-center mb-20 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog iTech</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Dicas, insights e as últimas tendências do mundo da tecnologia e marketing digital.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.length === 0 ? (
                    <p className="text-center col-span-full py-20 text-muted-foreground text-xl">
                        Fique ligado! Em breve teremos novidades por aqui.
                    </p>
                ) : (
                    posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <Card className="h-full overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                                <CardHeader className="p-0">
                                    <div className="aspect-video bg-muted relative overflow-hidden group">
                                        {post.featuredImage ? (
                                            post.mediaType === 'VIDEO' ? (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <img
                                                    src={(post as any).featuredImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl font-bold italic">
                                                iTech News
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {post.createdAt?.toLocaleDateString('pt-BR')}
                                    </div>
                                    <CardTitle className="text-2xl line-clamp-2">{post.title}</CardTitle>
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                        {post.content}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
