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
  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Toluwei – Daging Babi Segar & Olahan | Wudi, Sumba Timur",
    template: "%s | Toluwei",
  },

  // ── Description ────────────────────────────────────────────────────────────
  description:
    "Toluwei menyediakan daging babi segar berkualitas dan berbagai produk olahan babi terbaik di Wudi, Sumba Timur, NTT. Tersedia babi potong, daging babi per kg, dan olahan babi siap saji. Pesan sekarang via WhatsApp!",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    // Lokasi spesifik
    "daging babi Sumba Timur",
    "daging babi Wudi",
    "daging babi NTT",
    "babi potong Sumba",
    "toko daging babi Sumba Timur",
    // Produk utama
    "daging babi segar",
    "daging babi per kg",
    "babi potong",
    "babi guling",
    "olahan babi",
    "daging babi olahan",
    // Kandang & ternak
    "kandang babi Sumba Timur",
    "ternak babi NTT",
    "peternak babi Sumba",
    "jual babi hidup",
    "babi lokal Sumba",
    // Brand
    "Toluwei",
    "Toluwei daging babi",
    "Toluwei Sumba",
  ],

  // ── Canonical & Robots ─────────────────────────────────────────────────────
  metadataBase: new URL("https://toluwei.vercel.app"),
  alternates: {
    canonical: "/",
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

  // ── Open Graph (Facebook, WhatsApp preview) ────────────────────────────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://toluwei.vercel.app",
    siteName: "Toluwei",
    title: "Toluwei – Daging Babi Segar & Olahan Terbaik di Sumba Timur",
    description:
      "Supplier daging babi segar dan olahan babi berkualitas di Wudi, Sumba Timur. Babi potong, daging per kg, dan produk olahan siap saji. Hubungi kami via WhatsApp!",
    images: [
      {
        url: "/toluwei.jpg",
        width: 400,
        height: 400,
        alt: "Toluwei – Logo daging babi Sumba Timur",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary",
    title: "Toluwei – Daging Babi Segar & Olahan | Sumba Timur",
    description:
      "Supplier daging babi segar dan olahan babi terbaik di Wudi, Sumba Timur, NTT.",
    images: ["/toluwei.jpg"],
  },

  // ── Icons / Favicon ────────────────────────────────────────────────────────
  // File app/icon.tsx akan di-generate otomatis oleh Next.js App Router.
  // Entry di sini sebagai fallback untuk browser lama.
  icons: {
    icon: [
      { url: "/toluwei.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/toluwei.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [{ url: "/toluwei.jpg", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/toluwei.jpg",
  },

  // ── Author & Publisher ─────────────────────────────────────────────────────
  authors: [{ name: "Toluwei", url: "https://toluwei.vercel.app" }],
  creator: "Toluwei",
  publisher: "Toluwei",

  // ── App-specific ───────────────────────────────────────────────────────────
  applicationName: "Toluwei",
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* ── JSON-LD Schema — LocalBusiness ─────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Toluwei",
              description:
                "Supplier daging babi segar dan olahan babi berkualitas di Wudi, Sumba Timur, NTT.",
              url: "https://toluwei.vercel.app",
              logo: "https://toluwei.vercel.app/toluwei.jpg",
              image: "https://toluwei.vercel.app/toluwei.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wudi",
                addressRegion: "Sumba Timur",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-9.6567",
                longitude: "120.2641",
              },
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Sumba Timur, Nusa Tenggara Timur, Indonesia",
              },
              priceRange: "Rp",
              telephone: "",           // Isi nomor WA/telepon jika ada
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
                ],
                opens: "07:00",
                closes: "18:00",
              },
              sameAs: [],              // Tambah link media sosial jika ada
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
