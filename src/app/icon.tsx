// app/icon.tsx — Next.js 15 App Router Favicon Generator
// File ini secara otomatis generate /favicon.ico dan icon set
// menggunakan ImageResponse API bawaan Next.js.
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

import { ImageResponse } from "next/og";

// ── Ukuran icon yang di-generate ──────────────────────────────────────────────
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// ── Render icon ───────────────────────────────────────────────────────────────
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: "50%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://toluwei.vercel.app/toluwei.jpg"
          alt="Toluwei"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
