"use server";

import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/services/product.service";
import type { ActionResult } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function handleImageUpload(formData: FormData): Promise<string | null> {
    try {
        const file = formData.get("imageFile") as File | null;
        if (file && file.size > 0) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("Ukuran file maks 5MB.");
            }
            // Validate file type
            const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            if (!validTypes.includes(file.type)) {
                throw new Error("Format file harus JPG, PNG, atau WEBP.");
            }
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = file.name.split(".").pop() ?? "jpg";
            const name = `${Date.now()}.${ext}`;
            const dir = join(process.cwd(), "public", "uploads");
            await mkdir(dir, { recursive: true });
            await writeFile(join(dir, name), buffer);
            return `/uploads/${name}`;
        }
        // Fall-back to URL input
        const url = (formData.get("imageUrl") as string)?.trim();
        return url || null;
    } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error("Gagal mengupload gambar.");
    }
}

function validateProductFields(formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    if (!name) throw new Error("Nama produk wajib diisi.");

    const priceStr = formData.get("price") as string;
    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) throw new Error("Harga harus berupa angka positif.");

    const unit = (formData.get("unit") as string)?.trim();
    if (!unit) throw new Error("Satuan produk wajib diisi.");

    const type = (formData.get("type") as string) || "SEGAR";
    if (!["SEGAR", "OLAHAN"].includes(type)) throw new Error("Kategori tidak valid.");

    return {
        name,
        description: (formData.get("description") as string)?.trim() || null,
        type: type as "SEGAR" | "OLAHAN",
        price,
        unit,
        isPublished: formData.get("isPublished") === "true",
    };
}

// ─── Create ───────────────────────────────────────────────────────────────────
export async function createProductAction(
    _prev: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        const fields = validateProductFields(formData);
        const imageUrl = await handleImageUpload(formData);

        const result = await createProduct({ ...fields, imageUrl });
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal membuat produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("[createProductAction]", e);
        const message = e instanceof Error ? e.message : "Gagal membuat produk.";
        return { success: false, error: message };
    }
}

// ─── Update ───────────────────────────────────────────────────────────────────
export async function updateProductAction(
    id: string,
    _prev: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        if (!id) return { success: false, error: "ID produk tidak ditemukan." };

        const fields = validateProductFields(formData);
        const newFile = formData.get("imageFile") as File | null;
        let imageUrl: string | null;

        if (newFile && newFile.size > 0) {
            imageUrl = await handleImageUpload(formData);
        } else {
            const urlInput = (formData.get("imageUrl") as string)?.trim();
            imageUrl = urlInput || null;
        }

        const result = await updateProduct(id, { ...fields, imageUrl });
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal mengupdate produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}/edit`);
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("[updateProductAction]", e);
        const message = e instanceof Error ? e.message : "Gagal mengupdate produk.";
        return { success: false, error: message };
    }
}

// ─── Delete ───────────────────────────────────────────────────────────────────
export async function deleteProductAction(id: string): Promise<ActionResult> {
    try {
        if (!id) return { success: false, error: "ID produk tidak ditemukan." };

        const result = await deleteProduct(id);
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal menghapus produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("[deleteProductAction]", e);
        const message = e instanceof Error ? e.message : "Gagal menghapus produk.";
        return { success: false, error: message };
    }
}

// ─── Toggle publish ───────────────────────────────────────────────────────────
export async function togglePublishAction(
    id: string,
    isPublished: boolean
): Promise<ActionResult> {
    try {
        if (!id) return { success: false, error: "ID produk tidak ditemukan." };

        const result = await updateProduct(id, { isPublished });
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal mengubah status produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("[togglePublishAction]", e);
        const message = e instanceof Error ? e.message : "Gagal mengubah status produk.";
        return { success: false, error: message };
    }
}
