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
export function getWhatsAppUrl(message?: string): string {
    const text = message ?? `Halo Toluwei, saya ingin memesan produk Anda.`;
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export const ADMIN_NAV = [
    { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { label: "Kelola Produk", href: "/admin/products", icon: "Package" },
    { label: "Kelola Konten", href: "/admin/content", icon: "FileText" },
] as const;
