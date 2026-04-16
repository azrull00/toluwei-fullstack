import { Leaf, Shield, Award, Truck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const FEATURES = [
    {
        icon: Leaf,
        title: "Segar Setiap Hari",
        desc: "Dipilih langsung dari peternakan lokal setiap pagi. Tidak ada stok lama — hanya yang terbaik.",
        color: "text-emerald-400",
        bg: "bg-emerald-950/20",
        border: "border-emerald-800/20",
    },
    {
        icon: Shield,
        title: "100% Higienis",
        desc: "Proses pemotongan dan pengolahan dilakukan dengan standar kebersihan yang ketat dan terjaga.",
        color: "text-blue-400",
        bg: "bg-blue-950/20",
        border: "border-blue-800/20",
    },
    {
        icon: Award,
        title: "Kualitas Ternak Lokal",
        desc: "Babi Sumba Timur terkenal dengan dagingnya yang gurih, berlemak proporsional, dan berkualitas tinggi.",
        color: "text-amber-400",
        bg: "bg-amber-950/20",
        border: "border-amber-800/20",
    },
    {
        icon: Truck,
        title: "Antar ke Lokasi",
        desc: "Layanan pengantaran tersedia untuk area Wudi dan sekitarnya. Pesan pagi, terima siang.",
        color: "text-[#B03A2E]",
        bg: "bg-red-950/20",
        border: "border-red-800/20",
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-[#1A1614] relative overflow-hidden">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll animation="fade-up" className="text-center mb-10 sm:mb-14">
                    <span className="section-label" style={{ color: "#D4AC0D" }}>Mengapa Kami</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        Kelebihan Produk Toluwei
                    </h2>
                    <p className="text-stone-500 max-w-md mx-auto mt-3 sm:mt-4 text-sm sm:text-[15px]">
                        Daging babi segar dan olahan berkualitas tinggi langsung dari jantung Sumba Timur.
                    </p>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                        <AnimateOnScroll
                            key={title}
                            animation="scale-in"
                            delay={([0, 100, 200, 300] as const)[i]}
                        >
                            <div className={`${bg} border ${border} rounded-2xl p-5 sm:p-6 h-full transition-colors`}>
                                <div className={`${bg} border ${border} w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5`}>
                                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                                </div>
                                <h3 className="text-white font-semibold mb-2 text-sm sm:text-[15px]">{title}</h3>
                                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
