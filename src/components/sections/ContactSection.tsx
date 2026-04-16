import { Phone, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { WhatsAppPicker } from "@/components/ui/WhatsAppPicker";
import type { SiteSetting } from "@/types";

interface ContactSectionProps {
    settings: SiteSetting | null;
}

export function ContactSection({ settings }: ContactSectionProps) {
    const phone = settings?.contactPhone ?? BRAND.phone;
    const address = settings?.contactAddress ?? BRAND.address;

    return (
        <section id="kontak" className="py-16 sm:py-20 lg:py-24 bg-[#1A1614] relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#B03A2E]/8 blur-[120px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#D4AC0D]/6 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <AnimateOnScroll animation="fade-up" className="text-center mb-10 sm:mb-16">
                    <span className="section-label" style={{ color: "#D4AC0D" }}>Hubungi Kami</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        Siap Melayani Pesanan Anda
                    </h2>
                    <p className="text-stone-500 max-w-md mx-auto mt-3 sm:mt-4 text-sm sm:text-[15px]">
                        Hubungi kami via WhatsApp atau kunjungi toko di Wudi, Sumba Timur.
                    </p>
                </AnimateOnScroll>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
                    {[
                        { icon: Phone, label: "Telepon", content: phone, href: `tel:${phone}`, delay: 0 as const },
                        { icon: MapPin, label: "Lokasi", content: address, href: undefined, delay: 100 as const },
                        { icon: Clock, label: "Jam Buka", content: "Senin – Sabtu\n06.00 – 18.00 WITA", href: undefined, delay: 200 as const },
                    ].map(({ icon: Icon, label, content, href, delay }) => (
                        <AnimateOnScroll key={label} animation="fade-up" delay={delay}>
                            <div className="border border-white/8 bg-white/4 hover:bg-white/8 rounded-2xl p-5 sm:p-6 text-center transition-colors h-full">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AC0D]" />
                                </div>
                                <h3 className="text-white font-semibold text-sm mb-2">{label}</h3>
                                {href ? (
                                    <a href={href} className="text-stone-400 hover:text-[#D4AC0D] transition-colors text-sm">
                                        {content}
                                    </a>
                                ) : (
                                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">{content}</p>
                                )}
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* WhatsApp CTA — pakai WhatsAppPicker */}
                <AnimateOnScroll animation="scale-in" className="text-center">
                    <WhatsAppPicker
                        label="Chat via WhatsApp"
                        variant="green"
                        size="lg"
                        className="text-base font-bold px-10 py-4 rounded-2xl"
                    />
                    <p className="text-stone-600 text-sm mt-4 sm:mt-5">
                        Kami merespons dalam beberapa menit ⚡
                    </p>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
