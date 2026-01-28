"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const result = registerSchema.safeParse({ name, email, password, confirmPassword });

    if (!result.success) {
        return { error: result.error.issues[0].message };
    }

    try {
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser) {
            return { error: "E-mail já cadastrado" };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            name,
            email,
            passwordHash,
            role: "USER", // Default role
        });

        return { success: true };
    } catch (error) {
        return { error: "Erro ao criar conta. Tente novamente." };
    }
}
