import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { getAllProducts } from "@/lib/products-store";
import { categoryLabels, formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Admin — Valkiria" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-brand-primary md:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-brand-muted">{products.length} total</p>
        </div>
        <Link href="/admin/new" className="btn-primary">
          + New Product
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-surface-base">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-widest text-brand-muted">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.slug}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden bg-surface-card">
                      <Image
                        src={product.images.model ?? product.images.flat}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-brand-primary">{product.name}</p>
                      <p className="text-xs text-brand-muted">/{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-brand-muted">
                  {categoryLabels[product.category]}
                </td>
                <td className="px-4 py-3 text-brand-primary">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {product.bestseller && (
                      <span className="bg-brand-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-brand-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                        New
                      </span>
                    )}
                    {!product.bestseller && !product.isNew && (
                      <span className="text-xs text-brand-muted">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/${product.slug}/edit`}
                      className="text-xs font-semibold uppercase tracking-widest text-brand-primary hover:text-brand-accent-hover"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton slug={product.slug} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-brand-muted">
                  No products yet.{" "}
                  <Link href="/admin/new" className="underline">
                    Add your first one.
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
