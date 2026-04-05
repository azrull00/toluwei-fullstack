"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    ShoppingBag,
    ArrowLeft,
    Flame,
    SlidersHorizontal,
    X,
    Tag,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, getWhatsAppUrl, PRODUCT_TYPES, BRAND } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Product, ProductType } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterType = "ALL" | ProductType;
type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

interface KatalogClientProps {
    products: Product[];
}

// ─── ProductCard (optimized for catalog page) ─────────────────────────────────
function CatalogProductCard({ product, index }: { product: Product; index: number }) {
    const msg = `Halo Toluwei, saya ingin menanyakan stok *${product.name}* (${formatCurrency(product.price)}/${product.unit}). Apakah masih tersedia?`;
    const delay = ([0, 100, 200, 300, 400, 500] as const)[index % 6];

    return (
        <AnimateOnScroll animation="scale-in" delay={delay}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-52 sm:h-56 bg-gradient-to-br from-stone-50 to-red-50/30 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-stone-200">
                            <ShoppingBag className="w-16 h-16" strokeWidth={1} />
                            <span className="text-xs text-stone-300 font-medium">Gambar Segera Hadir</span>
                        </div>
                    )}

                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Type badge */}
                    <span
                        className={cn(
                            "absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg uppercase tracking-wide backdrop-blur-sm",
                            product.type === "SEGAR"
                                ? "bg-emerald-50/90 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50/90 text-amber-700 border border-amber-200"
                        )}
                    >
                        {PRODUCT_TYPES[product.type as ProductType]}
                    </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-[#1A1614] text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#B03A2E] transition-colors duration-200">
                        {product.name}
                    </h3>

                    {product.description && (
                        <p className="text-stone-400 text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1">
                            {product.description}
                        </p>
                    )}

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-stone-100">
                        <div>
                            <p className="text-[#B03A2E] font-bold text-[18px] leading-tight">
                                {formatCurrency(product.price)}
                            </p>
                            <span className="text-stone-400 text-[11px]">/ {product.unit}</span>
                        </div>
                        <a
                            href={getWhatsAppUrl(msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold bg-[#B03A2E] hover:bg-[#922B21] text-white px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 hover:-translate-y-0.5 flex items-center gap-1.5"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Pesan
                        </a>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
    );
}

// ─── Main Catalog Client ───────────────────────────────────────────────────────
export function KatalogClient({ products }: KatalogClientProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("ALL");
    const [sort, setSort] = useState<SortKey>("default");
    const [showSort, setShowSort] = useState(false);

    const filtered = useMemo(() => {
        let result = [...products];

        // Filter by type
        if (filter !== "ALL") {
            result = result.filter((p) => p.type === filter);
        }

        // Filter by search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.description?.toLowerCase().includes(q) ?? false)
            );
        }

        // Sort
        if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
        else if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name, "id"));

        return result;
    }, [products, filter, search, sort]);

    const totalSegar = products.filter((p) => p.type === "SEGAR").length;
    const totalOlahan = products.filter((p) => p.type === "OLAHAN").length;

    const sortLabels: Record<SortKey, string> = {
        default: "Terbaru",
        "price-asc": "Harga: Terendah",
        "price-desc": "Harga: Tertinggi",
        "name-asc": "Nama A–Z",
    };

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            {/* ── Hero Banner ─────────────────────────────────────────── */}
            <div className="relative bg-[#1A1614] overflow-hidden pt-20">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#B03A2E]/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4AC0D]/8 blur-[80px] pointer-events-none" />
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Beranda
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            {/* Label */}
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-[#B03A2E] rounded-lg flex items-center justify-center">
                                    <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                                    {BRAND.name}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                                Katalog <span className="text-[#B03A2E]">Produk</span>
                            </h1>
                            <p className="text-white/50 text-base sm:text-lg max-w-lg leading-relaxed">
                                Temukan daging babi segar pilihan dan berbagai produk olahan berkualitas langsung dari {BRAND.location}.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{products.length}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Total Produk</div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400">{totalSegar}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Daging Segar</div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">{totalOlahan}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Produk Olahan</div>
                            </div>
                        </div>
                    </div>

                    {/* Search bar — in the banner */}
                    <div className="mt-10 relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari produk (contoh: daging, sosis, dendeng...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/8 border border-white/15 text-white placeholder:text-white/30 rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#B03A2E]/60 focus:bg-white/12 transition-all duration-200 backdrop-blur-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                aria-label="Hapus pencarian"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Filter & Sort Bar ────────────────────────────────────── */}
            <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-lg border-b border-stone-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Filter tabs */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
                        {(
                            [
                                { key: "ALL" as FilterType, label: "Semua", count: products.length },
                                { key: "SEGAR" as FilterType, label: PRODUCT_TYPES.SEGAR, count: totalSegar },
                                { key: "OLAHAN" as FilterType, label: PRODUCT_TYPES.OLAHAN, count: totalOlahan },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200",
                                    filter === tab.key
                                        ? "bg-[#1A1614] text-white border-[#1A1614]"
                                        : "bg-transparent text-stone-500 border-stone-200 hover:border-[#1A1614] hover:text-[#1A1614]"
                                )}
                            >
                                <Tag className="w-3 h-3" />
                                {tab.label}
                                <span
                                    className={cn(
                                        "text-[11px] px-1.5 py-0.5 rounded-full",
                                        filter === tab.key
                                            ? "bg-white/15 text-white/80"
                                            : "bg-stone-100 text-stone-400"
                                    )}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 transition-colors"
                        >
                            <span>Urutkan: {sortLabels[sort]}</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showSort && "rotate-180")} />
                        </button>

                        {showSort && (
                            <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-stone-100 shadow-xl py-2 w-48 z-50">
                                {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => { setSort(key); setShowSort(false); }}
                                        className={cn(
                                            "w-full text-left px-4 py-2.5 text-sm transition-colors",
                                            sort === key
                                                ? "text-[#B03A2E] font-medium bg-red-50"
                                                : "text-stone-600 hover:bg-stone-50"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Product Grid ─────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

                {/* Result info */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-stone-500 text-sm">
                        {search ? (
                            <>
                                Menampilkan <span className="font-semibold text-[#1A1614]">{filtered.length}</span> hasil untuk{" "}
                                <span className="font-semibold text-[#B03A2E]">&quot;{search}&quot;</span>
                            </>
                        ) : (
                            <>
                                Menampilkan <span className="font-semibold text-[#1A1614]">{filtered.length}</span> dari{" "}
                                <span className="font-semibold text-[#1A1614]">{products.length}</span> produk
                            </>
                        )}
                    </p>

                    {(search || filter !== "ALL") && (
                        <button
                            onClick={() => { setSearch(""); setFilter("ALL"); }}
                            className="text-xs text-[#B03A2E] hover:text-[#922B21] font-medium flex items-center gap-1"
                        >
                            <X className="w-3 h-3" />
                            Reset filter
                        </button>
                    )}
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                        {filtered.map((p, i) => (
                            <CatalogProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-5">
                            <ShoppingBag className="w-10 h-10 text-stone-300" strokeWidth={1} />
                        </div>
                        <h3 className="text-lg font-semibold text-stone-700 mb-2">Produk Tidak Ditemukan</h3>
                        <p className="text-stone-400 text-sm max-w-xs">
                            Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setFilter("ALL"); }}
                            className="mt-6 px-5 py-2.5 bg-[#B03A2E] hover:bg-[#922B21] text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                            Tampilkan Semua Produk
                        </button>
                    </div>
                )}

                {/* WhatsApp CTA Banner */}
                {filtered.length > 0 && (
                    <div className="mt-16 bg-gradient-to-br from-[#1A1614] to-[#2D2420] rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B03A2E]/15 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AC0D]/10 rounded-full blur-[60px] pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#B03A2E] rounded-xl flex items-center justify-center mx-auto mb-5">
                                <Flame className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                                Produk yang Dicari Tidak Ada?
                            </h2>
                            <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto mb-7">
                                Hubungi kami langsung via WhatsApp untuk informasi ketersediaan dan harga spesial.
                            </p>
                            <a
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 bg-[#B03A2E] hover:bg-[#922B21] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-900/40 hover:-translate-y-0.5"
                            >
                                Chat WhatsApp Sekarang
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
