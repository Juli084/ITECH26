"use server";

import { db } from "@/db";
import { products, productMedia } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { safeAction } from "@/lib/action-utils";
import { productSchema } from "@/lib/schemas";

export async function uploadFile(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { error: "Nenhum arquivo enviado" };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Gera um nome único
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + "-" + file.name.replace(/\s+/g, "-");
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Garante que o diretório existe
        try {
            await fs.mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Ignore if exists
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        return { error: "Erro ao fazer upload do arquivo" };
    }
}

export const createProduct = safeAction(productSchema, async (data) => {
    const slug = data.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const [newProduct] = await db.insert(products).values({
        name: data.name,
        slug,
        description: data.description,
        price: Math.round(data.price * 100), // Converte para centavos
        promoPrice: data.promoPrice ? Math.round(data.promoPrice * 100) : null,
        stockQuantity: data.stockQuantity,
        category: data.category,
        status: data.status,
    }).returning();

    if (data.images && data.images.length > 0) {
        const mediaValues = data.images.map((url, index) => ({
            productId: newProduct.id,
            url,
            displayOrder: index,
            type: url.match(/\.(mp4|webm|ogg)$/i) ? "VIDEO" : "IMAGE",
        }));
        await db.insert(productMedia).values(mediaValues);
    }

    revalidatePath("/acessorios");
    revalidatePath("/dashboard/produtos");
    return { product: newProduct };
}, { role: "ADMIN" });

export async function getProducts(includeInactive = false) {
    try {
        const query = db.select().from(products);

        if (!includeInactive) {
            query.where(eq(products.status, "ACTIVE"));
        }

        const results = await query.orderBy(desc(products.createdAt));

        const productsWithImage = await Promise.all(
            results.map(async (product) => {
                const [firstMedia] = await db
                    .select()
                    .from(productMedia)
                    .where(eq(productMedia.productId, product.id))
                    .orderBy(productMedia.displayOrder)
                    .limit(1);

                return {
                    ...product,
                    price: product.price / 100, // Converte de volta para reais
                    promoPrice: product.promoPrice ? product.promoPrice / 100 : null,
                    mainImage: firstMedia?.url || null,
                };
            })
        );

        return productsWithImage;
    } catch (error) {
        return [];
    }
}

export async function getProductBySlug(slug: string, onlyActive = true) {
    try {
        const conditions = [eq(products.slug, slug)];

        if (onlyActive) {
            conditions.push(eq(products.status, "ACTIVE"));
        }

        const [product] = await db
            .select()
            .from(products)
            .where(and(...conditions))
            .limit(1);

        if (!product) return null;

        const media = await db
            .select()
            .from(productMedia)
            .where(eq(productMedia.productId, product.id))
            .orderBy(productMedia.displayOrder);

        return {
            ...product,
            price: product.price / 100,
            promoPrice: product.promoPrice ? product.promoPrice / 100 : null,
            media,
        };
    } catch (error) {
        return null;
    }
}

export async function getProductById(id: number) {
    try {
        const [product] = await db
            .select()
            .from(products)
            .where(eq(products.id, id))
            .limit(1);

        if (!product) return null;

        const media = await db
            .select()
            .from(productMedia)
            .where(eq(productMedia.productId, product.id))
            .orderBy(productMedia.displayOrder);

        return {
            ...product,
            price: product.price / 100,
            promoPrice: product.promoPrice ? product.promoPrice / 100 : null,
            media,
        };
    } catch (error) {
        return null;
    }
}

export async function updateProduct(id: number, data: any) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const validData = parsed.data;

    try {
        const slug = validData.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        await db.update(products).set({
            name: validData.name,
            slug,
            description: validData.description,
            price: Math.round(validData.price * 100),
            promoPrice: validData.promoPrice ? Math.round(validData.promoPrice * 100) : null,
            stockQuantity: validData.stockQuantity,
            category: validData.category,
            status: validData.status,
        }).where(eq(products.id, id));

        if (validData.images) {
            await db.delete(productMedia).where(eq(productMedia.productId, id));
            if (validData.images.length > 0) {
                const mediaValues = validData.images.map((url, index) => ({
                    productId: id,
                    url,
                    displayOrder: index,
                    type: url.match(/\.(mp4|webm|ogg)$/i) ? "VIDEO" : "IMAGE",
                }));
                await db.insert(productMedia).values(mediaValues);
            }
        }

        revalidatePath("/acessorios");
        revalidatePath(`/acessorios/${slug}`);
        revalidatePath("/dashboard/produtos");
        return { success: true };
    } catch (error) {
        return { error: "Erro ao atualizar produto" };
    }
}

export async function deleteProduct(id: number) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    try {
        await db.delete(products).where(eq(products.id, id));
        revalidatePath("/acessorios");
        revalidatePath("/dashboard/produtos");
        return { success: true };
    } catch (error) {
        return { error: "Erro ao excluir produto" };
    }
}
