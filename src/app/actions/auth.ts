"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { safeAction } from "@/lib/action-utils";
import { registerSchema } from "@/lib/schemas";

export const registerUser = safeAction(registerSchema, async (data) => {
    const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);

    if (existingUser) {
        throw new Error("E-mail já cadastrado"); // safeAction will catch this
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await db.insert(users).values({
        name: data.name,
        email: data.email,
        passwordHash,
        role: "USER", // Default role
    });

    return { success: true };
});
