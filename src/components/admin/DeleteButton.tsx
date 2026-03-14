"use client";

import { useTransition, useState } from "react";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { deleteProductAction } from "@/actions/product.actions";

interface DeleteButtonProps {
    productId: string;
    productName: string;
}

export function DeleteButton({ productId, productName }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleDelete = () => {
        if (!confirm(`Hapus "${productName}" secara permanen? Tindakan ini tidak bisa dibatalkan.`)) return;

        setError(null);
        startTransition(async () => {
            const result = await deleteProductAction(productId);
            if (!result.success) {
                setError(result.error ?? "Gagal menghapus produk.");
            }
        });
    };

    return (
        <div className="relative">
            <button
                onClick={handleDelete}
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
            {error && (
                <div className="absolute top-full right-0 mt-1 z-10 bg-red-950/90 border border-red-800/40 rounded-lg px-3 py-2 flex items-center gap-2 min-w-48 shadow-lg">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="text-red-400 text-xs">{error}</span>
                </div>
            )}
        </div>
    );
}
