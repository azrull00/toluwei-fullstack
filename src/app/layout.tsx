import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Toluwei – Daging Babi Segar & Olahan | Wudi, Sumba Timur",
    template: "%s | Toluwei",
  },
  description:
    "Toluwei menyediakan daging babi segar berkualitas dan berbagai produk olahan babi terbaik di Wudi, Sumba Timur. Pesan sekarang!",
  keywords: [
    "daging babi Sumba Timur",
    "olahan babi Toluwei",
    "daging babi segar Wudi",
    "babi Sumba",
    "toko daging babi NTT",
  ],
  icons: {
    icon: [
      { url: "/toluwei.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/toluwei.jpg", type: "image/jpeg" },
    ],
    shortcut: "/toluwei.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
