import { prisma } from "@/lib/db";
import type { SiteSetting, SiteSettingUpdateInput, ActionResult } from "@/types";

const SETTINGS_KEY = "main";

// ─── Public ───────────────────────────────────────────────────────────────────

/**
 * Fetch the main site settings (used by landing page)
 * Returns null if not seeded yet — never throws.
 */
export async function getSiteSettings(): Promise<SiteSetting | null> {
    try {
        return (await prisma.siteSetting.findUnique({
            where: { key: SETTINGS_KEY },
        })) as SiteSetting | null;
    } catch (error) {
        console.error("[getSiteSettings]", error);
        return null;
    }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/**
 * Update site settings (upsert — create if not exists)
 */
export async function updateSiteSettings(
    data: SiteSettingUpdateInput
): Promise<ActionResult<SiteSetting>> {
    try {
        const settings = await prisma.siteSetting.upsert({
            where: { key: SETTINGS_KEY },
            update: data,
            create: { key: SETTINGS_KEY, ...data },
        });
        return { success: true, data: settings as SiteSetting };
    } catch (error) {
        console.error("[updateSiteSettings]", error);
        return { success: false, error: "Gagal mengupdate pengaturan website. Periksa koneksi database." };
    }
}
