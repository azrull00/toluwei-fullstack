"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, AlertCircle, CheckCircle2, ImageIcon } from "lucide-react";
import { createProductAction, updateProductAction } from "@/actions/product.actions";
import { toast } from "@/components/ui/Toast";
import type { Product, ActionResult } from "@/types";

interface ProductFormProps {
    product?: Product;
}

const UNITS = ["kg", "ekor", "bungkus", "porsi", "250g", "500g", "100gr"];

// Batas aman Vercel: body limit 4.5MB → file max ~3.3MB (Base64 +33% overhead)
// 3.3MB × 1.33 ≈ 4.4MB Base64 — masih di bawah batas 4.5MB Vercel
const MAX_FILE_BYTES = 3.3 * 1024 * 1024; // ~3.3 MB file
const MAX_FILE_LABEL = "3.3MB";

/** Konversi File ke Base64 data URI (misal: "data:image/jpeg;base64,/9j/4AAQ...") */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Gagal membaca file."));
        reader.readAsDataURL(file);
    });
}

export function ProductForm({ product }: ProductFormProps) {
    const isEdit = !!product;
    const router = useRouter();

    // Preview URL — bisa berupa data URI (upload baru) atau URL eksternal (existing)
    const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null);
    // Base64 string yang akan dikirim ke server action
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);

    const fileRef = useRef<HTMLInputElement>(null);

    const action = isEdit
        ? updateProductAction.bind(null, product.id)
        : createProductAction;

    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        action,
        null
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(
                isEdit ? "Produk diperbarui" : "Produk ditambahkan",
                isEdit
                    ? `"${product?.name}" berhasil disimpan.`
                    : "Produk baru berhasil ditambahkan."
            );
            router.push("/admin/products");
        }
        if (state?.error) {
            toast.error("Gagal menyimpan", state.error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError(null);

        // Validasi ukuran
        if (file.size > MAX_FILE_BYTES) {
            setUploadError(
                `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal ${MAX_FILE_LABEL}.`
            );
            if (fileRef.current) fileRef.current.value = "";
            return;
        }

        // Validasi tipe
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setUploadError("Format tidak didukung. Gunakan JPG, PNG, atau WEBP.");
            if (fileRef.current) fileRef.current.value = "";
            return;
        }

        setIsConverting(true);
        try {
            const dataUri = await fileToBase64(file);
            setBase64Image(dataUri);
            setPreview(dataUri);
        } catch {
            setUploadError("Gagal memproses gambar. Coba lagi.");
        } finally {
            setIsConverting(false);
        }
    };

    const clearImage = () => {
        setPreview(product?.imageUrl ?? null);
        setBase64Image(null);
        setUploadError(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const inputCls =
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-stone-600 text-sm focus:outline-none focus:border-[#B03A2E] focus:ring-1 focus:ring-[#B03A2E] transition-colors";
    const labelCls =
        "block text-stone-400 text-xs font-medium mb-1.5 uppercase tracking-wide";

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            {/* ── Hidden input: kirim base64 ke server action ── */}
            {base64Image && (
                <input type="hidden" name="imageBase64" value={base64Image} />
            )}

            {/* Error dari server action */}
            {state?.error && (
                <div className="flex items-center gap-2.5 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{state.error}</p>
                </div>
            )}

            {state?.success && (
                <div className="flex items-center gap-2.5 bg-green-950/40 border border-green-800/40 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <p className="text-green-400 text-sm">Berhasil! Mengalihkan...</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nama */}
                <div className="sm:col-span-2">
                    <label className={labelCls}>Nama Produk *</label>
                    <input
                        name="name"
                        required
                        defaultValue={product?.name}
                        placeholder="cth: Has Dalam Segar"
                        className={inputCls}
                    />
                </div>

                {/* Kategori */}
                <div>
                    <label className={labelCls}>Kategori *</label>
                    <select name="type" defaultValue={product?.type ?? "SEGAR"} className={inputCls}>
                        <option value="SEGAR">🥩 Daging Segar</option>
                        <option value="OLAHAN">🍖 Produk Olahan</option>
                    </select>
                </div>

                {/* Satuan */}
                <div>
                    <label className={labelCls}>Satuan *</label>
                    <input
                        name="unit"
                        required
                        list="unit-list"
                        defaultValue={product?.unit ?? "kg"}
                        placeholder="kg / ekor / bungkus"
                        className={inputCls}
                    />
                    <datalist id="unit-list">
                        {UNITS.map((u) => (
                            <option key={u} value={u} />
                        ))}
                    </datalist>
                </div>

                {/* Harga */}
                <div>
                    <label className={labelCls}>Harga (Rp) *</label>
                    <input
                        name="price"
                        type="number"
                        required
                        min={0}
                        defaultValue={product?.price}
                        placeholder="cth: 85000"
                        className={inputCls}
                    />
                </div>

                {/* Toggle Publish */}
                <div className="flex items-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isPublished"
                                value="true"
                                defaultChecked={product?.isPublished ?? true}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-white/10 border border-white/15 rounded-full peer-checked:bg-[#B03A2E] transition-colors" />
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                        </div>
                        <span className="text-stone-300 text-sm">Tampilkan di Website</span>
                    </label>
                </div>

                {/* Deskripsi */}
                <div className="sm:col-span-2">
                    <label className={labelCls}>Deskripsi</label>
                    <textarea
                        name="description"
                        rows={3}
                        defaultValue={product?.description ?? ""}
                        placeholder="Deskripsi singkat produk..."
                        className={`${inputCls} resize-none`}
                    />
                </div>

                {/* ── Gambar Produk ── */}
                <div className="sm:col-span-2 space-y-3">
                    <label className={labelCls}>Gambar Produk</label>

                    {/* Preview */}
                    {preview ? (
                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={preview}
                                alt="Preview gambar produk"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={clearImage}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Hapus gambar"
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                            {/* Badge: gambar baru vs existing */}
                            {base64Image && (
                                <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-green-600/90 text-white px-2 py-0.5 rounded-full font-medium">
                                    Baru
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="w-40 h-40 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2">
                            <ImageIcon className="w-8 h-8 text-stone-700" strokeWidth={1} />
                            <span className="text-stone-700 text-xs">Belum ada gambar</span>
                        </div>
                    )}

                    {/* Error upload */}
                    {uploadError && (
                        <div className="flex items-center gap-2 bg-red-950/30 border border-red-800/30 rounded-xl px-3 py-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <p className="text-red-400 text-xs">{uploadError}</p>
                        </div>
                    )}

                    {/* Drop zone */}
                    <div
                        role="button"
                        tabIndex={0}
                        className="border-2 border-dashed border-white/10 hover:border-[#B03A2E]/50 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-white/3"
                        onClick={() => fileRef.current?.click()}
                        onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
                    >
                        {isConverting ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-6 h-6 text-[#B03A2E] animate-spin" />
                                <p className="text-stone-400 text-sm">Memproses gambar...</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                                <p className="text-stone-400 text-sm font-medium">
                                    Klik untuk pilih gambar
                                </p>
                                <p className="text-stone-600 text-xs mt-1">
                                    JPG, PNG, WEBP — maks {MAX_FILE_LABEL}
                                </p>
                            </>
                        )}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFile}
                        />
                    </div>

                    {/* Info ukuran jika ada gambar baru */}
                    {base64Image && (
                        <p className="text-stone-600 text-xs flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            Gambar siap disimpan ke database
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isPending || isConverting}
                    className="flex items-center gap-2 bg-[#B03A2E] hover:bg-[#922B21] disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4" />
                    )}
                    {isPending
                        ? "Menyimpan..."
                        : isEdit
                        ? "Simpan Perubahan"
                        : "Tambah Produk"}
                </button>
                <a
                    href="/admin/products"
                    className="text-stone-500 hover:text-white text-sm transition-colors"
                >
                    Batal
                </a>
            </div>
        </form>
    );
}
