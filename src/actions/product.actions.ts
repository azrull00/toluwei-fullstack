"use server";

import { revalidatePath } from "next/cache";
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/services/product.service";
import type { ActionResult } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Prioritas: imageBase64 (upload dari file) > imageUrl (URL teks manual)
// Base64 data URI disimpan langsung ke kolom imageUrl (TEXT) di Neon Postgres.
function resolveImageUrl(formData: FormData): string | null {
    // 1. Cek apakah ada file yang diupload (dikirim sebagai Base64 data URI)
    const base64 = (formData.get("imageBase64") as string)?.trim();
    if (base64 && base64.startsWith("data:image/")) {
        return base64;
    }
    // 2. Fallback ke URL teks jika tidak ada file upload
    const url = (formData.get("imageUrl") as string)?.trim();
    return url || null;
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
        const imageUrl = resolveImageUrl(formData);

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
        const imageUrl = resolveImageUrl(formData);

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
