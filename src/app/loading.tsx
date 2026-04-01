import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center md:min-h-[80vh]">
        <Skeleton className="absolute inset-0" />
        <div className="relative z-10 space-y-6 px-4">
          <Skeleton className="mx-auto h-3 w-32" />
          <Skeleton className="mx-auto h-10 w-72 sm:w-96" />
          <Skeleton className="mx-auto h-5 w-64" />
          <Skeleton className="mx-auto h-12 w-36 rounded-full" />
        </div>
      </section>

      {/* Featured collection skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Trust signals skeleton */}
      <section className="border-y border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 text-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </section>

      {/* On sale skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Skeleton className="h-7 w-24" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
