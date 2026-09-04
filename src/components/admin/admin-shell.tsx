import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-card">
      <header className="border-b border-gray-200 bg-surface-base">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-serif text-lg tracking-widest text-brand-primary">
              VALKIRIA <span className="text-brand-accent-hover">Admin</span>
            </Link>
            <nav className="hidden gap-6 sm:flex">
              <Link
                href="/admin"
                className="text-xs font-semibold uppercase tracking-widest text-brand-primary hover:text-brand-accent-hover"
              >
                Products
              </Link>
              <Link
                href="/"
                target="_blank"
                className="text-xs font-semibold uppercase tracking-widest text-brand-muted hover:text-brand-accent-hover"
              >
                View Store ↗
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
