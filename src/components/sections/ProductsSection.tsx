"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, getWhatsAppUrl, PRODUCT_TYPES } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Product, ProductType } from "@/types";

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
    const msg = `Halo Toluwei, saya ingin menanyakan stok *${product.name}* (${formatCurrency(product.price)}/${product.unit}). Apakah tersedia sekarang?`;
    const delay = ([0, 100, 200, 300, 400, 500] as const)[index % 6];

    return (
        <AnimateOnScroll animation="scale-in" delay={delay}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-stone-50 to-red-50/30 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-stone-300">
                            <ShoppingBag className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1} />
                        </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
                    {/* Type badge */}
                    <span className={cn(
                        "absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg uppercase tracking-wide backdrop-blur-sm",
                        product.type === "SEGAR"
                            ? "bg-emerald-50/90 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50/90 text-amber-700 border border-amber-200"
                    )}>
                        {PRODUCT_TYPES[product.type as ProductType]}
                    </span>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-[#1A1614] text-[14px] sm:text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#B03A2E] transition-colors duration-200">
                        {product.name}
                    </h3>
                    {product.description && (
                        <p className="text-stone-400 text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1">
                            {product.description}
                        </p>
                    )}
                    {/* Price + CTA */}
                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-stone-100">
                        <div>
                            <p className="text-[#B03A2E] font-bold text-[16px] sm:text-[17px] leading-tight">
                                {formatCurrency(product.price)}
                            </p>
                            <span className="text-stone-400 text-[11px]">/ {product.unit}</span>
                        </div>
                        <a
                            href={getWhatsAppUrl(msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm font-semibold bg-[#B03A2E] hover:bg-[#922B21] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-red-900/20 hover:-translate-y-0.5"
                        >
                            Pesan
                        </a>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
    );
}

// ─── Products Grid (client — has filter state) ────────────────────────────────
function ProductsGrid({ products }: { products: Product[] }) {
    const [filter, setFilter] = useState<"ALL" | ProductType>("ALL");
    // Show at most 8 on landing page (2 rows of 4 on desktop)
    const PREVIEW_LIMIT = 8;

    const filtered = filter === "ALL" ? products : products.filter(p => p.type === filter);
    const preview = filtered.slice(0, PREVIEW_LIMIT);
    const hasMore = filtered.length > PREVIEW_LIMIT || products.length > PREVIEW_LIMIT;

    const tabs: { key: "ALL" | ProductType; label: string }[] = [
        { key: "ALL", label: "Semua" },
        { key: "SEGAR", label: PRODUCT_TYPES.SEGAR },
        { key: "OLAHAN", label: PRODUCT_TYPES.OLAHAN },
    ];

    return (
        <>
            {/* Filter tabs */}
            <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={cn(
                            "px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-200",
                            filter === tab.key
                                ? "bg-[#1A1614] text-white border-[#1A1614]"
                                : "bg-transparent text-stone-500 border-stone-200 hover:border-[#1A1614] hover:text-[#1A1614]"
                        )}
                    >
                        {tab.label}
                        <span className={cn(
                            "ml-2 text-[11px] px-1.5 py-0.5 rounded-full",
                            filter === tab.key ? "bg-white/15 text-white/80" : "bg-stone-100 text-stone-400"
                        )}>
                            {tab.key === "ALL" ? products.length : products.filter(p => p.type === tab.key).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {preview.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="text-center py-16 text-stone-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" strokeWidth={1} />
                    <p className="text-sm">Belum ada produk di kategori ini.</p>
                </div>
            )}

            {/* View All CTA */}
            {hasMore && (
                <div className="text-center mt-12">
                    <p className="text-stone-400 text-sm mb-5">
                        Menampilkan <span className="font-semibold text-stone-600">{preview.length}</span> dari{" "}
                        <span className="font-semibold text-stone-600">{filtered.length}</span> produk
                    </p>
                    <Link
                        href="/katalog"
                        className="group inline-flex items-center gap-2.5 bg-[#1A1614] hover:bg-[#B03A2E] text-white font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 hover:-translate-y-0.5"
                    >
                        Lihat Semua Katalog
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </>
    );
}

// ─── Section wrapper (Server Component) ──────────────────────────────────────
export function ProductsSection({ products }: { products: Product[] }) {
    return (
        <section id="produk" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll animation="fade-up" className="text-center mb-10 sm:mb-14">
                    <span className="section-label">Katalog Kami</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1614] leading-tight mt-3">
                        Produk Unggulan Toluwei
                    </h2>
                    <p className="text-stone-400 max-w-md mx-auto mt-4 text-sm sm:text-[15px] leading-relaxed">
                        Dari daging segar pilihan hingga olahan lezat — langsung dari Wudi, Sumba Timur.
                    </p>
                </AnimateOnScroll>
                <ProductsGrid products={products} />
            </div>
        </section>
    );
}
