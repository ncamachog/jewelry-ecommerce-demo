import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { categoryLabels, type Category } from "@/lib/products";
import { getAllProducts } from "@/lib/products-store";

export const metadata: Metadata = {
  title: "Shop All Jewelry — Valkiria",
};

const categories: Category[] = ["necklaces", "bracelets", "rings"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.includes(category as Category)
    ? (category as Category)
    : undefined;

  const products = await getAllProducts();
  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
          The Collection
        </p>
        <h1 className="text-3xl font-serif text-brand-primary md:text-4xl">
          {activeCategory ? categoryLabels[activeCategory] : "All Jewelry"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} — 18k gold vermeil,
          designed to layer and last.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className={`border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
            !activeCategory
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-gray-300 text-brand-primary hover:border-brand-primary"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${cat}`}
            className={`border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              activeCategory === cat
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-gray-300 text-brand-primary hover:border-brand-primary"
            }`}
          >
            {categoryLabels[cat]}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
