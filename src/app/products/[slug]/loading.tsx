import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left — Image gallery skeleton */}
        <div className="md:w-1/2">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 flex-shrink-0 rounded" />
            ))}
          </div>
        </div>

        {/* Right — Product info skeleton */}
        <div className="md:w-1/2 md:pl-8">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Price */}
          <div className="mt-2 flex items-center gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Description */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Color selector */}
          <div className="mt-6">
            <Skeleton className="h-4 w-12" />
            <div className="mt-3 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <Skeleton className="h-4 w-8" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-14 rounded" />
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <Skeleton className="mt-6 h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
