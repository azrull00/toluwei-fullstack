export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/services/product.service";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
    params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Produk — Toluwei Admin" };

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) notFound();

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="text-stone-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Edit Produk</h1>
                    <p className="text-stone-500 text-sm mt-0.5">{product.name}</p>
                </div>
            </div>

            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <ProductForm product={product} />
            </div>
        </div>
    );
}
