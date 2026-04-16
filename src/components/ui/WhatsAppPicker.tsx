"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { WA_ADMINS, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WhatsAppPickerProps {
    /** Pesan yang akan dikirim ke WA — bisa berisi nama produk dll */
    message?: string;
    /** Label tombol utama */
    label?: string;
    /** Variant tampilan tombol */
    variant?: "primary" | "ghost" | "green";
    /** Ukuran tombol */
    size?: "sm" | "md" | "lg";
    /** Class tambahan untuk tombol trigger */
    className?: string;
    /** Icon di kiri label */
    icon?: React.ReactNode;
}

const sizeMap = {
    sm: "text-xs px-3 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
};

const variantMap = {
    primary: "bg-[#B03A2E] hover:bg-[#922B21] text-white shadow-lg shadow-red-950/30 hover:shadow-xl hover:-translate-y-0.5",
    ghost: "border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm",
    green: "bg-[#25D366] hover:bg-[#1ebe5c] text-white shadow-lg shadow-green-900/30 hover:shadow-xl hover:-translate-y-0.5",
};

export function WhatsAppPicker({
    message,
    label = "WhatsApp Kami",
    variant = "green",
    size = "md",
    className,
    icon,
}: WhatsAppPickerProps) {
    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Tutup modal saat klik di luar
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // Tutup modal saat tekan Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    // Lock scroll saat modal terbuka
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* ── Trigger Button ── */}
            <button
                onClick={() => setOpen(true)}
                className={cn(
                    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer",
                    sizeMap[size],
                    variantMap[variant],
                    className
                )}
            >
                {icon ?? <MessageCircle className={size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"} />}
                {label}
            </button>

            {/* ── Modal Overlay ── */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Pilih Admin WhatsApp"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal card */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-sm bg-[#1C1A18] border border-white/10 rounded-3xl p-6 shadow-2xl animate-scale-in"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors text-stone-400 hover:text-white"
                            aria-label="Tutup"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base">Pilih Admin</h3>
                                <p className="text-stone-500 text-xs mt-0.5">
                                    Hubungi salah satu admin kami
                                </p>
                            </div>
                        </div>

                        {/* Admin list */}
                        <div className="space-y-3">
                            {WA_ADMINS.map((admin, i) => (
                                <a
                                    key={admin.id}
                                    href={getWhatsAppUrl(message, admin.whatsapp)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/4 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all duration-200 group"
                                >
                                    {/* Avatar */}
                                    <div className="w-11 h-11 rounded-full bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                                        <Phone className="w-4.5 h-4.5 text-[#25D366]" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-semibold text-sm">
                                            {admin.name}
                                            {i === 0 && (
                                                <span className="ml-2 text-[10px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded-full font-medium">
                                                    Utama
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-stone-400 text-xs mt-0.5">{admin.phone}</p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </a>
                            ))}
                        </div>

                        <p className="text-stone-600 text-xs text-center mt-5">
                            Kami merespons dalam beberapa menit ⚡
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
