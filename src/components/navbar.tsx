"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon, XIcon } from "@/components/icons";
import { categoryLabels } from "@/lib/products";

const navLinks = [
  { href: "/shop", label: "All Jewelry" },
  { href: "/shop?category=necklaces", label: categoryLabels.necklaces },
  { href: "/shop?category=bracelets", label: categoryLabels.bracelets },
  { href: "/shop?category=rings", label: categoryLabels.rings },
  { href: "/about", label: "Our Story" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-surface-base/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between py-4 md:h-20">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            className="p-1 text-brand-primary"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-widest text-brand-primary transition-colors hover:text-brand-accent-hover"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.15em] text-brand-primary lg:static lg:translate-x-0"
        >
          VALKIRIA
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="hidden text-brand-primary transition-colors hover:text-brand-accent-hover sm:inline-flex"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden text-brand-primary transition-colors hover:text-brand-accent-hover sm:inline-flex"
          >
            <UserIcon />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden text-brand-primary transition-colors hover:text-brand-accent-hover sm:inline-flex"
          >
            <HeartIcon />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            onClick={openCart}
            className="relative text-brand-primary transition-colors hover:text-brand-accent-hover"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4.5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="animate-slide-in-right absolute right-0 top-0 h-full w-4/5 max-w-sm bg-surface-base p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-xl tracking-widest">VALKIRIA</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-brand-primary"
              >
                <XIcon />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-brand-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
