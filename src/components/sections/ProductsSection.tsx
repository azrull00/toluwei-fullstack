"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
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
            <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-stone-50 to-red-50/30 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-stone-300">
                            <ShoppingBag className="w-14 h-14" strokeWidth={1} />
                        </div>
                    )}
                    {/* Type badge */}
                    <span className={cn(
                        "absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg uppercase tracking-wide",
                        product.type === "SEGAR"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                    )}>
                        {PRODUCT_TYPES[product.type as ProductType]}
                    </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-[#1A1614] text-[15px] leading-snug mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                    {product.description && (
                        <p className="text-stone-400 text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1">
                            {product.description}
                        </p>
                    )}
                    {/* Price + CTA */}
                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-stone-100">
                        <div>
                            <p className="text-[#B03A2E] font-bold text-[17px] leading-tight">
                                {formatCurrency(product.price)}
                            </p>
                            <span className="text-stone-400 text-[11px]">/ {product.unit}</span>
                        </div>
                        <a
                            href={getWhatsAppUrl(msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold bg-[#B03A2E] hover:bg-[#922B21] text-white px-4 py-2 rounded-xl transition-colors duration-200"
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
    const filtered = filter === "ALL" ? products : products.filter(p => p.type === filter);

    const tabs: { key: "ALL" | ProductType; label: string }[] = [
        { key: "ALL", label: "Semua" },
        { key: "SEGAR", label: PRODUCT_TYPES.SEGAR },
        { key: "OLAHAN", label: PRODUCT_TYPES.OLAHAN },
    ];

    return (
        <>
            {/* Filter tabs */}
            <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={cn(
                            "px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200",
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-stone-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" strokeWidth={1} />
                    <p className="text-sm">Belum ada produk di kategori ini.</p>
                </div>
            )}
        </>
    );
}

// ─── Section wrapper (Server Component) ──────────────────────────────────────
export function ProductsSection({ products }: { products: Product[] }) {
    return (
        <section id="produk" className="py-24 bg-[#FAFAF8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll animation="fade-up" className="text-center mb-14">
                    <span className="section-label">Katalog Kami</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1614] leading-tight">
                        Produk Unggulan Toluwei
                    </h2>
                    <p className="text-stone-400 max-w-md mx-auto mt-4 text-[15px]">
                        Dari daging segar pilihan hingga olahan lezat — langsung dari Wudi, Sumba Timur.
                    </p>
                </AnimateOnScroll>
                <ProductsGrid products={products} />
            </div>
        </section>
    );
}
