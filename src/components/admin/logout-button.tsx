"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      className="text-xs font-semibold uppercase tracking-widest text-brand-muted hover:text-brand-primary disabled:opacity-50"
      onClick={async () => {
        setLoading(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      {loading ? "Signing out…" : "Log Out"}
    </button>
  );
}
