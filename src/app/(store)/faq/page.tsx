import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";

export const metadata: Metadata = { title: "FAQ — Valkiria" };

export default function FaqPage() {
  return (
    <div className="container-page max-w-2xl py-16 md:py-24">
      <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">
        Frequently Asked Questions
      </h1>
      <div className="mt-8">
        <Accordion
          items={[
            {
              title: "What is gold vermeil?",
              content:
                "Gold vermeil is a thick layer of 18k gold (at least 2.5 microns) bonded over sterling silver — more durable and tarnish-resistant than standard gold plating.",
            },
            {
              title: "Is it safe for sensitive skin?",
              content:
                "Yes. Every piece is nickel-free and hypoallergenic, built on a sterling silver base.",
            },
            {
              title: "Can I wear it in the shower or pool?",
              content:
                "Our vermeil pieces are water-safe for occasional exposure, but we recommend removing jewelry before swimming, showering, or applying lotion and perfume to extend its life.",
            },
            {
              title: "How do I find my ring size?",
              content:
                "Measure the inside diameter of a ring that fits well and compare it to a standard sizing chart, or visit a local jeweler for an accurate fitting.",
            },
            {
              title: "Do you offer gift wrapping?",
              content:
                "Every order ships in our signature gift box at no extra charge — ready to give as-is.",
            },
          ]}
        />
      </div>
    </div>
  );
}
