import type { Metadata } from "next";
import { WA_ADMINS, getWhatsAppUrl, BRAND } from "@/lib/constants";
import { MessageCircle, Phone, ArrowLeft, Flame, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Hubungi Kami – Toluwei",
    description: "Pilih admin Toluwei untuk dihubungi via WhatsApp. Kami siap melayani pesanan daging babi segar dan olahan.",
    robots: { index: false, follow: false },
};

interface Props {
    searchParams: Promise<{ msg?: string }>;
}

export default async function HubungiPage({ searchParams }: Props) {
    const { msg } = await searchParams;
    const defaultMsg = msg ?? `Halo Toluwei, saya ingin memesan produk Anda.`;

    return (
        <div className="min-h-screen bg-[#1A1614] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25D366]/8 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B03A2E]/8 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-sm mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Beranda
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#25D366]/15 border border-[#25D366]/20 rounded-2xl mb-4">
                        <MessageCircle className="w-7 h-7 text-[#25D366]" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                        Pilih Admin
                    </h1>
                    <p className="text-stone-500 text-sm leading-relaxed">
                        Hubungi salah satu admin kami via WhatsApp.
                        <br />Kami siap merespons dalam beberapa menit.
                    </p>
                </div>

                {/* Admin cards */}
                <div className="space-y-4 mb-8">
                    {WA_ADMINS.map((admin, i) => (
                        <a
                            key={admin.id}
                            href={getWhatsAppUrl(defaultMsg, admin.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/4 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/10"
                        >
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                                <Phone className="w-6 h-6 text-[#25D366]" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-white font-bold text-base">{admin.name}</p>
                                    {i === 0 && (
                                        <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-2 py-0.5 rounded-full font-semibold">
                                            Utama
                                        </span>
                                    )}
                                </div>
                                <p className="text-stone-400 text-sm font-medium">{admin.phone}</p>
                                <p className="text-stone-600 text-xs mt-1">Klik untuk buka WhatsApp</p>
                            </div>

                            {/* WA icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-lg shadow-green-900/30 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* Info strip */}
                <div className="bg-white/4 border border-white/8 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AC0D]/15 flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-[#D4AC0D]" />
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">Jam Operasional</p>
                            <p className="text-stone-500 text-xs">Senin – Sabtu, 06.00 – 18.00 WITA</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#B03A2E]/15 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-[#B03A2E]" />
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">Lokasi</p>
                            <p className="text-stone-500 text-xs">{BRAND.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                            <Flame className="w-4 h-4 text-stone-400" />
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">Respons Cepat</p>
                            <p className="text-stone-500 text-xs">Biasanya merespons dalam beberapa menit ⚡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
