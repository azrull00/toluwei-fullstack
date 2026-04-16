"use client";

import { useTransition, useState } from "react";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import { deleteProductAction } from "@/actions/product.actions";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
    productId: string;
    productName: string;
}

// ─── Confirm Dialog (custom — menggantikan window.confirm) ────────────────────
function ConfirmDialog({
    productName,
    onConfirm,
    onCancel,
    isPending,
}: {
    productName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isPending: boolean;
}) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-sm bg-[#1C1A18] border border-white/10 rounded-2xl p-6 shadow-2xl animate-scale-in">
                {/* Close */}
                <button
                    onClick={onCancel}
                    className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-stone-500 hover:text-white transition-colors"
                    aria-label="Batal"
                >
                    <X className="w-3.5 h-3.5" />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-800/30 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>

                {/* Text */}
                <h3 className="text-white font-bold text-base mb-1">Hapus Produk?</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                    Produk{" "}
                    <span className="text-white font-semibold">&quot;{productName}&quot;</span>{" "}
                    akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isPending}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
                        )}
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                        {isPending ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isPending}
                        className="flex-1 py-2.5 rounded-xl border border-white/10 text-stone-400 hover:text-white hover:border-white/20 text-sm font-medium transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Delete Button ────────────────────────────────────────────────────────────
export function DeleteButton({ productId, productName }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        startTransition(async () => {
            const result = await deleteProductAction(productId);
            setShowConfirm(false);
            if (result.success) {
                toast.success(
                    "Produk dihapus",
                    `"${productName}" berhasil dihapus.`
                );
            } else {
                toast.error(
                    "Gagal menghapus",
                    result.error ?? "Terjadi kesalahan. Coba lagi."
                );
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-400 transition-colors disabled:opacity-50 px-2 py-1 rounded-lg hover:bg-red-950/20 cursor-pointer"
            >
                {isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                )}
                {isPending ? "Menghapus..." : "Hapus"}
            </button>

            {showConfirm && (
                <ConfirmDialog
                    productName={productName}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowConfirm(false)}
                    isPending={isPending}
                />
            )}
        </>
    );
}
