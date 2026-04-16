import type { NavItem } from "@/types";

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
    name: "Toluwei",
    tagline: "Daging Babi Segar & Olahan Terbaik",
    location: "Wudi, Sumba Timur, NTT",
    phone: "+62 878-0652-1849",
    whatsapp: "6287806521849",
    address: "Wudi, Kec. Wulla Waijelu, Sumba Timur, NTT 87272",
    email: "info@toluwei.com",
} as const;

// ─── Multi-Admin WhatsApp ─────────────────────────────────────────────────────
export const WA_ADMINS = [
    {
        id: "admin1",
        name: "Admin 1",
        phone: "+62 813-9926-3555",
        whatsapp: "6281399263555",
    },
    {
        id: "admin2",
        name: "Admin 2",
        phone: "+62 822-4719-4435",
        whatsapp: "6282247194435",
    },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS: NavItem[] = [
    { label: "Beranda", href: "#home" },
    { label: "Produk", href: "#produk" },
    { label: "Katalog", href: "/katalog" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Kontak", href: "#kontak" },
];

// ─── Product ──────────────────────────────────────────────────────────────────
export const PRODUCT_TYPES = {
    SEGAR: "Daging Segar",
    OLAHAN: "Produk Olahan",
} as const;

// ─── Format ───────────────────────────────────────────────────────────────────
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
/** Single-admin URL (legacy — masih dipakai di beberapa tempat) */
export function getWhatsAppUrl(message?: string, waNumber?: string): string {
    const number = waNumber ?? WA_ADMINS[0].whatsapp;
    const text = message ?? `Halo Toluwei, saya ingin memesan produk Anda.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Build WA URL for a specific admin */
export function getAdminWhatsAppUrl(adminId: "admin1" | "admin2", message?: string): string {
    const admin = WA_ADMINS.find((a) => a.id === adminId) ?? WA_ADMINS[0];
    const text = message ?? `Halo Toluwei, saya ingin memesan produk Anda.`;
    return `https://wa.me/${admin.whatsapp}?text=${encodeURIComponent(text)}`;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export const ADMIN_NAV = [
    { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { label: "Kelola Produk", href: "/admin/products", icon: "Package" },
    { label: "Kelola Konten", href: "/admin/content", icon: "FileText" },
] as const;
