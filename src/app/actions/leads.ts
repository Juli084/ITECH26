"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { safeAction } from "@/lib/action-utils";
import { leadSchema } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const createLead = safeAction(leadSchema, async (data) => {
    await db.insert(leads).values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceInterest: data.serviceInterest,
        message: data.message,
        status: "NEW",
    });

    return { success: true };
    // No role required (public)
});

export async function getLeads() {
    // RBAC: Only ADMIN can read leads
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return [];
    }

    try {
        const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
        return allLeads;
    } catch (error) {
        return [];
    }
}
