import Image from "next/image";
import { CheckCircle2, Award, Leaf, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { SiteSetting } from "@/types";

interface AboutSectionProps {
    settings: SiteSetting | null;
}

const VALUES = [
    { icon: Leaf, text: "Daging segar dipilih setiap pagi" },
    { icon: CheckCircle2, text: "Proses higienis & terjaga kualitasnya" },
    { icon: Award, text: "Produk olahan buatan tangan otentik" },
    { icon: Clock, text: "Pengiriman area Wudi & sekitarnya" },
];

export function AboutSection({ settings }: AboutSectionProps) {
    const title = settings?.aboutTitle ?? "Tentang Toluwei";
    const description = settings?.aboutDescription ?? "Toluwei adalah usaha keluarga yang berdiri di Wudi, Kabupaten Sumba Timur, NTT. Kami menyediakan daging babi segar berkualitas tinggi dan berbagai produk olahan babi dengan cita rasa autentik.";

    return (
        <section id="tentang" className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── Left: Visual ── */}
                    <AnimateOnScroll animation="slide-left">
                        <div className="relative px-6 sm:px-8 lg:px-0">
                            {/* Main box */}
                            <div className="relative rounded-3xl overflow-hidden bg-white aspect-square max-w-sm mx-auto lg:max-w-none shadow-xl shadow-stone-200">
                                {/* Toluwei Logo */}
                                <Image
                                    src="/Toluwei.jpg"
                                    alt="Logo Toluwei"
                                    fill
                                    className="object-contain p-8 animate-float"
                                    sizes="(max-width: 640px) 384px, (max-width: 1024px) 384px, 50vw"
                                    priority
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-50/40 via-transparent to-transparent pointer-events-none" />
                                {/* Location pill */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1614]/80 backdrop-blur-sm text-white/80 text-xs uppercase tracking-widest font-medium px-4 py-1.5 rounded-full whitespace-nowrap">
                                    {BRAND.location}
                                </div>
                            </div>

                            {/* Floating stat — top right */}
                            <div className="absolute top-0 right-0 translate-x-1 -translate-y-3 sm:-translate-x-2 sm:-translate-y-5 bg-[#D4AC0D] text-[#1A1614] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl shadow-amber-400/20">
                                <div className="text-xl sm:text-2xl font-black leading-none">100%</div>
                                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide mt-1">Produk Lokal</div>
                            </div>

                            {/* Floating stat — bottom left */}
                            <div className="absolute bottom-0 left-0 -translate-x-1 translate-y-3 sm:translate-x-2 sm:translate-y-5 bg-[#B03A2E] text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl shadow-red-950/30">
                                <div className="text-xl sm:text-2xl font-black leading-none">Segar</div>
                                <div className="text-[10px] sm:text-[11px] text-red-200 uppercase tracking-wide mt-1">Tiap Hari</div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* ── Right: Text ── */}
                    <AnimateOnScroll animation="slide-right">
                        <span className="section-label">Siapa Kami</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1614] leading-tight mb-5 sm:mb-6 mt-3">
                            {title}
                        </h2>
                        <p className="text-stone-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-[15px]">
                            {description}
                        </p>

                        {/* Value list */}
                        <ul className="space-y-4">
                            {VALUES.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-[#B03A2E]" />
                                    </div>
                                    <span className="text-stone-600 text-sm leading-relaxed pt-2">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
