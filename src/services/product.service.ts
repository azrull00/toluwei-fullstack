import { prisma } from "@/lib/db";
import type { Product, ProductCreateInput, ProductUpdateInput, ActionResult } from "@/types";

// ─── Helper: serialize Prisma result ─────────────────────────────────────────
// Prisma returns Date objects; cast to plain Product type for type safety.
function toProduct(p: unknown): Product {
    return p as Product;
}

// ─── Public ───────────────────────────────────────────────────────────────────

/**
 * Fetch all published products (for landing page)
 * Sorted by createdAt desc
 */
export async function getPublishedProducts(): Promise<Product[]> {
    try {
        const products = await prisma.product.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: "desc" },
        });
        return products.map(toProduct);
    } catch (error) {
        console.error("[getPublishedProducts]", error);
        return [];
    }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/**
 * Fetch all products regardless of published status (for admin)
 */
export async function getAllProducts(): Promise<Product[]> {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return products.map(toProduct);
    } catch (error) {
        console.error("[getAllProducts]", error);
        return [];
    }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        return product ? toProduct(product) : null;
    } catch (error) {
        console.error("[getProductById]", error);
        return null;
    }
}

/**
 * Create a new product
 */
export async function createProduct(
    data: ProductCreateInput
): Promise<ActionResult<Product>> {
    try {
        const product = await prisma.product.create({ data });
        return { success: true, data: toProduct(product) };
    } catch (error) {
        console.error("[createProduct]", error);
        return { success: false, error: "Gagal membuat produk. Periksa koneksi database." };
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
        return { success: true, data: toProduct(product) };
    } catch (error) {
        console.error("[updateProduct]", error);
        return { success: false, error: "Gagal mengupdate produk. Periksa koneksi database." };
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
        return { success: false, error: "Gagal menghapus produk. Periksa koneksi database." };
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
