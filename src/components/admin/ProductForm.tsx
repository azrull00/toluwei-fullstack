"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { createProductAction, updateProductAction } from "@/actions/product.actions";
import type { Product, ActionResult } from "@/types";

interface ProductFormProps {
    product?: Product;
}

const UNITS = ["kg", "ekor", "bungkus", "porsi", "250g", "500g","100gr"];

export function ProductForm({ product }: ProductFormProps) {
    const isEdit = !!product;
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null);
    const fileRef = useRef<HTMLInputElement>(null);

    const action = isEdit
        ? updateProductAction.bind(null, product.id)
        : createProductAction;

    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        action,
        null
    );

    // Navigate to product list after successful create/update
    useEffect(() => {
        if (state?.success) {
            router.push("/admin/products");
        }
    }, [state?.success, router]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Client-side validation
            if (file.size > 5 * 1024 * 1024) {
                alert("Ukuran file maks 5MB.");
                return;
            }
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearFile = () => {
        setPreview(product?.imageUrl ?? null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-stone-600 text-sm focus:outline-none focus:border-[#B03A2E] focus:ring-1 focus:ring-[#B03A2E] transition-colors";
    const labelCls = "block text-stone-400 text-xs font-medium mb-1.5 uppercase tracking-wide";

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            {/* Error message */}
            {state?.error && (
                <div className="flex items-center gap-2.5 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{state.error}</p>
                </div>
            )}

            {/* Success message (brief flash before redirect) */}
            {state?.success && (
                <div className="flex items-center gap-2.5 bg-green-950/40 border border-green-800/40 rounded-xl px-4 py-3 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <p className="text-green-400 text-sm">Berhasil! Mengalihkan...</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="sm:col-span-2">
                    <label className={labelCls}>Nama Produk *</label>
                    <input
                        name="name" required
                        defaultValue={product?.name}
                        placeholder="cth: Has Dalam Segar"
                        className={inputCls}
                    />
                </div>

                {/* Type */}
                <div>
                    <label className={labelCls}>Kategori *</label>
                    <select name="type" defaultValue={product?.type ?? "SEGAR"} className={inputCls}>
                        <option value="SEGAR">🥩 Daging Segar</option>
                        <option value="OLAHAN">🍖 Produk Olahan</option>
                    </select>
                </div>

                {/* Unit */}
                <div>
                    <label className={labelCls}>Satuan *</label>
                    <input
                        name="unit" required
                        list="unit-list"
                        defaultValue={product?.unit ?? "kg"}
                        placeholder="kg / ekor / bungkus"
                        className={inputCls}
                    />
                    <datalist id="unit-list">
                        {UNITS.map(u => <option key={u} value={u} />)}
                    </datalist>
                </div>

                {/* Price */}
                <div>
                    <label className={labelCls}>Harga (Rp) *</label>
                    <input
                        name="price" type="number" required min={0}
                        defaultValue={product?.price}
                        placeholder="cth: 85000"
                        className={inputCls}
                    />
                </div>

                {/* Published */}
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

                {/* Description */}
                <div className="sm:col-span-2">
                    <label className={labelCls}>Deskripsi</label>
                    <textarea
                        name="description" rows={3}
                        defaultValue={product?.description ?? ""}
                        placeholder="Deskripsi singkat produk..."
                        className={`${inputCls} resize-none`}
                    />
                </div>

                {/* Image section */}
                <div className="sm:col-span-2 space-y-3">
                    <label className={labelCls}>Gambar Produk</label>

                    {/* Preview */}
                    {preview && (
                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/10">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                                unoptimized
                                sizes="160px"
                            />
                            <button
                                type="button"
                                onClick={clearFile}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                        </div>
                    )}

                    {/* File upload */}
                    <div
                        className="border-2 border-dashed border-white/10 hover:border-[#B03A2E]/40 rounded-xl p-6 text-center cursor-pointer transition-colors"
                        onClick={() => fileRef.current?.click()}
                    >
                        <Upload className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                        <p className="text-stone-500 text-sm">Klik untuk upload gambar</p>
                        <p className="text-stone-700 text-xs mt-1">JPG, PNG, WEBP — maks 5MB</p>
                        <input
                            ref={fileRef}
                            type="file"
                            name="imageFile"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFile}
                        />
                    </div>

                    {/* URL fallback */}
                    <div>
                        <p className="text-stone-600 text-xs mb-1.5">atau masukkan URL gambar:</p>
                        <input
                            name="imageUrl"
                            defaultValue={product?.imageUrl ?? ""}
                            placeholder="https://example.com/gambar.jpg"
                            className={inputCls}
                            onChange={e => !fileRef.current?.value && setPreview(e.target.value || null)}
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 bg-[#B03A2E] hover:bg-[#922B21] disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    {isPending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
                <a href="/admin/products" className="text-stone-500 hover:text-white text-sm transition-colors">
                    Batal
                </a>
            </div>
        </form>
    );
}
