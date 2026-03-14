"use server";

import { revalidatePath } from "next/cache";
import { updateSiteSettings } from "@/services/site-setting.service";
import type { ActionResult, SiteSettingUpdateInput } from "@/types";

export async function updateSiteSettingAction(
    _prev: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        const data: SiteSettingUpdateInput = {
            heroTitle: (formData.get("heroTitle") as string)?.trim() || null,
            heroSubtitle: (formData.get("heroSubtitle") as string)?.trim() || null,
            heroCta: (formData.get("heroCta") as string)?.trim() || null,
            heroImageUrl: (formData.get("heroImageUrl") as string)?.trim() || null,
            aboutTitle: (formData.get("aboutTitle") as string)?.trim() || null,
            aboutDescription: (formData.get("aboutDescription") as string)?.trim() || null,
            aboutImageUrl: (formData.get("aboutImageUrl") as string)?.trim() || null,
            contactPhone: (formData.get("contactPhone") as string)?.trim() || null,
            contactAddress: (formData.get("contactAddress") as string)?.trim() || null,
            contactMaps: (formData.get("contactMaps") as string)?.trim() || null,
        };

        const result = await updateSiteSettings(data);
        if (!result.success) return { success: false, error: result.error ?? "Gagal menyimpan konten." };

        revalidatePath("/");
        revalidatePath("/admin/content");
        return { success: true };
    } catch (e) {
        console.error("[updateSiteSettingAction]", e);
        return { success: false, error: "Terjadi kesalahan saat menyimpan konten." };
    }
}
