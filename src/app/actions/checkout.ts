"use server";

import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { safeAction } from "@/lib/action-utils";

// Schema for checkout input (just IDs and Quantities)
const checkoutSchema = z.object({
    items: z.array(z.object({
        id: z.number(),
        quantity: z.number().min(1)
    })).min(1, "Carrinho vazio")
});

export const createOrder = safeAction(checkoutSchema, async (data) => {
    // 1. Fetch real products from DB
    const productIds = data.items.map(item => item.id);
    const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));

    if (dbProducts.length !== productIds.length) {
        throw new Error("Alguns produtos não foram encontrados ou não estão mais disponíveis.");
    }

    // 2. Calculate Total (Server-Side)
    let totalCents = 0;
    const finalItems = [];

    for (const item of data.items) {
        const product = dbProducts.find(p => p.id === item.id);
        if (!product) continue;

        const priceToUse = product.promoPrice || product.price;
        totalCents += priceToUse * item.quantity;

        finalItems.push({
            productId: product.id,
            quantity: item.quantity,
            priceAtPurchase: priceToUse
        });
    }

    // 3. Create Order
    const [newOrder] = await db.insert(orders).values({
        total: totalCents,
        status: "PENDING",
        // userId: session?.user?.id ? Number(session.user.id) : null, // Optional for now
    }).returning();

    // 4. Create Order Items
    if (finalItems.length > 0) {
        const orderItemsValues = finalItems.map(item => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase
        }));
        await db.insert(orderItems).values(orderItemsValues);
    }

    return {
        orderId: newOrder.id,
        total: totalCents
    };
});
