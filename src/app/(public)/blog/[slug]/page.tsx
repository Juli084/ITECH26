import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

    if (!post) return { title: "Post não encontrado" };

    return {
        title: `${post.title} | Blog iTech`,
        description: post.content.substring(0, 160),
    };
}

export default async function PostViewPage({ params }: PostPageProps) {
    const { slug } = await params;

    const [post] = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

    if (!post) {
        notFound();
    }

    const isDraft = post.status === "DRAFT";

    return (
        <article className="container mx-auto px-4 py-24 max-w-3xl">
            <div className="space-y-4 mb-12 text-center">
                <div className="text-sm font-medium text-primary uppercase tracking-wider">Tech Insights</div>
                {isDraft && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full inline-flex items-center gap-2 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Este post é um Rascunho (Não visível ao público)
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
                <div className="text-muted-foreground">
                    Publicado em {post.publishedAt ? post.publishedAt.toLocaleDateString('pt-BR') : post.createdAt?.toLocaleDateString('pt-BR')}
                </div>
            </div>

            {post.featuredImage && (
                <div className="mb-12 overflow-hidden rounded-3xl shadow-2xl border bg-slate-100">
                    {post.mediaType === 'VIDEO' ? (
                        <div className="aspect-video w-full">
                            {post.featuredImage.includes('youtube.com') || post.featuredImage.includes('youtu.be') ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${post.featuredImage.split('v=')[1]?.split('&')[0] || post.featuredImage.split('/').pop()}`}
                                    title={post.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={post.featuredImage}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="aspect-video w-full relative">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            )}

            {!post.featuredImage && (
                <div className="aspect-video bg-muted rounded-3xl mb-12 flex items-center justify-center text-4xl font-bold text-muted-foreground/20 italic select-none">
                    iTech Featured Image
                </div>
            )}

            <div className="prose prose-lg max-w-none dark:prose-invert">
                {post.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-lg leading-relaxed text-foreground/80">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-20 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Gostou deste conteúdo?</h3>
                <p className="text-muted-foreground mb-6">Compartilhe com sua rede ou entre em contato para saber como a iTech pode ajudar seu negócio.</p>
            </div>
        </article>
    );
}
