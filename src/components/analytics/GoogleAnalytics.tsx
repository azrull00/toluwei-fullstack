// ─── Google Analytics 4 — Next.js 15 Best Practice ───────────────────────────
// Menggunakan next/script dengan strategy="afterInteractive" agar tidak
// memblokir rendering halaman dan tidak menurunkan skor Lighthouse.
//
// Setup:
//   1. Tambahkan NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX di .env.local dan Vercel env vars
//   2. Komponen ini otomatis tidak render jika GA_ID tidak di-set (aman di dev)

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
    // Jangan render apapun jika GA_ID belum dikonfigurasi
    if (!GA_ID) return null;

    return (
        <>
            {/* Load gtag.js setelah halaman interaktif — tidak blokir LCP/FID */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                        page_path: window.location.pathname,
                        send_page_view: true
                    });
                `}
            </Script>
        </>
    );
}
