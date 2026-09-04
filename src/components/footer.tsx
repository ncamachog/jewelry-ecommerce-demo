import Link from "next/link";
import { categoryLabels } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-surface-card">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-2xl tracking-[0.15em] text-brand-primary">VALKIRIA</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
            Fine, wearable jewelry — designed quietly, made to last. 18k gold vermeil pieces
            for everyday layering.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Shop
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li>
              <Link href="/shop" className="hover:text-brand-accent-hover">
                All Jewelry
              </Link>
            </li>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <li key={key}>
                <Link href={`/shop?category=${key}`} className="hover:text-brand-accent-hover">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Help
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li>
              <Link href="/shipping" className="hover:text-brand-accent-hover">
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-brand-accent-hover">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-accent-hover">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/care" className="hover:text-brand-accent-hover">
                Jewelry Care
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Stay in Touch
          </h4>
          <p className="mt-4 text-sm text-brand-muted">
            Sign up for early access to new drops and private sales.
          </p>
          <form className="mt-4 flex border border-gray-300">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-brand-muted"
            />
            <button
              type="submit"
              className="shrink-0 bg-brand-primary px-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-accent-hover"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Valkiria Jewelry. All rights reserved.</p>
          <p>Demo storefront — for portfolio &amp; evaluation purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
