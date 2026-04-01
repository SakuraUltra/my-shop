"use client";

import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  image: string;
  colors: string[];
  colorHexes: string[];
};

const saleProducts: Product[] = [
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 8999,
    compareAtPrice: 12900,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#8B4513", "#000000"],
  },
  {
    name: "Wool Blend Scarf",
    slug: "wool-blend-scarf",
    price: 4999,
    compareAtPrice: 5900,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#c19a6b", "#36454f"],
  },
];

type SortOption = "price-asc" | "price-desc" | "biggest-discount";

export default function OnSaleContent() {
  const [sort, setSort] = useState<SortOption>("biggest-discount");

  const sorted = useMemo(() => {
    const items = [...saleProducts];
    switch (sort) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "biggest-discount":
        return items.sort(
          (a, b) =>
            (1 - b.price / b.compareAtPrice) - (1 - a.price / a.compareAtPrice)
        );
    }
  }, [sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Sale banner */}
      <div className="mb-8 rounded-lg border border-red-100 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950">
        <p className="font-medium text-red-600">
          Up to 50% off — while stocks last
        </p>
      </div>

      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-semibold">On Sale</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Limited time offers on selected items
          </p>
        </div>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {sorted.length} products
        </span>
      </div>

      {/* Sort */}
      <div className="mt-6 mb-6 flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Sort by</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-white"
        >
          <option value="biggest-discount">Biggest discount</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard
              key={p.slug}
              name={p.name}
              price={p.price}
              originalPrice={p.compareAtPrice}
              image={p.image}
              slug={p.slug}
              colors={p.colorHexes}
              badge={`-${Math.round((1 - p.price / p.compareAtPrice) * 100)}%`}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">No items on sale right now</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
