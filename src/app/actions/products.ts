"use server";

import { db } from "@/db";
import { products, productMedia } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

const productSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    price: z.number().min(0, "O preço deve ser maior ou igual a zero"),
    promoPrice: z.number().min(0).optional().nullable(),
    stockQuantity: z.number().int().min(0),
    category: z.string().min(1, "Selecione uma categoria"),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    images: z.array(z.string()).optional(),
});

export async function uploadFile(formData: FormData) {
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
        await fs.mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { error: "Erro ao fazer upload do arquivo" };
    }
}

export async function createProduct(data: z.infer<typeof productSchema>) {
    try {
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
        return { success: true, product: newProduct };
    } catch (error) {
        console.error("Error creating product:", error);
        return { error: "Erro ao criar produto" };
    }
}

export async function getProducts(includeInactive = false) {
    try {
        const query = db.select().from(products);

        if (!includeInactive) {
            query.where(eq(products.status, "ACTIVE"));
        }

        const results = await query.orderBy(desc(products.createdAt));

        // Buscar primeira imagem para cada produto
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
        console.error("Error fetching products:", error);
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
        console.error("Error fetching product by slug:", error);
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
        console.error("Error fetching product by id:", error);
        return null;
    }
}

export async function updateProduct(id: number, data: z.infer<typeof productSchema>) {
    try {
        const slug = data.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        await db.update(products).set({
            name: data.name,
            slug,
            description: data.description,
            price: Math.round(data.price * 100),
            promoPrice: data.promoPrice ? Math.round(data.promoPrice * 100) : null,
            stockQuantity: data.stockQuantity,
            category: data.category,
            status: data.status,
        }).where(eq(products.id, id));

        // Update media: simple approach for MVP - delete and re-insert
        if (data.images) {
            await db.delete(productMedia).where(eq(productMedia.productId, id));
            if (data.images.length > 0) {
                const mediaValues = data.images.map((url, index) => ({
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
        console.error("Error updating product:", error);
        return { error: "Erro ao atualizar produto" };
    }
}

export async function deleteProduct(id: number) {
    try {
        await db.delete(products).where(eq(products.id, id));
        revalidatePath("/acessorios");
        revalidatePath("/dashboard/produtos");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { error: "Erro ao excluir produto" };
    }
}
