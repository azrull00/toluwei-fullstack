"use client";

import { ArrowDown, Flame } from "lucide-react";
import { getWhatsAppUrl, BRAND } from "@/lib/constants";
import type { SiteSetting } from "@/types";

const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

interface HeroSectionProps {
    settings: SiteSetting | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
    const title =
        settings?.heroTitle ?? "Daging Babi Segar & Olahan Terbaik di Sumba Timur";
    const subtitle =
        settings?.heroSubtitle ??
        "Toluwei menghadirkan produk daging babi berkualitas langsung dari Wudi, Sumba Timur. Segar, higienis, dan lezat untuk setiap sajian.";
    const ctaText = settings?.heroCta ?? "Lihat Produk Kami";

    // Split title around "&" for highlight
    const parts = title.split("&");
    const beforeAmp = parts[0];
    const afterAmp = parts[1];

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1A1614]"
        >
            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Gradient orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#B03A2E]/15 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#D4AC0D]/10 blur-[100px] pointer-events-none" />

            {/* Decorative vertical lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[15, 35, 65, 85].map((pos) => (
                    <div
                        key={pos}
                        className="absolute top-0 bottom-0 border-l border-white/[0.03]"
                        style={{ left: `${pos}%` }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="animate-fade-in inline-flex items-center gap-2.5 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-5 py-2 mb-10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#D4AC0D] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AC0D]" />
                    </span>
                    <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
                        {BRAND.location}
                    </span>
                </div>

                {/* Headline */}
                <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                    {beforeAmp}
                    {afterAmp && (
                        <>
                            <span className="text-[#B03A2E]">&</span>
                            <br className="hidden sm:block" />
                            {afterAmp}
                        </>
                    )}
                </h1>

                {/* Gold divider */}
                <div className="animate-fade-in delay-200 flex items-center justify-center gap-4 mb-7">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AC0D]" />
                    <Flame className="w-4 h-4 text-[#D4AC0D]" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AC0D]" />
                </div>

                {/* Subtitle */}
                <p className="animate-fade-up delay-200 text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                    {subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => scroll("produk")}
                        className="group flex items-center gap-2.5 bg-[#B03A2E] hover:bg-[#922B21] text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-950/50 hover:shadow-xl hover:shadow-red-950/60 hover:-translate-y-0.5 cursor-pointer"
                    >
                        {ctaText}
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                    <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-base px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                        WhatsApp Kami
                    </a>
                </div>

                {/* Stats row */}
                <div className="animate-fade-up delay-400 mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-6 max-w-sm mx-auto">
                    {[
                        { value: "100%", label: "Segar Harian" },
                        { value: "7+", label: "Jenis Produk" },
                        { value: "Wudi", label: "Sumba Timur" },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="text-xl font-bold text-white">{s.value}</div>
                            <div className="text-white/40 text-[11px] mt-1 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll arrow */}
            <button
                onClick={() => scroll("produk")}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors group cursor-pointer"
                aria-label="Scroll ke produk"
            >
                <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
        </section>
    );
}
