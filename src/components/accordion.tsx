"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "@/components/icons";

export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium uppercase tracking-widest text-brand-primary">
                {item.title}
              </span>
              {isOpen ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}
            </button>
            {isOpen && (
              <div className="animate-fade-in pb-5 text-sm leading-relaxed text-brand-muted">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
