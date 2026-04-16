import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { HowToOrderSection } from "@/components/sections/HowToOrderSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteSettings } from "@/services/site-setting.service";
import { getPublishedProducts } from "@/services/product.service";

export const metadata: Metadata = {
    title: "Toluwei – Jual Daging Babi Segar & Olahan | Wudi, Sumba Timur",
    description:
        "Toluwei jual daging babi segar berkualitas di Wudi, Sumba Timur, NTT. Tersedia babi potong, daging babi per kg, babi guling, sosis babi, dendeng babi. Harga terjangkau, higienis, antar ke lokasi. Pesan via WhatsApp sekarang!",
    keywords: [
        "jual daging babi Sumba Timur",
        "jual babi Sumba Timur",
        "daging babi segar Wudi",
        "babi potong Sumba Timur",
        "babi guling Sumba Timur",
        "sosis babi NTT",
        "dendeng babi Sumba",
        "olahan babi Toluwei",
        "toko daging babi NTT",
        "harga daging babi Sumba Timur",
        "daging babi Waingapu",
        "peternakan babi Sumba Timur",
        "daging babi",
        "babi",
        "Toluwei",
    ],
    alternates: { canonical: "https://toluwei.biz.id" },
    openGraph: {
        title: "Toluwei – Jual Daging Babi Segar & Olahan | Sumba Timur",
        description: "Jual daging babi segar dan olahan babi berkualitas dari Wudi, Sumba Timur, NTT. Pesan via WhatsApp!",
        type: "website",
        locale: "id_ID",
        url: "https://toluwei.biz.id",
        images: [{ url: "https://toluwei.biz.id/toluwei.jpg", width: 800, height: 800, alt: "Toluwei Daging Babi Sumba Timur" }],
    },
};

export default async function LandingPage() {
    const [settings, products] = await Promise.all([
        getSiteSettings(),
        getPublishedProducts(),
    ]);

    return (
        <>
            <HeroSection settings={settings} />
            <WhyChooseUsSection />
            <ProductsSection products={products} />
            <HowToOrderSection />
            <AboutSection settings={settings} />
            <ContactSection settings={settings} />
        </>
    );
}
