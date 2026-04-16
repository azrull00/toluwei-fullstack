"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastData {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number; // ms, default 4000
}

// ─── Global event bus (tanpa library) ────────────────────────────────────────
type ToastListener = (toast: ToastData) => void;
const listeners: Set<ToastListener> = new Set();

function emit(toast: ToastData) {
    listeners.forEach((fn) => fn(toast));
}

/** Panggil dari mana saja untuk menampilkan toast */
export function showToast(
    type: ToastType,
    title: string,
    message?: string,
    duration = 4000
) {
    emit({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        title,
        message,
        duration,
    });
}

// ─── Shorthand helpers ────────────────────────────────────────────────────────
export const toast = {
    success: (title: string, message?: string) => showToast("success", title, message),
    error: (title: string, message?: string) => showToast("error", title, message, 6000),
    warning: (title: string, message?: string) => showToast("warning", title, message),
    info: (title: string, message?: string) => showToast("info", title, message),
};

// ─── Config per type ──────────────────────────────────────────────────────────
const CONFIG: Record<ToastType, {
    icon: React.ElementType;
    bar: string;
    iconCls: string;
    bg: string;
    border: string;
}> = {
    success: {
        icon: CheckCircle2,
        bar: "bg-emerald-500",
        iconCls: "text-emerald-400",
        bg: "bg-[#0F1A14]",
        border: "border-emerald-800/50",
    },
    error: {
        icon: XCircle,
        bar: "bg-red-500",
        iconCls: "text-red-400",
        bg: "bg-[#1A0F0F]",
        border: "border-red-800/50",
    },
    warning: {
        icon: AlertTriangle,
        bar: "bg-amber-500",
        iconCls: "text-amber-400",
        bg: "bg-[#1A160A]",
        border: "border-amber-800/50",
    },
    info: {
        icon: Info,
        bar: "bg-blue-500",
        iconCls: "text-blue-400",
        bg: "bg-[#0A0F1A]",
        border: "border-blue-800/50",
    },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────
function ToastItem({ toast: t, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) {
    const [visible, setVisible] = useState(false);
    const cfg = CONFIG[t.type];
    const Icon = cfg.icon;

    useEffect(() => {
        // Trigger enter animation
        const enterTimer = setTimeout(() => setVisible(true), 10);
        // Auto-dismiss
        const exitTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onRemove(t.id), 300);
        }, t.duration ?? 4000);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [t.id, t.duration, onRemove]);

    const dismiss = () => {
        setVisible(false);
        setTimeout(() => onRemove(t.id), 300);
    };

    return (
        <div
            role="alert"
            aria-live="polite"
            className={cn(
                "relative flex items-start gap-3 w-full max-w-sm rounded-2xl border px-4 py-3.5 shadow-2xl overflow-hidden",
                "transition-all duration-300 ease-out",
                cfg.bg,
                cfg.border,
                visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
            )}
        >
            {/* Progress bar */}
            <div
                className={cn("absolute bottom-0 left-0 h-[2px] rounded-full", cfg.bar)}
                style={{
                    animation: `toast-progress ${t.duration ?? 4000}ms linear forwards`,
                }}
            />

            {/* Icon */}
            <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", cfg.iconCls)} />

            {/* Text */}
            <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-snug">{t.title}</p>
                {t.message && (
                    <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">{t.message}</p>
                )}
            </div>

            {/* Close */}
            <button
                onClick={dismiss}
                className="shrink-0 text-stone-600 hover:text-white transition-colors mt-0.5"
                aria-label="Tutup notifikasi"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

// ─── Toast Container — taruh di root layout ───────────────────────────────────
export function ToastContainer() {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const addToast = useCallback((t: ToastData) => {
        setToasts((prev) => [...prev, t]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    useEffect(() => {
        listeners.add(addToast);
        return () => { listeners.delete(addToast); };
    }, [addToast]);

    if (toasts.length === 0) return null;

    return (
        <>
            {/* Keyframe untuk progress bar */}
            <style>{`
                @keyframes toast-progress {
                    from { width: 100%; }
                    to   { width: 0%; }
                }
            `}</style>

            {/* Stack — pojok kanan atas di desktop, bawah di mobile */}
            <div
                aria-label="Notifikasi"
                className="fixed bottom-4 right-4 sm:top-4 sm:bottom-auto z-[99999] flex flex-col gap-2.5 items-end pointer-events-none"
            >
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto w-full max-w-sm">
                        <ToastItem toast={t} onRemove={removeToast} />
                    </div>
                ))}
            </div>
        </>
    );
}
