import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Mulai seeding database Toluwei...");

    // ─── Reset existing data ──────────────────────────────────────────────────
    await prisma.siteSetting.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // ─── Admin User ───────────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
        data: {
            name: "Admin Toluwei",
            email: "admin@toluwei.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });
    console.log("✅ Admin user dibuat: admin@toluwei.com / admin123");

    // ─── Products ─────────────────────────────────────────────────────────────
    const products = [
        {
            name: "Daging Babi Segar (Has Dalam)",
            description:
                "Potongan has dalam babi segar pilihan, ideal untuk semua jenis masakan. Tekstur lembut dan kaya rasa.",
            type: "SEGAR",
            price: 85000,
            unit: "kg",
            isPublished: true,
        },
        {
            name: "Daging Babi Segar (Iga/Spareribs)",
            description:
                "Iga babi segar cocok untuk sup, bakar, atau olahan rica-rica. Dagingnya tebal dan berasa gurih.",
            type: "SEGAR",
            price: 75000,
            unit: "kg",
            isPublished: true,
        },
        {
            name: "Daging Babi Segar (Perut/Belly)",
            description:
                "Daging perut babi segar dengan lapisan lemak seimbang. Sempurna untuk rendang, semur, atau dipanggang.",
            type: "SEGAR",
            price: 80000,
            unit: "kg",
            isPublished: true,
        },
        {
            name: "Kepala Babi",
            description:
                "Kepala babi segar lengkap, cocok untuk berbagai masakan tradisional Sumba dan NTT.",
            type: "SEGAR",
            price: 250000,
            unit: "ekor",
            isPublished: true,
        },
        {
            name: "Sosis Babi Asap Toluwei",
            description:
                "Sosis babi asap buatan tangan dengan bumbu rempah khas Toluwei. Rasa autentik dan tahan lama.",
            type: "OLAHAN",
            price: 65000,
            unit: "250g",
            isPublished: true,
        },
        {
            name: "Dendeng Babi Toluwei",
            description:
                "Dendeng babi tipis dengan bumbu manis-pedas khas Sumba. Cocok sebagai lauk atau camilan.",
            type: "OLAHAN",
            price: 120000,
            unit: "250g",
            isPublished: true,
        },
        {
            name: "Babi Guling Utuh (Pesanan)",
            description:
                "Babi guling utuh ready-to-cook, sudah dibumbui lengkap dengan rempah Sumba Timur. Pesan minimal 1 hari sebelumnya.",
            type: "OLAHAN",
            price: 1500000,
            unit: "ekor",
            isPublished: true,
        },
        {
            name: "Lemak Babi (Gajih)",
            description:
                "Gajih babi segar untuk diolah menjadi minyak babi atau campuran masakan.",
            type: "SEGAR",
            price: 30000,
            unit: "kg",
            isPublished: false,
        },
    ];

    await prisma.product.createMany({ data: products });
    console.log(`✅ ${products.length} produk berhasil dibuat`);

    // ─── Site Settings ────────────────────────────────────────────────────────
    await prisma.siteSetting.create({
        data: {
            key: "main",
            heroTitle: "Daging Babi Segar & Olahan Terbaik di Sumba Timur",
            heroSubtitle:
                "Toluwei menghadirkan produk daging babi berkualitas langsung dari Wudi, Sumba Timur. Segar, higienis, dan lezat untuk setiap sajian.",
            heroCta: "Lihat Produk Kami",
            aboutTitle: "Tentang Toluwei",
            aboutDescription:
                "Toluwei adalah usaha keluarga yang berdiri di Wudi, Kabupaten Sumba Timur, Nusa Tenggara Timur. Kami menyediakan daging babi segar berkualitas tinggi dan berbagai produk olahan babi dengan cita rasa autentik. Setiap produk kami diproses dengan higienis dan penuh perhatian untuk memastikan kepuasan pelanggan.",
            contactPhone: "+62 812-3456-7890",
            contactAddress: "Wudi, Kec. Wulla Waijelu, Sumba Timur, NTT 87272",
            contactMaps:
                "https://www.google.com/maps/search/?api=1&query=Wudi+Sumba+Timur+NTT",
        },
    });
    console.log("✅ Site settings dibuat");

    console.log("\n🎉 Seeding selesai!");
    console.log("───────────────────────────────────────");
    console.log("Login Admin: admin@toluwei.com");
    console.log("Password  : admin123");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
