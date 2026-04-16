// Force dynamic — jangan di-prerender/ISR karena data produk berubah
// dan gambar Base64 bisa sangat besar (melebihi limit 19MB Vercel ISR)
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Pencil, ShoppingBag } from "lucide-react";
import { getAllProducts } from "@/services/product.service";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatCurrency, PRODUCT_TYPES } from "@/lib/constants";
import type { Product } from "@/types";

export const metadata = { title: "Kelola Produk — Toluwei Admin" };

/**
 * Untuk list view, kita TIDAK kirim Base64 penuh ke HTML (bisa puluhan MB).
 * Cukup tandai apakah produk punya gambar — thumbnail ditampilkan via
 * komponen client yang lazy-load dari endpoint terpisah jika diperlukan.
 * Untuk URL eksternal (http/https), tetap dikirim apa adanya.
 */
function sanitizeForList(products: Product[]) {
    return products.map((p) => ({
        ...p,
        // Ganti Base64 dengan flag khusus — jangan embed di HTML
        imageUrl: p.imageUrl?.startsWith("data:") ? "__base64__" : (p.imageUrl ?? null),
    }));
}

export default async function AdminProductsPage() {
    const raw = await getAllProducts();
    const products = sanitizeForList(raw);

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Kelola Produk</h1>
                    <p className="text-stone-500 text-sm mt-1">{products.length} produk terdaftar</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-[#B03A2E] hover:bg-[#922B21] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Produk Baru</span>
                    <span className="sm:hidden">Baru</span>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="bg-white/3 border border-white/8 rounded-2xl text-center py-20">
                    <ShoppingBag className="w-10 h-10 text-stone-700 mx-auto mb-3" strokeWidth={1} />
                    <p className="text-stone-500 text-sm">Belum ada produk.</p>
                    <Link href="/admin/products/new" className="text-[#B03A2E] text-sm hover:underline mt-1 inline-block">
                        Tambah produk pertama →
                    </Link>
                </div>
            ) : (
                <>
                    {/* ── Desktop Table (md+) ─────────────────────────────── */}
                    <div className="hidden md:block bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/8">
                                        <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide w-16">Foto</th>
                                        <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Produk</th>
                                        <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Harga</th>
                                        <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Kategori</th>
                                        <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Status</th>
                                        <th className="text-right px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                                            {/* Thumbnail — desktop */}
                                            <td className="px-5 py-3.5">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                                                    {p.imageUrl && p.imageUrl !== "__base64__" ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={p.imageUrl} alt={p.name} className="object-cover w-full h-full" />
                                                    ) : p.imageUrl === "__base64__" ? (
                                                        <span className="text-[9px] text-stone-500 font-medium text-center leading-tight px-1">Ada<br/>Foto</span>
                                                    ) : (
                                                        <ShoppingBag className="w-5 h-5 text-stone-700" strokeWidth={1} />
                                                    )}
                                                </div>
                                            </td>
                                            {/* Name */}
                                            <td className="px-5 py-3.5">
                                                <div className="text-white font-medium">{p.name}</div>
                                                {p.description && (
                                                    <div className="text-stone-600 text-xs mt-0.5 line-clamp-1">{p.description}</div>
                                                )}
                                            </td>
                                            {/* Price */}
                                            <td className="px-5 py-3.5">
                                                <span className="text-stone-300">{formatCurrency(p.price)}</span>
                                                <span className="text-stone-600 text-xs ml-1">/{p.unit}</span>
                                            </td>
                                            {/* Type */}
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.type === "SEGAR"
                                                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/30"
                                                    : "bg-amber-950/40 text-amber-400 border border-amber-800/30"
                                                    }`}>
                                                    {PRODUCT_TYPES[p.type as keyof typeof PRODUCT_TYPES]}
                                                </span>
                                            </td>
                                            {/* Status */}
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.isPublished
                                                    ? "bg-green-950/40 text-green-400 border border-green-800/30"
                                                    : "bg-white/5 text-stone-500 border border-white/10"
                                                    }`}>
                                                    {p.isPublished ? "Aktif" : "Draft"}
                                                </span>
                                            </td>
                                            {/* Actions */}
                                            <td className="px-5 py-3.5 bg-transparent">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/admin/products/${p.id}/edit`}
                                                        className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        Edit
                                                    </Link>
                                                    <DeleteButton productId={p.id} productName={p.name} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── Mobile Card List (< md) ─────────────────────────── */}
                    <div className="md:hidden space-y-3">
                        {products.map(p => (
                            <div key={p.id} className="bg-white/3 border border-white/8 rounded-2xl p-4">
                                <div className="flex items-start gap-3">
                                    {/* Thumbnail — mobile card */}
                                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                                        {p.imageUrl && p.imageUrl !== "__base64__" ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={p.imageUrl} alt={p.name} className="object-cover w-full h-full" />
                                        ) : p.imageUrl === "__base64__" ? (
                                            <span className="text-[9px] text-stone-500 font-medium text-center leading-tight px-1">Ada<br/>Foto</span>
                                        ) : (
                                            <ShoppingBag className="w-6 h-6 text-stone-700" strokeWidth={1} />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-white font-semibold text-sm leading-snug truncate">{p.name}</h3>
                                            <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${p.isPublished
                                                ? "bg-green-950/40 text-green-400 border border-green-800/30"
                                                : "bg-white/5 text-stone-500 border border-white/10"
                                                }`}>
                                                {p.isPublished ? "Aktif" : "Draft"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                            <span className="text-[#B03A2E] font-bold text-sm">
                                                {formatCurrency(p.price)}
                                                <span className="text-stone-600 font-normal text-xs ml-0.5">/{p.unit}</span>
                                            </span>
                                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${p.type === "SEGAR"
                                                ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/30"
                                                : "bg-amber-950/40 text-amber-400 border border-amber-800/30"
                                                }`}>
                                                {PRODUCT_TYPES[p.type as keyof typeof PRODUCT_TYPES]}
                                            </span>
                                        </div>

                                        {p.description && (
                                            <p className="text-stone-600 text-xs mt-1 line-clamp-1">{p.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions row */}
                                <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-white/5">
                                    <Link
                                        href={`/admin/products/${p.id}/edit`}
                                        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/8"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        Edit
                                    </Link>
                                    <DeleteButton productId={p.id} productName={p.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
