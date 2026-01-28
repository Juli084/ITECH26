"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { z } from "zod";

const leadSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    serviceInterest: z.string().min(1, "Selecione um serviço"),
    message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export async function createLead(data: {
    name: string;
    email: string;
    phone?: string;
    serviceInterest: string;
    message: string;
}) {
    const result = leadSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    try {
        await db.insert(leads).values({
            name: data.name,
            email: data.email,
            phone: data.phone,
            serviceInterest: data.serviceInterest,
            message: data.message,
            status: "NEW",
        });

        return { success: true };
    } catch (error) {
        return { error: "Erro ao enviar mensagem. Tente novamente." };
    }
}

export async function getLeads() {
    try {
        const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
        return allLeads;
    } catch (error) {
        return [];
    }
}
