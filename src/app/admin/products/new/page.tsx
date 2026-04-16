export const dynamic = "force-dynamic";

import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Tambah Produk — Toluwei Admin" };

export default function NewProductPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="text-stone-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Tambah Produk Baru</h1>
                    <p className="text-stone-500 text-sm mt-0.5">Isi form di bawah untuk menambahkan produk</p>
                </div>
            </div>

            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <ProductForm />
            </div>
        </div>
    );
}
