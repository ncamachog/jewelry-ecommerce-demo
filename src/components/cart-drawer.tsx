"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { MinusIcon, PlusIcon, TrashIcon, XIcon } from "@/components/icons";

export function CartDrawer() {
  const { lines, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        className="animate-fade-in absolute inset-0 bg-black/40"
        onClick={closeCart}
      />
      <div className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface-base shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 className="font-serif text-xl">Your Bag ({lines.length})</h2>
          <button type="button" aria-label="Close cart" onClick={closeCart}>
            <XIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-brand-muted">Your bag is empty.</p>
            <Link href="/shop" onClick={closeCart} className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-gray-100">
                {lines.map((line) => (
                  <li key={line.slug} className="flex gap-4 py-4">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={closeCart}
                      className="relative size-24 shrink-0 overflow-hidden bg-surface-card"
                    >
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm text-brand-primary"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-xs text-brand-muted">{line.material}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="p-1.5 text-brand-primary hover:text-brand-accent-hover"
                            onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                          >
                            <MinusIcon className="size-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-xs">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="p-1.5 text-brand-primary hover:text-brand-accent-hover"
                            onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                          >
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      className="self-start text-brand-muted hover:text-brand-primary"
                      onClick={() => removeItem(line.slug)}
                    >
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-brand-muted">
                Shipping and taxes calculated at checkout.
              </p>
              <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 block text-center text-xs font-medium uppercase tracking-widest text-brand-primary underline underline-offset-4"
              >
                View Bag
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
