"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "btn-primary w-full",
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        addItem(product, quantity);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1600);
      }}
    >
      {justAdded ? "Added to Bag" : "Add to Bag"}
    </button>
  );
}
