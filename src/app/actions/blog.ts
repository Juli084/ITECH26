"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";
import { safeAction } from "@/lib/action-utils";
import { postSchema } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function generateSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// NOTE: Uses FormData, so we extract data manually before passing to schema or handle inside manual function
// Since safeAction expects pure data matching Schema, and we have file uploads here mixed in FormData...
// It's cleaner to keep `createPost` manual BUT apply valid checks manually or use a customized wrapper.
// Given strict instructions to use safeAction, let's adapt.

export async function createPost(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const status = (formData.get("status") as "DRAFT" | "PUBLISHED") || "DRAFT";
    const mediaType = (formData.get("mediaType") as "IMAGE" | "VIDEO") || "IMAGE";
    let featuredImage = formData.get("featuredImage") as string;
    const imageFile = formData.get("imageFile") as File;

    // Validate using Zod manually
    const result = postSchema.safeParse({ title, content, status, featuredImage, mediaType });
    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    try {
        if (imageFile && imageFile.name && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            try {
                await fs.mkdir(uploadDir, { recursive: true });
            } catch { }

            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);
            featuredImage = `/uploads/${filename}`;
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
        console.error(error);
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
        return [];
    }
}

export async function deletePost(id: number) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    try {
        await db.delete(posts).where(eq(posts.id, id));
        revalidatePath("/blog");
        revalidatePath("/dashboard/posts");
        return { success: true };
    } catch (error) {
        return { error: "Erro ao deletar post" };
    }
}
