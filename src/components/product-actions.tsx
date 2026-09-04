"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { MinusIcon, PlusIcon } from "@/components/icons";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center justify-between border border-gray-300 px-2 sm:w-32">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="p-2 text-brand-primary hover:text-brand-accent-hover"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <MinusIcon />
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="p-2 text-brand-primary hover:text-brand-accent-hover"
          onClick={() => setQuantity((q) => q + 1)}
        >
          <PlusIcon />
        </button>
      </div>
      <button
        type="button"
        className="btn-primary flex-1"
        onClick={() => {
          addItem(product, quantity);
          setJustAdded(true);
          window.setTimeout(() => setJustAdded(false), 1600);
        }}
      >
        {justAdded ? "Added to Bag" : "Add to Bag"}
      </button>
    </div>
  );
}
