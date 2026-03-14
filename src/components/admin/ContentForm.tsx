"use client";

import { useActionState, useState } from "react";
import { updateSiteSettingAction } from "@/actions/site-setting.actions";
import { Loader2, CheckCircle2, AlertCircle, Map } from "lucide-react";
import type { SiteSetting, ActionResult } from "@/types";

export function ContentForm({ settings }: { settings: SiteSetting | null }) {
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        updateSiteSettingAction,
        null
    );
    const [mapsUrl, setMapsUrl] = useState(settings?.contactMaps ?? "");

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-stone-600 text-sm focus:outline-none focus:border-[#B03A2E] focus:ring-1 focus:ring-[#B03A2E] transition-colors";
    const labelCls = "block text-stone-400 text-xs font-medium mb-1.5 uppercase tracking-wide";

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="border-b border-white/8 pb-3 mb-5 mt-8 first:mt-0">
            <h3 className="text-white font-semibold text-sm">{title}</h3>
        </div>
    );

    return (
        <form action={formAction} className="space-y-0">
            {state?.error && (
                <div className="flex items-center gap-2.5 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3 mb-5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{state.error}</p>
                </div>
            )}
            {state?.success && (
                <div className="flex items-center gap-2.5 bg-green-950/40 border border-green-800/40 rounded-xl px-4 py-3 mb-5">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <p className="text-green-400 text-sm">Konten berhasil disimpan!</p>
                </div>
            )}

            {/* ── Hero ── */}
            <SectionHeader title="🎯 Bagian Hero (Halaman Utama)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className={labelCls}>Judul Hero</label>
                    <input name="heroTitle" defaultValue={settings?.heroTitle ?? ""} placeholder="Daging Babi Segar & Olahan..." className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                    <label className={labelCls}>Subtitle Hero</label>
                    <textarea name="heroSubtitle" rows={3} defaultValue={settings?.heroSubtitle ?? ""} placeholder="Deskripsi singkat..." className={`${inputCls} resize-none`} />
                </div>
                <div>
                    <label className={labelCls}>Teks Tombol CTA</label>
                    <input name="heroCta" defaultValue={settings?.heroCta ?? ""} placeholder="Lihat Produk Kami" className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>URL Gambar Hero (Opsional)</label>
                    <input name="heroImageUrl" defaultValue={settings?.heroImageUrl ?? ""} placeholder="https://..." className={inputCls} />
                </div>
            </div>

            {/* ── About ── */}
            <SectionHeader title="ℹ️ Bagian Tentang Kami" />
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <label className={labelCls}>Judul About</label>
                    <input name="aboutTitle" defaultValue={settings?.aboutTitle ?? ""} placeholder="Tentang Toluwei" className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Deskripsi About</label>
                    <textarea name="aboutDescription" rows={4} defaultValue={settings?.aboutDescription ?? ""} placeholder="Deskripsi usaha Toluwei..." className={`${inputCls} resize-none`} />
                </div>
            </div>

            {/* ── Contact ── */}
            <SectionHeader title="📞 Informasi Kontak" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelCls}>Nomor Telepon / WhatsApp</label>
                    <input name="contactPhone" defaultValue={settings?.contactPhone ?? ""} placeholder="+62 812-xxxx-xxxx" className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Alamat Lengkap</label>
                    <input name="contactAddress" defaultValue={settings?.contactAddress ?? ""} placeholder="Jl. ... Wudi, Sumba Timur" className={inputCls} />
                </div>
            </div>
            {/* Submit */}
            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 bg-[#B03A2E] hover:bg-[#922B21] disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    {isPending ? "Menyimpan..." : "Simpan Semua Perubahan"}
                </button>
            </div>
        </form>
    );
}
