import type { Metadata } from "next";
import { getPublishedProducts } from "@/services/product.service";
import { KatalogClient } from "./KatalogClient";    

export const metadata: Metadata = {
    title: "Katalog Produk – Toluwei | Jual Daging Babi Segar & Olahan Sumba Timur",
    description:
        "Katalog lengkap produk Toluwei — jual daging babi segar, babi potong, babi guling, sosis babi, dendeng babi, dan olahan babi berkualitas dari Wudi, Sumba Timur, NTT. Lihat harga dan pesan via WhatsApp!",
    keywords: [
        "katalog daging babi Sumba Timur",
        "harga daging babi Sumba Timur",
        "harga babi potong Sumba Timur",
        "jual daging babi per kg NTT",
        "produk olahan babi Toluwei",
        "daftar harga babi Sumba Timur",
        "beli daging babi online Sumba Timur",
        "daging babi segar Waingapu",
        "babi guling Sumba Timur",
        "sosis babi Sumba Timur",
    ],
    alternates: { canonical: "https://toluwei.vercel.app/katalog" },
    openGraph: {
        title: "Katalog Produk Toluwei – Jual Daging Babi Segar & Olahan Sumba Timur",
        description: "Katalog lengkap produk Toluwei beserta harga. Daging babi segar, babi potong, olahan babi. Pesan via WhatsApp!",
        type: "website",
        locale: "id_ID",
        url: "https://toluwei.vercel.app/katalog",
        images: [{ url: "https://toluwei.vercel.app/toluwei.jpg", width: 800, height: 800, alt: "Katalog Daging Babi Toluwei Sumba Timur" }],
    },
};

export default async function KatalogPage() {
    const products = await getPublishedProducts();
    return <KatalogClient products={products} />;
}
