import fs from "fs/promises";
import path from "path";
import { productsSeed, slugify, type Product } from "@/lib/products";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function writeAll(products: Product[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
  } catch {
    // Read-only filesystem (e.g. Vercel serverless functions) — admin edits
    // won't persist across requests/deploys there. Swap in a real database
    // for durable writes; the storefront itself still works off the seed.
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return productsSeed;
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export type ProductInput = Omit<Product, "slug"> & { slug?: string };

function validate(input: ProductInput): string | null {
  if (!input.name?.trim()) return "Name is required.";
  if (!["necklaces", "bracelets", "rings"].includes(input.category))
    return "Category is invalid.";
  if (typeof input.price !== "number" || input.price <= 0)
    return "Price must be a positive number.";
  if (!input.material?.trim()) return "Material is required.";
  if (!input.description?.trim()) return "Description is required.";
  if (!input.images?.flat?.trim()) return "A flat/product image path is required.";
  return null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const error = validate(input);
  if (error) throw new Error(error);

  const all = await getAllProducts();
  const baseSlug = slugify(input.slug || input.name);
  let slug = baseSlug;
  let n = 2;
  while (all.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${n}`;
    n += 1;
  }

  const product: Product = {
    slug,
    name: input.name.trim(),
    category: input.category,
    price: input.price,
    compareAtPrice: input.compareAtPrice || undefined,
    material: input.material.trim(),
    description: input.description.trim(),
    details: (input.details || []).filter((d) => d.trim().length > 0),
    images: {
      model: input.images.model?.trim() || undefined,
      flat: input.images.flat.trim(),
    },
    rating: input.rating || 5,
    reviewCount: input.reviewCount || 0,
    bestseller: Boolean(input.bestseller),
    isNew: Boolean(input.isNew),
  };

  await writeAll([...all, product]);
  return product;
}

export async function updateProduct(
  slug: string,
  input: ProductInput,
): Promise<Product | undefined> {
  const error = validate(input);
  if (error) throw new Error(error);

  const all = await getAllProducts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;

  const updated: Product = {
    ...all[idx],
    name: input.name.trim(),
    category: input.category,
    price: input.price,
    compareAtPrice: input.compareAtPrice || undefined,
    material: input.material.trim(),
    description: input.description.trim(),
    details: (input.details || []).filter((d) => d.trim().length > 0),
    images: {
      model: input.images.model?.trim() || undefined,
      flat: input.images.flat.trim(),
    },
    rating: input.rating || all[idx].rating,
    reviewCount:
      input.reviewCount !== undefined ? input.reviewCount : all[idx].reviewCount,
    bestseller: Boolean(input.bestseller),
    isNew: Boolean(input.isNew),
  };

  all[idx] = updated;
  await writeAll(all);
  return updated;
}

export async function deleteProduct(slug: string): Promise<boolean> {
  const all = await getAllProducts();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) return false;
  await writeAll(next);
  return true;
}
