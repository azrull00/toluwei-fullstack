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
                <AnimateOnScroll animation="fade-up" className="text-center mb-16">
                    <span className="section-label">Cara Pemesanan</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1614] leading-tight">
                        Pesan Mudah dalam 4 Langkah
                    </h2>
                    <p className="text-stone-400 max-w-md mx-auto mt-4 text-[15px]">
                        Tidak perlu datang ke toko. Cukup WhatsApp dan pesanan Anda siap kami proses.
                    </p>
                </AnimateOnScroll>

                <div className="relative">
                    {/* Connector line — desktop */}
                    <div className="hidden sm:block absolute top-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map(({ num, title, desc, emoji }, i) => (
                            <AnimateOnScroll
                                key={num}
                                animation="fade-up"
                                delay={([0, 100, 200, 300] as const)[i]}
                            >
                                <div className="relative flex flex-col items-center text-center">
                                    {/* Step number circle */}
                                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border border-stone-100 shadow-sm flex flex-col items-center justify-center mb-5">
                                        <span className="text-2xl">{emoji}</span>
                                        <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mt-0.5">{num}</span>
                                    </div>
                                    <h3 className="text-[#1A1614] font-semibold mb-2 text-[15px] leading-snug">{title}</h3>
                                    <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
