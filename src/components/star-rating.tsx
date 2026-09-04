import { StarIcon } from "@/components/icons";

export function StarRating({
  rating,
  reviewCount,
  size = "size-3.5",
}: {
  rating: number;
  reviewCount?: number;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-brand-accent">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return <StarIcon key={i} className={size} filled={filled} />;
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-brand-muted">({reviewCount})</span>
      )}
    </div>
  );
}
