import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Izinkan semua remote URL (https) dan localhost
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
    // Izinkan data: URI untuk gambar Base64 yang disimpan di DB
    dangerouslyAllowSVG: false,
    unoptimized: false,
  },
  // Naikkan batas body Server Action untuk menampung Base64 image (~2MB file → ~2.7MB Base64)
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
