import { prisma } from "@/lib/db";
import type { Product, ProductCreateInput, ProductUpdateInput, ActionResult } from "@/types";

// ─── Public ───────────────────────────────────────────────────────────────────

/**
 * Fetch all published products (for landing page)
 * Sorted by createdAt desc
 */
export async function getPublishedProducts(): Promise<Product[]> {
    return prisma.product.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    }) as Promise<Product[]>;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/**
 * Fetch all products regardless of published status (for admin)
 */
export async function getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    }) as Promise<Product[]>;
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
        where: { id },
    }) as Promise<Product | null>;
}

/**
 * Create a new product
 */
export async function createProduct(
    data: ProductCreateInput
): Promise<ActionResult<Product>> {
    try {
        const product = await prisma.product.create({ data });
        return { success: true, data: product as Product };
    } catch (error) {
        console.error("[createProduct]", error);
        return { success: false, error: "Gagal membuat produk." };
    }
}

/**
 * Update an existing product
 */
export async function updateProduct(
    id: string,
    data: ProductUpdateInput
): Promise<ActionResult<Product>> {
    try {
        const product = await prisma.product.update({ where: { id }, data });
        return { success: true, data: product as Product };
    } catch (error) {
        console.error("[updateProduct]", error);
        return { success: false, error: "Gagal mengupdate produk." };
    }
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: string): Promise<ActionResult> {
    try {
        await prisma.product.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error("[deleteProduct]", error);
        return { success: false, error: "Gagal menghapus produk." };
    }
}

/**
 * Toggle publish status of a product
 */
export async function toggleProductPublished(
    id: string,
    isPublished: boolean
): Promise<ActionResult<Product>> {
    return updateProduct(id, { isPublished });
}
