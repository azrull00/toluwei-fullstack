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
    title: "Toluwei – Daging Babi Segar & Olahan | Wudi, Sumba Timur",
    description:
        "Toluwei menyediakan daging babi segar berkualitas dan berbagai produk olahan babi terbaik di Wudi, Sumba Timur. Pesan via WhatsApp sekarang!",
    keywords: [
        "daging babi Sumba Timur", "olahan babi Toluwei", "daging babi segar Wudi",
        "babi guling Sumba", "sosis babi NTT", "dendeng babi Sumba", "toko daging babi NTT","daging babi","babi"
    ],
    openGraph: {
        title: "Toluwei – Daging Babi Segar & Olahan",
        description: "Produk daging babi segar dan olahan berkualitas dari Wudi, Sumba Timur, NTT.",
        type: "website",
        locale: "id_ID",
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
