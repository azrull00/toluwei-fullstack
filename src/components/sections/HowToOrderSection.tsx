import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const STEPS = [
    {
        num: "01",
        title: "Hubungi via WhatsApp",
        desc: "Kirim pesan ke nomor WhatsApp kami. Tim Toluwei siap merespons dalam beberapa menit.",
        emoji: "💬",
    },
    {
        num: "02",
        title: "Pilih & Sebutkan Produk",
        desc: "Sebutkan produk yang ingin dipesan beserta jumlahnya. Kami bantu rekomendasikan jika perlu.",
        emoji: "🛒",
    },
    {
        num: "03",
        title: "Konfirmasi & Pembayaran",
        desc: "Kami konfirmasi ketersediaan stok dan total harga. Pembayaran tunai atau transfer.",
        emoji: "✅",
    },
    {
        num: "04",
        title: "Terima Pesanan",
        desc: "Ambil langsung di toko kami di Wudi atau kami antar ke lokasi Anda di area terdekat.",
        emoji: "📦",
    },
];

export function HowToOrderSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll animation="fade-up" className="text-center mb-10 sm:mb-16">
                    <span className="section-label">Cara Pemesanan</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1614] leading-tight">
                        Pesan Mudah dalam 4 Langkah
                    </h2>
                    <p className="text-stone-400 max-w-md mx-auto mt-3 sm:mt-4 text-sm sm:text-[15px]">
                        Tidak perlu datang ke toko. Cukup WhatsApp dan pesanan Anda siap kami proses.
                    </p>
                </AnimateOnScroll>

                <div className="relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden lg:block absolute top-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

                    {/* Mobile: vertical stepper line */}
                    <div className="lg:hidden absolute left-[39px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent" />

                    {/* Desktop grid / Mobile list */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">
                        {STEPS.map(({ num, title, desc, emoji }, i) => (
                            <AnimateOnScroll
                                key={num}
                                animation="fade-up"
                                delay={([0, 100, 200, 300] as const)[i]}
                            >
                                {/* Mobile: horizontal row layout */}
                                <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center">
                                    <div className="relative z-10 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl bg-white border border-stone-100 shadow-sm flex flex-col items-center justify-center shrink-0 lg:mb-5">
                                        <span className="text-xl sm:text-2xl">{emoji}</span>
                                        <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mt-0.5">{num}</span>
                                    </div>
                                    <div className="pt-1 lg:pt-0">
                                        <h3 className="text-[#1A1614] font-semibold mb-1 sm:mb-2 text-sm sm:text-[15px] leading-snug">{title}</h3>
                                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
