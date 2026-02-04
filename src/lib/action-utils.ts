import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export type ActionState<T> = {
    success?: boolean;
    data?: T;
    error?: string;
};

type ActionOptions = {
    role?: "ADMIN" | "USER";
};

/**
 * Wrapper for Server Actions that handles:
 * 1. Authentication & Role checks
 * 2. Zod Validation
 * 3. Error Handling (returns standard object)
 */
export function safeAction<S extends z.ZodType<any, any>, R>(
    schema: S,
    action: (data: z.infer<S>) => Promise<R>,
    options?: ActionOptions
) {
    return async (input: unknown): Promise<ActionState<R>> => {
        try {
            // 1. Auth Check (if role required)
            if (options?.role) {
                const session = await getServerSession(authOptions);
                const userRole = session?.user?.role;

                if (!session || userRole !== options.role) {
                    return { error: "Não autorizado" };
                }
            }

            // 2. Validation
            const parsed = schema.safeParse(input);
            if (!parsed.success) {
                return { error: parsed.error.issues[0].message };
            }

            // 3. Execution
            const result = await action(parsed.data);

            // Allow returning the raw result if it matches the shape, or wrap it
            return { success: true, data: result };

        } catch (error) {
            console.error("Action Error:", error);
            // Return a generic error to client, but log the real one
            return { error: "Ocorreu um erro ao processar sua solicitação." };
        }
    };
}

/**
 * Simplified wrapper for actions without input validation (just auth/error handling)
 */
export function authenticatedAction<R>(
    action: () => Promise<R>,
    options?: ActionOptions
) {
    return async (): Promise<ActionState<R>> => {
        try {
            if (options?.role) {
                const session = await getServerSession(authOptions);
                const userRole = session?.user?.role;

                if (!session || userRole !== options.role) {
                    return { error: "Não autorizado" };
                }
            }

            const result = await action();
            return { success: true, data: result };

        } catch (error) {
            console.error("Action Error:", error);
            return { error: "Ocorreu um erro interno." };
        }
    };
}
