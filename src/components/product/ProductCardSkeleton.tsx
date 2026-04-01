import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div>
      {/* Image area */}
      <Skeleton className="aspect-square rounded-lg" />

      {/* Title */}
      <Skeleton className="mt-3 h-4 w-3/4" />

      {/* Price */}
      <Skeleton className="mt-2 h-4 w-1/4" />

      {/* Color swatches */}
      <div className="mt-2 flex gap-1">
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
      </div>
    </div>
  );
}
