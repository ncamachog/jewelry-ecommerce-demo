"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, categoryLabels, slugify, type Category, type Product } from "@/lib/products";

type FormState = {
  name: string;
  category: Category;
  price: string;
  compareAtPrice: string;
  material: string;
  description: string;
  details: string;
  modelImage: string;
  flatImage: string;
  rating: string;
  reviewCount: string;
  bestseller: boolean;
  isNew: boolean;
};

function toFormState(product?: Product): FormState {
  return {
    name: product?.name ?? "",
    category: product?.category ?? "necklaces",
    price: product ? String(product.price) : "",
    compareAtPrice: product?.compareAtPrice ? String(product.compareAtPrice) : "",
    material: product?.material ?? "",
    description: product?.description ?? "",
    details: product?.details.join("\n") ?? "",
    modelImage: product?.images.model ?? "",
    flatImage: product?.images.flat ?? "",
    rating: product ? String(product.rating) : "4.8",
    reviewCount: product ? String(product.reviewCount) : "0",
    bestseller: Boolean(product?.bestseller),
    isNew: Boolean(product?.isNew),
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [form, setForm] = useState<FormState>(() => toFormState(product));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const previewSlug = product?.slug ?? slugify(form.name || "");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      material: form.material.trim(),
      description: form.description.trim(),
      details: form.details.split("\n").map((d) => d.trim()).filter(Boolean),
      images: {
        model: form.modelImage.trim() || undefined,
        flat: form.flatImage.trim(),
      },
      rating: Number(form.rating) || 0,
      reviewCount: Number(form.reviewCount) || 0,
      bestseller: form.bestseller,
      isNew: form.isNew,
    };

    const url = isEdit ? `/api/admin/products/${product!.slug}` : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Basics
        </legend>
        <div>
          <label className="mb-1.5 block text-xs text-brand-muted">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
          />
          {!isEdit && form.name && (
            <p className="mt-1.5 text-xs text-brand-muted">
              URL slug: <span className="font-mono">/{previewSlug}</span>
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as Category)}
              className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">Material</label>
            <input
              required
              value={form.material}
              onChange={(e) => set("material", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Pricing
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">Price (USD)</label>
            <input
              required
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">
              Compare-at Price <span className="text-brand-muted/70">(optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={form.compareAtPrice}
              onChange={(e) => set("compareAtPrice", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Description
        </legend>
        <div>
          <label className="mb-1.5 block text-xs text-brand-muted">Short Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-brand-muted">
            Details (one bullet per line)
          </label>
          <textarea
            rows={4}
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Images
        </legend>
        <p className="text-xs text-brand-muted">
          Path under <span className="font-mono">/public</span>, e.g.{" "}
          <span className="font-mono">/products/{previewSlug || "your-slug"}/flat.png</span>.
          Upload files there first, then reference the path.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">
              Flat / Product Image <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.flatImage}
              onChange={(e) => set("flatImage", e.target.value)}
              placeholder="/products/slug/flat.png"
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">
              Model Image <span className="text-brand-muted/70">(optional)</span>
            </label>
            <input
              value={form.modelImage}
              onChange={(e) => set("modelImage", e.target.value)}
              placeholder="/products/slug/model.png"
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          Merchandising
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">Rating (0–5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={(e) => set("rating", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-brand-muted">Review Count</label>
            <input
              type="number"
              min="0"
              step="1"
              value={form.reviewCount}
              onChange={(e) => set("reviewCount", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-brand-primary">
            <input
              type="checkbox"
              checked={form.bestseller}
              onChange={(e) => set("bestseller", e.target.checked)}
            />
            Bestseller
          </label>
          <label className="flex items-center gap-2 text-sm text-brand-primary">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => set("isNew", e.target.checked)}
            />
            New Arrival
          </label>
        </div>
      </fieldset>

      <div className="flex gap-4">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
