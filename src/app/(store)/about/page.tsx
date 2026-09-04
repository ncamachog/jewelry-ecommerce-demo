import Image from "next/image";
import type { Metadata } from "next";
import { GemIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Our Story — Valkiria" };

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-secondary py-16 text-center md:py-24">
        <div className="container-page">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent-hover">
            Our Story
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-serif tracking-tight text-brand-primary md:text-5xl">
            Jewelry made for real, everyday life.
          </h1>
        </div>
      </section>

      <section className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-card">
          <Image
            src="/products/jade-talisman-bracelet/flat.png"
            alt="Jade Talisman Bracelet detail"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-brand-primary md:text-3xl">
            Founded on a simple idea
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted md:text-base">
            Valkiria started with a frustration: fine jewelry that couldn&rsquo;t survive a
            shower, a swim, or a long week of wear. We set out to build a small, considered
            collection — 18k gold vermeil, genuine pearl and stone — designed to disappear
            into daily life rather than sit in a drawer.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
            Every piece is hand-finished and quality-checked before it ships, backed by a
            lifetime warranty because we build things to be worn, not replaced.
          </p>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-surface-card py-16 md:py-24">
        <div className="container-page grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3">
            <GemIcon className="size-7 text-brand-accent" />
            <p className="text-sm font-medium text-brand-primary">Genuine Materials</p>
            <p className="max-w-xs text-sm text-brand-muted">
              18k gold vermeil, freshwater pearls, and natural stone in every piece.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ShieldIcon className="size-7 text-brand-accent" />
            <p className="text-sm font-medium text-brand-primary">Lifetime Warranty</p>
            <p className="max-w-xs text-sm text-brand-muted">
              Free repairs and replating for as long as you own the piece.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <TruckIcon className="size-7 text-brand-accent" />
            <p className="text-sm font-medium text-brand-primary">Complimentary Shipping</p>
            <p className="max-w-xs text-sm text-brand-muted">
              Free on every order over $150, with gift-ready packaging always included.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
