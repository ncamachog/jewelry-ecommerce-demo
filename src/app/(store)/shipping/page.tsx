import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & Returns — Valkiria" };

export default function ShippingPage() {
  return (
    <div className="container-page max-w-2xl py-16 md:py-24">
      <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">Shipping &amp; Returns</h1>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-brand-muted md:text-base">
        <div>
          <h2 className="mb-2 font-serif text-xl text-brand-primary">Shipping</h2>
          <p>
            Orders ship within 1–2 business days. Standard shipping (3–5 business days) is free
            on all orders over $150, and $12 for orders below that. Every order arrives in
            signature gift packaging, ready to give.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-serif text-xl text-brand-primary">Returns</h2>
          <p>
            Not the right fit? Unworn items in original packaging can be returned within 30
            days of delivery for a full refund. Personalized or engraved pieces are final sale.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-serif text-xl text-brand-primary">Warranty</h2>
          <p>
            Every Valkiria piece includes a lifetime warranty covering manufacturing defects,
            including free repairs and replating.
          </p>
        </div>
      </div>
    </div>
  );
}
