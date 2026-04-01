import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Filters placeholder */}
      <div className="mt-6 flex gap-3">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
