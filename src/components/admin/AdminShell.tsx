"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/admin/Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0F0F0E] flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-60 shrink-0 flex-col fixed inset-y-0 left-0 z-30">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 flex"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative w-64 h-full" onClick={(e) => e.stopPropagation()}>
                        <Sidebar onClose={() => setMobileOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main */}
            <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
                {/* Mobile Topbar */}
                <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#111210] border-b border-white/8 sticky top-0 z-20">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="text-stone-400 hover:text-white transition-colors p-1"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="text-white font-semibold text-sm">Admin Dashboard</span>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
