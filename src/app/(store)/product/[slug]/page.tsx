import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryLabels, formatPrice, getRelatedProducts } from "@/lib/products";
import { getAllProducts, getProductBySlug } from "@/lib/products-store";
import { ProductGallery } from "@/components/product-gallery";
import { ProductActions } from "@/components/product-actions";
import { StarRating } from "@/components/star-rating";
import { Accordion } from "@/components/accordion";
import { ProductCard } from "@/components/product-card";
import { ShieldIcon, TruckIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Valkiria`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const images = [product.images.model, product.images.flat].filter(
    (src, i, arr): src is string => Boolean(src) && arr.indexOf(src) === i,
  );
  const allProducts = await getAllProducts();
  const related = getRelatedProducts(allProducts, product);

  return (
    <div className="container-page py-10 md:py-16">
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-primary">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-primary">
          {categoryLabels[product.category]}
        </Link>
        <span>/</span>
        <span className="text-brand-primary">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={images} name={product.name} />

        <div className="max-w-xl">
          {(product.bestseller || product.isNew) && (
            <span className="mb-3 inline-block bg-brand-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
              {product.bestseller ? "Bestseller" : "New Arrival"}
            </span>
          )}
          <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="size-4" />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-brand-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-brand-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-brand-muted md:text-base">
            {product.description}
          </p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
            {product.material}
          </p>

          <div className="mt-8">
            <ProductActions product={product} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <TruckIcon className="size-5 shrink-0 text-brand-accent" />
              <p className="text-xs text-brand-muted">
                Free shipping on orders over $150
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShieldIcon className="size-5 shrink-0 text-brand-accent" />
              <p className="text-xs text-brand-muted">Lifetime warranty included</p>
            </div>
          </div>

          <div className="mt-8">
            <Accordion
              items={[
                {
                  title: "Details",
                  content: (
                    <ul className="list-disc space-y-1.5 pl-4">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Shipping & Returns",
                  content: (
                    <p>
                      Free standard shipping on all orders over $150 (3–5 business days).
                      Every piece ships in a signature gift box, ready to give. Not the right
                      fit? Return unworn items within 30 days for a full refund.
                    </p>
                  ),
                },
                {
                  title: "Jewelry Care",
                  content: (
                    <p>
                      Store in the pouch provided, away from moisture and direct sunlight.
                      Remove before swimming, showering, or applying perfume and lotion to
                      keep the finish looking new for years.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="mb-8 text-2xl font-serif text-brand-primary md:text-3xl">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
