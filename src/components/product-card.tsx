import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { StarRating } from "@/components/star-rating";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  const primary = product.images.model ?? product.images.flat;
  const secondary =
    product.images.model && product.images.flat !== product.images.model
      ? product.images.flat
      : undefined;

  return (
    <div className="group card-shadow border border-gray-100 bg-surface-base">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-surface-card"
      >
        {(product.bestseller || product.isNew || product.compareAtPrice) && (
          <span className="absolute left-3 top-3 z-10 bg-brand-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            {product.compareAtPrice ? "Sale" : product.bestseller ? "Bestseller" : "New"}
          </span>
        )}
        <Image
          src={primary}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {secondary && (
          <Image
            src={secondary}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </Link>
      <div className="space-y-2 p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-serif text-base text-brand-primary transition-colors group-hover:text-brand-accent-hover">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-medium text-brand-primary">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-brand-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="pt-2">
          <AddToCartButton
            product={product}
            className="w-full border border-brand-primary px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
