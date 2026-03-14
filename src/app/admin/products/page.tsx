import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ShoppingBag } from "lucide-react";
import { getAllProducts } from "@/services/product.service";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatCurrency, PRODUCT_TYPES } from "@/lib/constants";

export const metadata = { title: "Kelola Produk — Toluwei Admin" };

export default async function AdminProductsPage() {
    const products = await getAllProducts();

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
                    Produk Baru
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag className="w-10 h-10 text-stone-700 mx-auto mb-3" strokeWidth={1} />
                        <p className="text-stone-500 text-sm">Belum ada produk.</p>
                        <Link href="/admin/products/new" className="text-[#B03A2E] text-sm hover:underline mt-1 inline-block">
                            Tambah produk pertama →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/8">
                                    <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide w-16">Foto</th>
                                    <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Produk</th>
                                    <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide hidden md:table-cell">Harga</th>
                                    <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide hidden sm:table-cell">Kategori</th>
                                    <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Status</th>
                                    <th className="text-right px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                                        {/* Thumbnail */}
                                        <td className="px-5 py-3.5">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center">
                                                {p.imageUrl ? (
                                                    <Image src={p.imageUrl} alt={p.name} width={48} height={48} className="object-cover w-full h-full" unoptimized />
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
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <span className="text-stone-300">{formatCurrency(p.price)}</span>
                                            <span className="text-stone-600 text-xs ml-1">/{p.unit}</span>
                                        </td>
                                        {/* Type */}
                                        <td className="px-5 py-3.5 hidden sm:table-cell">
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
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/products/${p.id}/edit`}
                                                    className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    <span className="hidden sm:inline">Edit</span>
                                                </Link>
                                                <DeleteButton productId={p.id} productName={p.name} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
