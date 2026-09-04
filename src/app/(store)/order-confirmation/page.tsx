"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Confirmation() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? "VLK-000000";

  return (
    <div className="container-page flex flex-col items-center py-20 text-center md:py-28">
      <span className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-secondary text-brand-accent">
        <svg viewBox="0 0 24 24" fill="none" className="size-8">
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">Thank You</h1>
      <p className="mt-4 max-w-md text-sm text-brand-muted md:text-base">
        Your order has been placed. A confirmation has been sent to your inbox — we&rsquo;ll
        notify you the moment it ships.
      </p>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-primary">
        Order Number: {order}
      </p>
      <Link href="/shop" className="btn-primary mt-10">
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <Confirmation />
    </Suspense>
  );
}
