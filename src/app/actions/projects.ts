'use server'

import { db } from "@/db/index";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getProjects() {
    try {
        const data = await db.select().from(projects).orderBy(desc(projects.createdAt));
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Failed to fetch projects" };
    }
}

export async function createProject(data: {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
}) {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        await db.insert(projects).values({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            projectUrl: data.projectUrl,
        });
        revalidatePath("/dashboard/projetos");
        revalidatePath("/servicos/desenvolvimento-web");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create project" };
    }
}

export async function deleteProject(id: number) {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        await db.delete(projects).where(eq(projects.id, id));
        revalidatePath("/dashboard/projetos");
        revalidatePath("/servicos/desenvolvimento-web");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete project" };
    }
}
