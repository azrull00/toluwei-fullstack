import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ToastContainer } from "@/components/ui/Toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Toluwei – Jual Daging Babi Segar & Olahan | Wudi, Sumba Timur",
    template: "%s | Toluwei – Daging Babi Sumba Timur",
  },

  description:
    "Toluwei jual daging babi segar berkualitas di Wudi, Sumba Timur, NTT. Tersedia babi potong, daging babi per kg, babi guling, sosis babi, dendeng babi, dan olahan babi siap saji. Harga terjangkau, higienis, antar ke lokasi. Pesan via WhatsApp sekarang!",

  keywords: [
    // ── Kata kunci utama (high intent) ──
    "jual daging babi Sumba Timur",
    "jual daging babi NTT",
    "jual babi Sumba Timur",
    "beli daging babi Sumba Timur",
    "daging babi segar Sumba Timur",
    "daging babi murah Sumba Timur",
    // ── Lokasi spesifik ──
    "daging babi Wudi",
    "daging babi Waingapu",
    "daging babi Sumba",
    "toko daging babi Sumba Timur",
    "supplier daging babi NTT",
    "penjual daging babi Sumba Timur",
    // ── Produk spesifik ──
    "babi potong Sumba Timur",
    "babi guling Sumba Timur",
    "sosis babi NTT",
    "dendeng babi Sumba",
    "olahan babi Sumba Timur",
    "daging babi per kg",
    "daging babi segar",
    "babi hidup Sumba Timur",
    // ── Kandang & ternak ──
    "kandang babi Sumba Timur",
    "ternak babi NTT",
    "peternak babi Sumba Timur",
    "peternakan babi Wudi",
    "babi lokal Sumba",
    // ── Brand ──
    "Toluwei",
    "Tolu Wei daging babi",
    "Toluwei Sumba Timur",
    "Toluwei Wudi",
    // ── Long-tail ──
    "pesan daging babi via WhatsApp Sumba Timur",
    "daging babi antar ke rumah Sumba Timur",
    "harga daging babi Sumba Timur",
  ],

  metadataBase: new URL("https://toluwei.biz.id"),
  alternates: {
    canonical: "https://toluwei.biz.id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://toluwei.biz.id",
    siteName: "Toluwei",
    title: "Toluwei – Jual Daging Babi Segar & Olahan Terbaik di Sumba Timur",
    description:
      "Jual daging babi segar dan olahan babi berkualitas di Wudi, Sumba Timur, NTT. Babi potong, daging per kg, babi guling, sosis, dendeng. Harga terjangkau, antar ke lokasi. Hubungi via WhatsApp!",
    images: [
      {
        url: "https://toluwei.biz.id/toluwei.jpg",
        width: 800,
        height: 800,
        alt: "Toluwei – Jual Daging Babi Segar Sumba Timur NTT",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Toluwei – Jual Daging Babi Segar & Olahan | Sumba Timur",
    description:
      "Jual daging babi segar dan olahan babi terbaik di Wudi, Sumba Timur, NTT. Pesan via WhatsApp!",
    images: ["https://toluwei.biz.id/toluwei.jpg"],
  },

  icons: {
    icon: [
      { url: "/toluwei.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/toluwei.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [{ url: "/toluwei.jpg", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/toluwei.jpg",
  },

  authors: [{ name: "Toluwei", url: "https://toluwei.biz.id" }],
  creator: "Toluwei",
  publisher: "Toluwei",
  applicationName: "Toluwei",
  category: "food",

  // Verifikasi Google Search Console — isi setelah daftar di GSC
  verification: { google: "google-site-verification=tkMKkupAEG5RJz8cBau0DAILW6_qobqKMLbCQ-LeeBw" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* ── JSON-LD: LocalBusiness + FoodEstablishment ──────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "FoodEstablishment", "Store"],
              "@id": "https://toluwei.biz.id/#business",
              name: "Toluwei",
              alternateName: ["Tolu Wei", "Toluwei Daging Babi", "Peternakan Toluwei"],
              description:
                "Toluwei adalah usaha jual daging babi segar dan olahan babi berkualitas di Wudi, Sumba Timur, NTT. Tersedia babi potong, daging per kg, babi guling, sosis babi, dendeng babi, dan produk olahan siap saji.",
              url: "https://toluwei.biz.id",
              logo: "https://toluwei.biz.id/toluwei.jpg",
              image: "https://toluwei.biz.id/toluwei.jpg",
              telephone: "+6281399263555",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Wudi, Kec. Wulla Waijelu",
                addressLocality: "Wudi",
                addressRegion: "Sumba Timur",
                postalCode: "87272",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-9.6567",
                longitude: "120.2641",
              },
              areaServed: [
                { "@type": "City", name: "Waingapu" },
                { "@type": "AdministrativeArea", name: "Sumba Timur" },
                { "@type": "AdministrativeArea", name: "Nusa Tenggara Timur" },
              ],
              servesCuisine: "Indonesian",
              priceRange: "Rp - Rp Rp",
              currenciesAccepted: "IDR",
              paymentAccepted: "Cash, Transfer Bank",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                  opens: "06:00",
                  closes: "18:00",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Katalog Produk Toluwei",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Daging Babi Segar",
                      description: "Daging babi segar pilihan dari peternakan lokal Sumba Timur",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Babi Potong",
                      description: "Babi potong segar siap masak dari Wudi, Sumba Timur",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Olahan Babi",
                      description: "Produk olahan babi: sosis babi, dendeng babi, babi guling",
                    },
                  },
                ],
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61575297768",
                "https://www.instagram.com/toluwei",
              ],
            }),
          }}
        />
        {/* ── JSON-LD: BreadcrumbList ──────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Beranda",
                  item: "https://toluwei.biz.id",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Katalog Produk",
                  item: "https://toluwei.biz.id/katalog",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <GoogleAnalytics />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
