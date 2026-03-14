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
        <section id="tentang" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Visual ── */}
                    <AnimateOnScroll animation="slide-left">
                        <div className="relative">
                            {/* Main box */}
                            <div className="relative rounded-3xl overflow-hidden bg-[#1A1614] aspect-square max-w-md mx-auto lg:max-w-none">
                                {/* Pattern overlay */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
                                        backgroundSize: "28px 28px",
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#B03A2E]/30 via-transparent to-[#D4AC0D]/20" />
                                {/* Center content */}
                                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                                    <span className="text-[90px] leading-none animate-float">🥩</span>
                                    <p className="text-white/60 text-sm uppercase tracking-widest font-medium">{BRAND.location}</p>
                                </div>
                            </div>

                            {/* Floating stat — top right */}
                            <div className="absolute -top-5 -right-5 bg-[#D4AC0D] text-[#1A1614] rounded-2xl px-5 py-4 shadow-xl shadow-amber-400/20">
                                <div className="text-2xl font-black leading-none">100%</div>
                                <div className="text-[11px] font-semibold uppercase tracking-wide mt-1">Produk Lokal</div>
                            </div>

                            {/* Floating stat — bottom left */}
                            <div className="absolute -bottom-5 -left-5 bg-[#B03A2E] text-white rounded-2xl px-5 py-4 shadow-xl shadow-red-950/30">
                                <div className="text-2xl font-black leading-none">Segar</div>
                                <div className="text-[11px] text-red-200 uppercase tracking-wide mt-1">Tiap Hari</div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* ── Right: Text ── */}
                    <AnimateOnScroll animation="slide-right">
                        <span className="section-label">Siapa Kami</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1614] leading-tight mb-6">
                            {title}
                        </h2>
                        <p className="text-stone-500 leading-relaxed mb-8 text-[15px]">
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
