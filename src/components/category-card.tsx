import Image from "next/image";
import Link from "next/link";

export function CategoryCard({
  href,
  label,
  count,
  image,
}: {
  href: string;
  label: string;
  count: string;
  image: string;
}) {
  return (
    <Link href={href} className="group relative block aspect-[3/4] overflow-hidden bg-surface-card">
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="font-serif text-2xl">{label}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/80">{count}</p>
        <span className="mt-3 inline-block border-b border-white/60 pb-0.5 text-[11px] font-semibold uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Shop Now
        </span>
      </div>
    </Link>
  );
}
