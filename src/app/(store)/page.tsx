import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GemIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { StarRating } from "@/components/star-rating";
import { getAllProducts } from "@/lib/products-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getAllProducts();
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-secondary">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="order-2 md:order-1">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
              New Season Edit
            </p>
            <h1 className="text-4xl font-serif tracking-tight text-brand-primary md:text-6xl">
              Timeless pieces,
              <br />
              quietly extraordinary.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
              18k gold vermeil jewelry designed for everyday layering — pearls, fine chain,
              and sculptural forms made to be worn together, or alone.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">
                Shop All Jewelry
                <ArrowRightIcon className="size-3.5" />
              </Link>
              <Link href="/shop?category=necklaces" className="btn-outline">
                Shop Necklaces
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-black/10 pt-6">
              <div>
                <dt className="text-xs text-brand-muted">Rated</dt>
                <dd className="font-serif text-lg text-brand-primary">4.8 / 5</dd>
              </div>
              <div>
                <dt className="text-xs text-brand-muted">Reviews</dt>
                <dd className="font-serif text-lg text-brand-primary">1,000+</dd>
              </div>
              <div>
                <dt className="text-xs text-brand-muted">Warranty</dt>
                <dd className="font-serif text-lg text-brand-primary">Lifetime</dd>
              </div>
            </dl>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/products/horizon-bar-necklace/model.png"
                alt="Model wearing the Horizon Bar Necklace in 18k gold vermeil"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="container-page py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-serif text-brand-primary md:text-3xl">Shop by Category</h2>
          <Link
            href="/shop"
            className="hidden text-xs font-semibold uppercase tracking-widest text-brand-primary underline underline-offset-4 hover:text-brand-accent-hover sm:inline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <CategoryCard
            href="/shop?category=necklaces"
            label="Necklaces"
            count="4 Styles"
            image="/products/pearl-pendant-necklace/flat.png"
          />
          <CategoryCard
            href="/shop?category=bracelets"
            label="Bracelets"
            count="4 Styles"
            image="/products/luna-pearl-bracelet/flat.png"
          />
          <CategoryCard
            href="/shop?category=rings"
            label="Rings"
            count="1 Style"
            image="/products/trio-band-ring/model.png"
          />
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-surface-card py-16 md:py-24">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
                Customer Favorites
              </p>
              <h2 className="text-2xl font-serif text-brand-primary md:text-3xl">The Bestsellers</h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-xs font-semibold uppercase tracking-widest text-brand-primary underline underline-offset-4 hover:text-brand-accent-hover sm:inline"
            >
              Shop All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship story */}
      <section className="container-page py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-card">
            <Image
              src="/products/eternal-knot-cuff/flat.png"
              alt="Eternal Knot Cuff detail shot"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
              Our Craft
            </p>
            <h2 className="text-3xl font-serif tracking-tight text-brand-primary md:text-4xl">
              Crafted to be worn, not stored away.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
              Every piece begins in 18k gold vermeil over sterling silver — dense enough to
              hold its shine through daily wear, layered thick enough to outlast trends. We
              pair it with genuine freshwater pearls and natural stone, hand-finished and
              quality-checked before it ever reaches you.
            </p>
            <div className="mt-8 h-px w-16 bg-brand-accent" />
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <GemIcon className="size-5 shrink-0 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-brand-primary">Genuine Materials</p>
                  <p className="text-sm text-brand-muted">
                    18k gold vermeil, freshwater pearls, and natural stone — never plated brass.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldIcon className="size-5 shrink-0 text-brand-accent" />
                <div>
                  <p className="text-sm font-medium text-brand-primary">Lifetime Warranty</p>
                  <p className="text-sm text-brand-muted">
                    Free repairs and replating for the life of every piece.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-brand-secondary py-16 md:py-24">
          <div className="container-page">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
                  Just Landed
                </p>
                <h2 className="text-2xl font-serif text-brand-primary md:text-3xl">New Arrivals</h2>
              </div>
              <Link
                href="/shop"
                className="hidden text-xs font-semibold uppercase tracking-widest text-brand-primary underline underline-offset-4 hover:text-brand-accent-hover sm:inline"
              >
                Shop All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="container-page py-16 text-center md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <StarRating rating={5} size="size-5" />
          </div>
          <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-brand-primary md:text-3xl">
            &ldquo;I&rsquo;ve worn my Aurora pendant every day for three months — it still
            looks brand new. The kind of jewelry that quietly does its job.&rdquo;
          </blockquote>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-muted">
            Sofía R. — Verified Buyer
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-gray-100 bg-surface-card">
        <div className="container-page grid grid-cols-1 gap-8 py-12 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <TruckIcon className="size-6 text-brand-accent" />
            <div>
              <p className="text-sm font-medium text-brand-primary">Free Shipping</p>
              <p className="text-xs text-brand-muted">On all orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldIcon className="size-6 text-brand-accent" />
            <div>
              <p className="text-sm font-medium text-brand-primary">Lifetime Warranty</p>
              <p className="text-xs text-brand-muted">Free repairs, always</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GemIcon className="size-6 text-brand-accent" />
            <div>
              <p className="text-sm font-medium text-brand-primary">Genuine Materials</p>
              <p className="text-xs text-brand-muted">18k gold vermeil &amp; real pearl</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
