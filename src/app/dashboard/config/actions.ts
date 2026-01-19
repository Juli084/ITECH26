"use server";

import { db } from "@/db";
import { siteSettings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateSiteSettings(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
        throw new Error("Não autorizado");
    }

    const siteName = formData.get("siteName") as string;
    const siteDescription = formData.get("siteDescription") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;

    await db.update(siteSettings)
        .set({
            siteName,
            siteDescription,
            whatsappNumber,
            contactEmail,
            instagramUrl,
            linkedinUrl,
            updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, 1));

    revalidatePath("/dashboard/config");
    return { success: true };
}

export async function updateProfile(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        throw new Error("Não autorizado");
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;

    const updateData: any = { name, email };

    if (newPassword && newPassword.length >= 6) {
        updateData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    await db.update(users)
        .set(updateData)
        .where(eq(users.email, session.user.email));

    revalidatePath("/dashboard/config");
    return { success: true };
}
