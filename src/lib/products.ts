export type Category = "necklaces" | "bracelets" | "rings";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  material: string;
  description: string;
  details: string[];
  images: {
    model?: string;
    flat: string;
  };
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
  isNew?: boolean;
};

export const categoryLabels: Record<Category, string> = {
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  rings: "Rings",
};

export const categories: Category[] = ["necklaces", "bracelets", "rings"];

/**
 * Seed data — used to bootstrap data/products.json the first time the app
 * runs. After that, the JSON file (managed via /admin) is the source of truth.
 */
export const productsSeed: Product[] = [
  {
    slug: "aurora-pearl-pendant-necklace",
    name: "Aurora Pearl Pendant Necklace",
    category: "necklaces",
    price: 148,
    compareAtPrice: 188,
    material: "18k Gold-Vermeil, Freshwater Pearl",
    description:
      "A single luminous freshwater pearl rests on a whisper-fine snake chain, finished with a pair of polished gold beads. Understated enough for every day, luminous enough for evening.",
    details: [
      "18k gold vermeil over sterling silver",
      "9–10mm genuine freshwater pearl",
      "Adjustable 16\"–18\" snake chain",
      "Tarnish-resistant, water safe",
    ],
    images: {
      model: "/products/pearl-pendant-necklace/model.png",
      flat: "/products/pearl-pendant-necklace/flat.png",
    },
    rating: 4.9,
    reviewCount: 214,
    bestseller: true,
  },
  {
    slug: "duet-lariat-necklace",
    name: "Duet Lariat Necklace",
    category: "necklaces",
    price: 128,
    material: "18k Gold-Vermeil",
    description:
      "Two fine chains fall in soft cascade, each finished with a polished gold bead — one settling in a delicate Y, the other trailing into a lariat drop. Layering, solved in a single clasp.",
    details: [
      "18k gold vermeil over sterling silver",
      "Dual-layer design, single clasp",
      "16\" and 18\" chain drop with 2\" extender",
      "Hypoallergenic, nickel-free",
    ],
    images: {
      model: "/products/duet-lariat-necklace/model.png",
      flat: "/products/duet-lariat-necklace/flat.png",
    },
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
  },
  {
    slug: "trinity-bangle-set",
    name: "Trinity Bangle Set",
    category: "bracelets",
    price: 168,
    material: "18k Gold-Vermeil",
    description:
      "Three slim, angular bangles designed to be worn together — a quiet stack that catches light with every movement. Sold as a set of three.",
    details: [
      "Set of 3 stacking bangles",
      "18k gold vermeil over sterling silver",
      "Open cuff design, one size fits most",
      "Mixed square and round profiles",
    ],
    images: {
      model: "/products/trinity-bangle-set/model.png",
      flat: "/products/trinity-bangle-set/model.png",
    },
    rating: 4.7,
    reviewCount: 98,
    bestseller: true,
  },
  {
    slug: "eternal-knot-cuff",
    name: "Eternal Knot Cuff",
    category: "bracelets",
    price: 138,
    material: "18k Gold-Vermeil",
    description:
      "A sculptural cuff twisted into a single, unbroken knot — a small gesture built to last. The open back adjusts easily for a personal fit.",
    details: [
      "18k gold vermeil over sterling silver",
      "Adjustable open cuff, fits most wrists",
      "Solid cast construction",
      "Signature knot motif",
    ],
    images: {
      model: "/products/eternal-knot-cuff/model.png",
      flat: "/products/eternal-knot-cuff/flat.png",
    },
    rating: 4.9,
    reviewCount: 132,
  },
  {
    slug: "jade-talisman-bracelet",
    name: "Jade Talisman Bracelet",
    category: "bracelets",
    price: 98,
    material: "18k Gold-Vermeil, Natural Jade",
    description:
      "Hand-strung gold beads meet a single nugget of natural jade and an engraved gold tag charm — a stretch bracelet made for stacking or wearing alone.",
    details: [
      "18k gold vermeil beads over sterling silver",
      "Natural jade stone accent",
      "Engraved brass tag charm",
      "Stretch fit, one size fits most",
    ],
    images: {
      model: "/products/jade-talisman-bracelet/model.png",
      flat: "/products/jade-talisman-bracelet/flat.png",
    },
    rating: 4.8,
    reviewCount: 87,
    isNew: true,
  },
  {
    slug: "horizon-bar-necklace",
    name: "Horizon Bar Necklace",
    category: "necklaces",
    price: 158,
    material: "18k Gold-Vermeil",
    description:
      "A long, fluid snake chain punctuated by a single curved bar that sits just below the collarbone. Minimal, sculptural, endlessly wearable.",
    details: [
      "18k gold vermeil over sterling silver",
      "28\" length, curved bar pendant",
      "Lightweight snake chain",
      "Lobster clasp closure",
    ],
    images: {
      model: "/products/horizon-bar-necklace/model.png",
      flat: "/products/horizon-bar-necklace/flat.png",
    },
    rating: 4.7,
    reviewCount: 64,
  },
  {
    slug: "luna-pearl-bracelet",
    name: "Luna Pearl Bracelet",
    category: "bracelets",
    price: 118,
    material: "18k Gold-Vermeil, Freshwater Pearl",
    description:
      "A single freshwater pearl anchors a bracelet of hand-set oval gold beads — the smaller sibling to our Aurora Pendant, made to be layered together.",
    details: [
      "18k gold vermeil beads over sterling silver",
      "9–10mm genuine freshwater pearl",
      "Adjustable 6\"–7.5\" length",
      "Lobster clasp with extender chain",
    ],
    images: {
      model: "/products/luna-pearl-bracelet/model.png",
      flat: "/products/luna-pearl-bracelet/flat.png",
    },
    rating: 4.9,
    reviewCount: 176,
    bestseller: true,
  },
  {
    slug: "starlight-layer-necklace",
    name: "Starlight Layer Necklace",
    category: "necklaces",
    price: 178,
    material: "18k Gold-Vermeil, Cubic Zirconia",
    description:
      "A double-chain necklace — one fine curb chain, one flat herringbone — joined by a pavé crystal rondelle. Understated sparkle for layering or wearing solo.",
    details: [
      "18k gold vermeil over sterling silver",
      "Pavé-set cubic zirconia rondelle",
      "Adjustable 16\"–18.5\" length",
      "Mixed herringbone and curb chain",
    ],
    images: {
      flat: "/products/starlight-layer-necklace/flat.png",
    },
    rating: 4.8,
    reviewCount: 103,
  },
  {
    slug: "trio-band-ring",
    name: "Trio Band Ring",
    category: "rings",
    price: 88,
    material: "18k Gold-Vermeil",
    description:
      "Three slim square-profile bands fused into a single ring — the ease of a stack, without the stack. Wear it alone and it still reads like a collection.",
    details: [
      "18k gold vermeil over sterling silver",
      "Fused triple-band design",
      "Available in sizes 5–9",
      "Tarnish-resistant finish",
    ],
    images: {
      model: "/products/trio-band-ring/model.png",
      flat: "/products/trio-band-ring/model.png",
    },
    rating: 4.6,
    reviewCount: 51,
    isNew: true,
  },
];

export function findProductBySlug(
  all: Product[],
  slug: string,
): Product | undefined {
  return all.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  all: Product[],
  product: Product,
  limit = 4,
): Product[] {
  return all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
