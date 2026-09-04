"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0 && !submitting) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-5 py-24 text-center">
        <h1 className="font-serif text-3xl text-brand-primary">Your Bag is Empty</h1>
        <p className="text-sm text-brand-muted">Add something beautiful before checking out.</p>
        <Link href="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const shippingEstimate = subtotal >= 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingEstimate + tax;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderNumber = `VLK-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    router.push(`/order-confirmation?order=${orderNumber}`);
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="mb-10 font-serif text-3xl text-brand-primary md:text-4xl">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-2">
          <fieldset>
            <legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Contact
            </legend>
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
            />
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Shipping Address
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="First name"
                className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
              <input
                required
                placeholder="Last name"
                className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
              <input
                required
                placeholder="Address"
                className="sm:col-span-2 border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
              <input
                required
                placeholder="City"
                className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
              <input
                required
                placeholder="Postal code"
                className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Payment
            </legend>
            <div className="space-y-4">
              <input
                required
                placeholder="Card number"
                inputMode="numeric"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="MM / YY"
                  className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
                />
                <input
                  required
                  placeholder="CVC"
                  inputMode="numeric"
                  className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-brand-muted">
              This is a demo storefront — no real payment will be processed.
            </p>
          </fieldset>

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Placing Order…" : `Place Order — ${formatPrice(total)}`}
          </button>
        </form>

        <div className="h-fit border border-gray-100 bg-surface-card p-6">
          <h2 className="mb-5 font-serif text-xl text-brand-primary">Order Summary</h2>
          <ul className="space-y-4">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden bg-surface-base">
                  <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] text-white">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <p className="text-sm text-brand-primary">{line.name}</p>
                  <p className="text-sm text-brand-muted">{formatPrice(line.price * line.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm">
            <div className="flex justify-between text-brand-muted">
              <span>Subtotal</span>
              <span className="text-brand-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Shipping</span>
              <span className="text-brand-primary">
                {shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}
              </span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Estimated Tax</span>
              <span className="text-brand-primary">{formatPrice(tax)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-medium text-brand-primary">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
