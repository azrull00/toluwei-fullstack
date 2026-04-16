"use server";

import { revalidatePath } from "next/cache";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} from "@/services/product.service";
import { uploadImageToBlob, deleteImageFromBlob, isBlobConfigured } from "@/lib/blob";
import type { ActionResult } from "@/types";

// ─── Konstanta ────────────────────────────────────────────────────────────────
// Batas backend: 4.5MB total body Vercel → Base64 max ~4.4MB
const MAX_BASE64_BYTES = 4.5 * 1024 * 1024;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Proses gambar dari formData:
 * 1. Jika ada Base64 (upload file) → upload ke Vercel Blob → return URL CDN
 * 2. Jika Blob belum dikonfigurasi → simpan Base64 langsung (fallback dev)
 * 3. Jika ada imageUrl (URL teks) → return URL tersebut
 * 4. Tidak ada gambar → return null
 */
async function processImage(
    formData: FormData,
    productName: string
): Promise<string | null> {
    const base64 = (formData.get("imageBase64") as string)?.trim();

    if (base64 && base64.startsWith("data:image/")) {
        // Validasi ukuran
        const base64Data = base64.split(",")[1] ?? "";
        const estimatedBytes = (base64Data.length * 3) / 4;
        if (estimatedBytes > MAX_BASE64_BYTES) {
            throw new Error(
                `Ukuran gambar terlalu besar (${(estimatedBytes / 1024 / 1024).toFixed(1)}MB). Maksimal 4.5MB.`
            );
        }

        // Upload ke Vercel Blob jika sudah dikonfigurasi
        if (isBlobConfigured()) {
            return await uploadImageToBlob(base64, productName);
        }

        // Fallback: simpan Base64 langsung (hanya untuk development lokal)
        console.warn(
            "[processImage] BLOB_READ_WRITE_TOKEN belum dikonfigurasi. " +
            "Gambar disimpan sebagai Base64 — tidak cocok untuk production dengan banyak produk."
        );
        return base64;
    }

    // Fallback ke URL teks
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
        const imageUrl = await processImage(formData, fields.name);

        const result = await createProduct({ ...fields, imageUrl });
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal membuat produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath("/admin");
        revalidatePath("/");
        revalidatePath("/katalog");
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
        const newImageUrl = await processImage(formData, fields.name);

        // Jika ada gambar baru dari Blob, hapus gambar lama dari Blob
        if (newImageUrl && isBlobConfigured()) {
            const existing = await getProductById(id);
            if (existing?.imageUrl && existing.imageUrl !== newImageUrl) {
                await deleteImageFromBlob(existing.imageUrl);
            }
        }

        const result = await updateProduct(id, { ...fields, imageUrl: newImageUrl });
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal mengupdate produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}/edit`);
        revalidatePath("/admin");
        revalidatePath("/");
        revalidatePath("/katalog");
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

        // Hapus gambar dari Blob sebelum hapus record DB
        if (isBlobConfigured()) {
            const existing = await getProductById(id);
            if (existing?.imageUrl) {
                await deleteImageFromBlob(existing.imageUrl);
            }
        }

        const result = await deleteProduct(id);
        if (!result.success) {
            return { success: false, error: result.error ?? "Gagal menghapus produk." };
        }

        revalidatePath("/admin/products");
        revalidatePath("/admin");
        revalidatePath("/");
        revalidatePath("/katalog");
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
        revalidatePath("/katalog");
        return { success: true };
    } catch (e) {
        console.error("[togglePublishAction]", e);
        const message = e instanceof Error ? e.message : "Gagal mengubah status produk.";
        return { success: false, error: message };
    }
}
