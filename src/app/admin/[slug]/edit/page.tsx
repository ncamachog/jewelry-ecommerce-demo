import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/products-store";

export const metadata: Metadata = { title: "Edit Product — Admin — Valkiria" };
export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <AdminShell>
      <h1 className="mb-1 font-serif text-2xl text-brand-primary md:text-3xl">
        Edit Product
      </h1>
      <p className="mb-8 text-sm text-brand-muted">{product.name}</p>
      <ProductForm product={product} />
    </AdminShell>
  );
}
