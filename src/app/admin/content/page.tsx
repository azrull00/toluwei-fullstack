export const dynamic = "force-dynamic";

import { getSiteSettings } from "@/services/site-setting.service";
import { ContentForm } from "@/components/admin/ContentForm";

export const metadata = { title: "Kelola Konten — Toluwei Admin" };

export default async function AdminContentPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-white">Kelola Konten Website</h1>
                <p className="text-stone-500 text-sm mt-1">
                    Perubahan akan otomatis tampil di halaman publik setelah disimpan
                </p>
            </div>

            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <ContentForm settings={settings} />
            </div>
        </div>
    );
}
