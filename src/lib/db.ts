import { PrismaClient } from "@prisma/client";

// ─── Singleton Prisma Client ─────────────────────────────────────────────────
// Vercel Serverless: jangan buat instance baru di setiap cold-start.
// Pattern ini aman untuk Next.js (dev hot-reload & production serverless).

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
        // datasourceUrl di-override via env DATABASE_URL yang sudah
        // mengandung ?pgbouncer=true untuk kompatibilitas Neon PgBouncer.
        // directUrl (untuk migrasi Prisma) dikonfigurasi via DIRECT_URL di schema.
    });

// Simpan instance hanya di development agar tidak ada koneksi bocor saat hot-reload.
// Di production (Vercel), setiap function invocation mendapatkan instance segar.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
