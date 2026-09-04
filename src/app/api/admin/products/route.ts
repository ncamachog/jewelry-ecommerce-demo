import { NextResponse } from "next/server";
import { createProduct, getAllProducts } from "@/lib/products-store";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  try {
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create product." },
      { status: 400 },
    );
  }
}
