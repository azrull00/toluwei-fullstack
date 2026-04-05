export const dynamic = "force-dynamic";

import { Package, Eye, EyeOff, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/services/product.service";
import { getSiteSettings } from "@/services/site-setting.service";
import { formatCurrency } from "@/lib/constants";

export const metadata = { title: "Dashboard — Toluwei Admin" };

export default async function AdminDashboardPage() {
    const [products, settings] = await Promise.all([
        getAllProducts(),
        getSiteSettings(),
    ]);

    const published = products.filter(p => p.isPublished).length;
    const draft = products.length - published;
    const segar = products.filter(p => p.type === "SEGAR").length;
    const olahan = products.filter(p => p.type === "OLAHAN").length;

    const stats = [
        { label: "Total Produk", value: products.length, icon: Package, color: "text-blue-400", bg: "bg-blue-950/30", border: "border-blue-800/30" },
        { label: "Produk Aktif", value: published, icon: Eye, color: "text-green-400", bg: "bg-green-950/30", border: "border-green-800/30" },
        { label: "Draft / Nonaktif", value: draft, icon: EyeOff, color: "text-stone-400", bg: "bg-white/5", border: "border-white/8" },
        { label: "Produk Olahan", value: olahan, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-800/30" },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-stone-500 text-sm mt-1">Selamat datang di panel admin Toluwei</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
                    <div key={label} className={`${bg} border ${border} rounded-2xl p-5`}>
                        <div className={`${color} mb-3`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-3xl font-bold text-white">{value}</div>
                        <div className="text-stone-500 text-xs mt-1">{label}</div>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-4 bg-[#B03A2E]/10 border border-[#B03A2E]/20 hover:bg-[#B03A2E]/15 rounded-2xl p-5 transition-colors"
                >
                    <div className="w-10 h-10 bg-[#B03A2E]/20 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#B03A2E]" />
                    </div>
                    <div>
                        <div className="text-white font-semibold text-sm">Tambah Produk Baru</div>
                        <div className="text-stone-500 text-xs mt-0.5">Saat ini {products.length} produk terdaftar</div>
                    </div>
                </Link>
                <Link
                    href="/admin/content"
                    className="flex items-center gap-4 bg-amber-950/20 border border-amber-800/20 hover:bg-amber-950/30 rounded-2xl p-5 transition-colors"
                >
                    <div className="w-10 h-10 bg-amber-950/30 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <div className="text-white font-semibold text-sm">Edit Konten Website</div>
                        <div className="text-stone-500 text-xs mt-0.5">
                            {settings ? "Konten sudah dikonfigurasi" : "Belum ada konten — klik untuk setup"}
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent products */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-semibold">Produk Terbaru</h2>
                    <Link href="/admin/products" className="text-[#B03A2E] text-sm hover:underline">
                        Lihat Semua →
                    </Link>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/8">
                                <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Produk</th>
                                <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide hidden sm:table-cell">Harga</th>
                                <th className="text-left px-5 py-3 text-stone-500 font-medium text-xs uppercase tracking-wide">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 5).map(p => (
                                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="text-white font-medium">{p.name}</div>
                                        <div className="text-stone-600 text-xs">{p.type === "SEGAR" ? "Daging Segar" : "Produk Olahan"}</div>
                                    </td>
                                    <td className="px-5 py-3.5 hidden sm:table-cell">
                                        <span className="text-stone-300 text-sm">{formatCurrency(p.price)}</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.isPublished ? "bg-green-950/50 text-green-400 border border-green-800/30" : "bg-white/5 text-stone-500 border border-white/10"
                                            }`}>
                                            {p.isPublished ? "Aktif" : "Draft"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
