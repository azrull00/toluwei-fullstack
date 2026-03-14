"use client";

import { useActionState } from "react";
import { Flame, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { loginAction } from "@/actions/auth.actions";
import { BRAND } from "@/lib/constants";
import type { ActionResult } from "@/types";

export default function LoginPage() {
    const [state, action, isPending] = useActionState<ActionResult | null, FormData>(
        loginAction,
        null
    );

    return (
        <div className="min-h-screen bg-[#1A1614] flex items-center justify-center p-4">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#B03A2E]/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4AC0D]/8 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#B03A2E] rounded-2xl mb-4 shadow-lg shadow-red-950/50">
                        <Flame className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">{BRAND.name}</h1>
                    <p className="text-stone-500 text-sm mt-1">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-white mb-1">Masuk ke Dashboard</h2>
                    <p className="text-stone-500 text-sm mb-7">Masukkan kredensial admin Anda</p>

                    {/* Error */}
                    {state?.error && (
                        <div className="flex items-center gap-2.5 bg-red-950/50 border border-red-800/50 rounded-xl px-4 py-3 mb-5">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <p className="text-red-400 text-sm">{state.error}</p>
                        </div>
                    )}

                    <form action={action} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-stone-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="admin@toluwei.com"
                                    defaultValue="admin@toluwei.com"
                                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-stone-600 text-sm focus:outline-none focus:border-[#B03A2E] focus:ring-1 focus:ring-[#B03A2E] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-stone-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-stone-600 text-sm focus:outline-none focus:border-[#B03A2E] focus:ring-1 focus:ring-[#B03A2E] transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 bg-[#B03A2E] hover:bg-[#922B21] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm cursor-pointer"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Memverifikasi...
                                </>
                            ) : (
                                "Masuk ke Dashboard"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-stone-700 text-xs mt-8">
                    © {new Date().getFullYear()} {BRAND.name} — Hanya untuk Admin
                </p>
            </div>
        </div>
    );
}
