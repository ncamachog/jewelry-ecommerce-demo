"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TrashIcon } from "@/components/icons";

export function DeleteProductButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center justify-end gap-2 text-xs">
        <span className="text-brand-muted">Delete?</span>
        <button
          type="button"
          disabled={loading}
          className="font-semibold uppercase tracking-widest text-red-600 hover:text-red-700 disabled:opacity-50"
          onClick={async () => {
            setLoading(true);
            await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
            router.refresh();
          }}
        >
          {loading ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          className="font-semibold uppercase tracking-widest text-brand-muted hover:text-brand-primary"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Delete ${name}`}
      className="ml-auto flex items-center gap-1.5 text-xs text-brand-muted hover:text-red-600"
      onClick={() => setConfirming(true)}
    >
      <TrashIcon className="size-3.5" />
      Delete
    </button>
  );
}
