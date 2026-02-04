import { z } from "zod";

// --- Common Schemas ---

export const idSchema = z.number().int().positive();

export const emailSchema = z.string().email("Email inválido");

export const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");

export const phoneSchema = z.string()
    .min(10, "Telefone deve ter DDD + número")
    .transform((val) => val.replace(/\D/g, "")); // Remove non-digits

export const slugSchema = z.string()
    .min(1, "Slug inválido")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug deve conter apenas letras minúsculas, números e hífens");

// --- Entity Schemas ---

export const registerSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export const leadSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: emailSchema,
    phone: z.string().optional(), // Keeping optional but utilizing standard string for now, could apply phoneSchema if strictness needed
    serviceInterest: z.string().min(1, "Selecione um serviço"),
    message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export const postSchema = z.object({
    title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
    content: z.string().min(20, "Conteúdo deve ser mais longo"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    featuredImage: z.string().optional(),
    mediaType: z.enum(["IMAGE", "VIDEO"]).optional(),
});

export const productSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    price: z.number().min(0, "O preço deve ser maior ou igual a zero"),
    promoPrice: z.number().min(0).optional().nullable(),
    stockQuantity: z.number().int().min(0),
    category: z.string().min(1, "Selecione uma categoria"),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    images: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    imageUrl: z.string().url("URL da imagem inválida"),
    projectUrl: z.string().url("URL do projeto inválida").optional().or(z.literal("")),
});
