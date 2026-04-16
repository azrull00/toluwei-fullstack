// ─── Vercel Blob — Image Upload Helper ───────────────────────────────────────
// Vercel Blob menyimpan file sebagai URL publik (CDN).
// Gratis 1 GB storage + bandwidth.
//
// Setup (sekali saja di Vercel dashboard):
//   1. Buka project di vercel.com → Storage → Create Database → Blob
//   2. Nama bebas, misal "toluwei-images"
//   3. Connect ke project → Vercel otomatis tambah BLOB_READ_WRITE_TOKEN ke env
//   4. Untuk local dev: jalankan `npx vercel env pull .env.local`
//      atau copy BLOB_READ_WRITE_TOKEN dari Vercel dashboard ke .env.local

import { put, del } from "@vercel/blob";

/**
 * Upload gambar ke Vercel Blob dari Base64 data URI.
 * Dipanggil dari Server Action — token tidak pernah expose ke client.
 *
 * @returns URL publik CDN gambar (https://...)
 */
export async function uploadImageToBlob(
    base64DataUri: string,
    filename: string
): Promise<string> {
    // Parse data URI: "data:image/jpeg;base64,/9j/4AAQ..."
    const [header, base64Data] = base64DataUri.split(",");
    if (!header || !base64Data) {
        throw new Error("Format gambar tidak valid.");
    }

    const mimeMatch = header.match(/data:([^;]+);base64/);
    const mimeType = mimeMatch?.[1] ?? "image/jpeg";

    // Konversi Base64 → Buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Sanitize filename
    const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
    const safeName = `toluwei/products/${Date.now()}-${filename
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase()
        .slice(0, 40)}.${ext}`;

    const blob = await put(safeName, buffer, {
        access: "public",
        contentType: mimeType,
        // addRandomSuffix: false — kita sudah pakai timestamp
    });

    return blob.url;
}

/**
 * Hapus gambar dari Vercel Blob berdasarkan URL.
 * Dipanggil saat produk dihapus atau gambar diganti.
 * Tidak throw jika gagal — best effort.
 */
export async function deleteImageFromBlob(url: string): Promise<void> {
    try {
        // Hanya hapus jika URL dari Vercel Blob
        if (url.includes("vercel-storage.com") || url.includes("blob.vercel-storage.com")) {
            await del(url);
        }
    } catch (e) {
        // Non-fatal — log saja
        console.warn("[deleteImageFromBlob] Gagal hapus:", e);
    }
}

/** Cek apakah Vercel Blob sudah dikonfigurasi */
export function isBlobConfigured(): boolean {
    return !!process.env.BLOB_READ_WRITE_TOKEN;
}
