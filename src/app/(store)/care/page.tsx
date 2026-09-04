import type { Metadata } from "next";

export const metadata: Metadata = { title: "Jewelry Care — Valkiria" };

export default function CarePage() {
  return (
    <div className="container-page max-w-2xl py-16 md:py-24">
      <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">Jewelry Care</h1>
      <ul className="mt-8 space-y-6 text-sm leading-relaxed text-brand-muted md:text-base">
        <li>
          <strong className="text-brand-primary">Store separately.</strong> Keep pieces in the
          pouch provided to prevent scratching and tangling.
        </li>
        <li>
          <strong className="text-brand-primary">Avoid moisture.</strong> Remove jewelry before
          showering, swimming, or exercising to preserve the gold finish.
        </li>
        <li>
          <strong className="text-brand-primary">Last on, first off.</strong> Apply perfume,
          lotion, and hairspray before putting on your jewelry.
        </li>
        <li>
          <strong className="text-brand-primary">Clean gently.</strong> Wipe with a soft,
          lint-free cloth after wear. Avoid harsh chemicals and ultrasonic cleaners.
        </li>
        <li>
          <strong className="text-brand-primary">Pearls need care too.</strong> Wipe pearls
          with a damp cloth after wear and avoid storing them airtight.
        </li>
      </ul>
    </div>
  );
}
