"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Package, FileEdit, LogOut, Flame, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { logoutAction } from "@/actions/auth.actions";

const NAV = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Kelola Produk", href: "/admin/products", icon: Package },
    { label: "Kelola Konten", href: "/admin/content", icon: FileEdit },
];

interface SidebarProps {
    onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
    const path = usePathname();

    return (
        <aside className="flex flex-col h-full bg-[#111210] border-r border-white/8">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
                    <div className="w-8 h-8 bg-[#B03A2E] rounded-lg flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-white font-bold text-[15px]">{BRAND.name}</span>
                </Link>
                {onClose && (
                    <button onClick={onClose} className="text-stone-500 hover:text-white p-1 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Nav Label */}
            <div className="px-6 pt-6 pb-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-600 font-semibold">Menu</span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 space-y-0.5">
                {NAV.map(({ label, href, icon: Icon }) => {
                    const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                                active
                                    ? "bg-[#B03A2E]/15 text-[#B03A2E] border border-[#B03A2E]/20"
                                    : "text-stone-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/8">
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar
                    </button>
                </form>
                <p className="text-stone-700 text-[11px] text-center mt-4">
                    {BRAND.name} Admin v1.0
                </p>
            </div>
        </aside>
    );
}
