import type { Metadata } from "next";
import { getPublishedProducts } from "@/services/product.service";
import { KatalogClient } from "./KatalogClient";    

export const metadata: Metadata = {
    title: "Katalog Produk – Toluwei | Daging Babi Segar & Olahan",
    description:
        "Lihat seluruh katalog produk Toluwei — daging babi segar pilihan dan berbagai produk olahan berkualitas dari Wudi, Sumba Timur. Lengkap dengan harga.",
    keywords: [
        "katalog daging babi",
        "harga daging babi Sumba Timur",
        "produk olahan babi Toluwei",
        "daftar harga Toluwei",
    ],
    openGraph: {
        title: "Katalog Produk Toluwei – Daging Segar & Olahan Terbaik",
        description:
            "Katalog lengkap produk Toluwei beserta harga. Pesan via WhatsApp sekarang!",
        type: "website",
        locale: "id_ID",
    },
};

export default async function KatalogPage() {
    const products = await getPublishedProducts();
    return <KatalogClient products={products} />;
}
