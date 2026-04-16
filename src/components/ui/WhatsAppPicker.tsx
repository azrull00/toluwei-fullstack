"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppPickerProps {
    /** Pesan opsional — diteruskan sebagai query param ke halaman /hubungi */
    message?: string;
    /** Label tombol */
    label?: string;
    /** Variant tampilan */
    variant?: "primary" | "ghost" | "green";
    /** Ukuran tombol */
    size?: "sm" | "md" | "lg";
    /** Class tambahan */
    className?: string;
    /** Icon kustom di kiri label */
    icon?: React.ReactNode;
}

const sizeMap = {
    sm: "text-xs px-3 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
};

const variantMap = {
    primary:
        "bg-[#B03A2E] hover:bg-[#922B21] text-white shadow-lg shadow-red-950/30 hover:shadow-xl hover:-translate-y-0.5",
    ghost:
        "border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm",
    green:
        "bg-[#25D366] hover:bg-[#1ebe5c] text-white shadow-lg shadow-green-900/30 hover:shadow-xl hover:-translate-y-0.5",
};

/**
 * Tombol WhatsApp yang mengarahkan ke halaman /hubungi
 * untuk memilih admin. Tidak ada modal — tidak ada overflow bug.
 */
export function WhatsAppPicker({
    message,
    label = "WhatsApp Kami",
    variant = "green",
    size = "md",
    className,
    icon,
}: WhatsAppPickerProps) {
    // Encode pesan sebagai query param agar halaman /hubungi bisa membacanya
    const href = message
        ? `/hubungi?msg=${encodeURIComponent(message)}`
        : "/hubungi";

    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300",
                sizeMap[size],
                variantMap[variant],
                className
            )}
        >
            {icon ?? (
                <MessageCircle
                    className={size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"}
                />
            )}
            {label}
        </Link>
    );
}
