"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

const postSchema = z.object({
    title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
    content: z.string().min(20, "Conteúdo deve ser mais longo"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    featuredImage: z.string().optional(),
    mediaType: z.enum(["IMAGE", "VIDEO"]).optional(),
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
    const mediaType = (formData.get("mediaType") as "IMAGE" | "VIDEO") || "IMAGE";

    // Media Source: URL or File
    let featuredImage = formData.get("featuredImage") as string;
    const imageFile = formData.get("imageFile") as File;

    try {
        // If a file was uploaded, save it locally
        if (imageFile && imageFile.name && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            // Ensure directory exists
            try {
                await fs.access(uploadDir);
            } catch {
                await fs.mkdir(uploadDir, { recursive: true });
            }

            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);
            featuredImage = `/uploads/${filename}`;
        }

        const result = postSchema.safeParse({ title, content, status, featuredImage, mediaType });

        if (!result.success) {
            return { error: result.error.issues[0].message };
        }

        const slug = generateSlug(title);

        await db.insert(posts).values({
            title,
            slug,
            content,
            status,
            featuredImage,
            mediaType,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
        });

        revalidatePath("/blog");
        revalidatePath("/dashboard/posts");
        return { success: true };
    } catch (error) {
        console.error("Post creation error:", error);
        return { error: "Erro ao criar post ou salvar arquivo." };
    }
}

export async function getPosts(onlyPublished = false) {
    try {
        if (onlyPublished) {
            return await db.select()
                .from(posts)
                .where(eq(posts.status, "PUBLISHED"))
                .orderBy(desc(posts.createdAt));
        }

        return await db.select()
            .from(posts)
            .orderBy(desc(posts.createdAt));
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
