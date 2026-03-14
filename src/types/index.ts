// ─── Product ──────────────────────────────────────────────────────────────────
export type ProductType = "SEGAR" | "OLAHAN";

export interface Product {
    id: string;
    name: string;
    description: string | null;
    type: ProductType;
    price: number;
    unit: string;
    imageUrl: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductCreateInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
export type ProductUpdateInput = Partial<ProductCreateInput>;

// ─── SiteSetting ──────────────────────────────────────────────────────────────
export interface SiteSetting {
    id: string;
    key: string;
    heroTitle: string | null;
    heroSubtitle: string | null;
    heroImageUrl: string | null;
    heroCta: string | null;
    aboutTitle: string | null;
    aboutDescription: string | null;
    aboutImageUrl: string | null;
    contactPhone: string | null;
    contactAddress: string | null;
    contactMaps: string | null;
}

export type SiteSettingUpdateInput = Partial<
    Omit<SiteSetting, "id" | "key">
>;

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Generic Responses ────────────────────────────────────────────────────────
export interface ActionResult<T = void> {
    success: boolean;
    data?: T;
    error?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
    label: string;
    href: string;
}
