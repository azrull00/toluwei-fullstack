import { PrismaClient } from "@prisma/client";

// ─── Singleton Prisma Client ─────────────────────────────────────────────────
// FIX: Simpan instance di globalThis untuk SEMUA environment (dev & production).
// Tanpa ini, setiap Vercel serverless invocation membuat PrismaClient baru
// yang menghabiskan connection pool Neon (max 5–10 koneksi di free tier).
//
// Referensi: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

// Selalu simpan instance di globalThis — baik dev maupun production.
globalForPrisma.prisma = prisma;
