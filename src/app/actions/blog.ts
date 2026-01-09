"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
    content: z.string().min(20, "Conteúdo deve ser mais longo"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
});

function generateSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = (formData.get("status") as "DRAFT" | "PUBLISHED") || "DRAFT";

    const result = postSchema.safeParse({ title, content, status });

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    try {
        const slug = generateSlug(title);

        await db.insert(posts).values({
            title,
            slug,
            content,
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
        });

        revalidatePath("/blog");
        revalidatePath("/dashboard/posts");
        return { success: true };
    } catch (error) {
        console.error("Post creation error:", error);
        return { error: "Erro ao criar post ou slug duplicado." };
    }
}

export async function getPosts(onlyPublished = false) {
    try {
        const query = db.select().from(posts);

        if (onlyPublished) {
            // @ts-ignore
            query.where(eq(posts.status, "PUBLISHED"));
        }

        return await query.orderBy(desc(posts.createdAt));
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function deletePost(id: number) {
    try {
        await db.delete(posts).where(eq(posts.id, id));
        revalidatePath("/blog");
        revalidatePath("/dashboard/posts");
        return { success: true };
    } catch (error) {
        return { error: "Erro ao deletar post" };
    }
}
