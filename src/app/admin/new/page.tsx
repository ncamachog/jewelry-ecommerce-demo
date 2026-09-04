import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "New Product — Admin — Valkiria" };

export default function NewProductPage() {
  return (
    <AdminShell>
      <h1 className="mb-8 font-serif text-2xl text-brand-primary md:text-3xl">
        New Product
      </h1>
      <ProductForm />
    </AdminShell>
  );
}
