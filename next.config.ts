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
  // Naikkan batas body Server Action untuk menampung Base64 image
  // 3.3MB file → ~4.4MB Base64 → butuh body limit minimal 5MB
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
