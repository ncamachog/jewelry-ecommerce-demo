"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

export default function CartPage() {
  const { lines, subtotal, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-5 py-24 text-center">
        <h1 className="font-serif text-3xl text-brand-primary">Your Bag is Empty</h1>
        <p className="text-sm text-brand-muted">
          Looks like you haven&rsquo;t added anything yet.
        </p>
        <Link href="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const shippingEstimate = subtotal >= 150 ? 0 : 12;

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="mb-10 font-serif text-3xl text-brand-primary md:text-4xl">Your Bag</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-100 border-y border-gray-100">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-5 py-6">
                <Link
                  href={`/product/${line.slug}`}
                  className="relative size-28 shrink-0 overflow-hidden bg-surface-card sm:size-32"
                >
                  <Image src={line.image} alt={line.name} fill sizes="128px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${line.slug}`} className="font-serif text-lg text-brand-primary">
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-brand-muted">{line.material}</p>
                    </div>
                    <span className="text-sm font-medium text-brand-primary">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="p-2 text-brand-primary hover:text-brand-accent-hover"
                        onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                      >
                        <MinusIcon className="size-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="p-2 text-brand-primary hover:text-brand-accent-hover"
                        onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                      >
                        <PlusIcon className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-primary"
                      onClick={() => removeItem(line.slug)}
                    >
                      <TrashIcon className="size-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="mt-6 inline-block text-xs font-semibold uppercase tracking-widest text-brand-primary underline underline-offset-4"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="h-fit border border-gray-100 bg-surface-card p-6">
          <h2 className="font-serif text-xl text-brand-primary">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
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
            {subtotal < 150 && (
              <p className="text-xs text-brand-accent-hover">
                Add {formatPrice(150 - subtotal)} more for free shipping.
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-between border-t border-gray-200 pt-5 text-base font-medium text-brand-primary">
            <span>Total</span>
            <span>{formatPrice(subtotal + shippingEstimate)}</span>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
