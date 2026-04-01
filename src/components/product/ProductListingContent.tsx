"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductFilters, { type Filters } from "@/components/product/ProductFilters";
import { useMemo, useState } from "react";

type Product = {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  colors: string[];
  colorHexes: string[];
  category: string;
  createdAt: string;
};

const allProducts: Product[] = [
  {
    name: "Classic Cotton Tee",
    slug: "classic-cotton-tee",
    price: 2999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Clothing",
    createdAt: "2026-03-01",
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 8999,
    compareAtPrice: 12900,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#8B4513", "#000000"],
    category: "Accessories",
    createdAt: "2026-03-05",
  },
  {
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    price: 12999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    colors: ["Silver", "Gold"],
    colorHexes: ["#c0c0c0", "#FFD700"],
    category: "Watches",
    createdAt: "2026-03-10",
  },
  {
    name: "Wool Blend Scarf",
    slug: "wool-blend-scarf",
    price: 4999,
    compareAtPrice: 5900,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#c19a6b", "#36454f"],
    category: "Accessories",
    createdAt: "2026-03-12",
  },
  {
    name: "Canvas Sneakers",
    slug: "canvas-sneakers",
    price: 5999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    colors: ["White", "Black"],
    colorHexes: ["#ffffff", "#000000"],
    category: "Clothing",
    createdAt: "2026-03-15",
  },
  {
    name: "Aviator Sunglasses",
    slug: "aviator-sunglasses",
    price: 7999,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    colors: ["Gold", "Silver"],
    colorHexes: ["#FFD700", "#c0c0c0"],
    category: "Accessories",
    createdAt: "2026-03-18",
  },
  {
    name: "Soy Wax Candle",
    slug: "soy-wax-candle",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80",
    colors: ["White"],
    colorHexes: ["#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-20",
  },
  {
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    price: 3499,
    image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-22",
  },
  {
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    price: 5499,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    colors: ["Black", "Brown"],
    colorHexes: ["#000000", "#8B4513"],
    category: "Clothing",
    createdAt: "2026-03-24",
  },
  {
    name: "Chronograph Watch",
    slug: "chronograph-watch",
    price: 19999,
    image: "https://images.unsplash.com/photo-1639037687665-4f60498e0498?w=800&q=80",
    colors: ["Silver", "Gold"],
    colorHexes: ["#c0c0c0", "#FFD700"],
    category: "Watches",
    createdAt: "2026-03-26",
  },
  {
    name: "Merino Wool Beanie",
    slug: "merino-wool-beanie",
    price: 1999,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-28",
  },
  {
    name: "Linen Button-Down",
    slug: "linen-button-down",
    price: 4499,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    colors: ["White", "Brown"],
    colorHexes: ["#ffffff", "#d2b48c"],
    category: "Clothing",
    createdAt: "2026-03-30",
  },
];

function matchPrice(price: number, range: string): boolean {
  const dollars = price / 100;
  switch (range) {
    case "Under $30":
      return dollars < 30;
    case "$30-$60":
      return dollars >= 30 && dollars <= 60;
    case "$60-$100":
      return dollars > 60 && dollars <= 100;
    case "Over $100":
      return dollars > 100;
    default:
      return true;
  }
}

export default function ProductListingContent() {
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    color: "All",
    price: "All",
    sort: "featured",
  });

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.color !== "All" && !p.colors.includes(filters.color)) return false;
      if (filters.price !== "All" && !matchPrice(p.price, filters.price)) return false;
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">All products</h1>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{filtered.length} products</span>
      </div>

      <ProductFilters filters={filters} onChange={setFilters} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard
              key={p.slug}
              name={p.name}
              price={p.price}
              originalPrice={p.compareAtPrice}
              image={p.image}
              slug={p.slug}
              colors={p.colorHexes}
              badge={
                p.compareAtPrice
                  ? `-${Math.round((1 - p.price / p.compareAtPrice) * 100)}%`
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">No products found</p>
          <button
            onClick={() =>
              setFilters({ category: "All", color: "All", price: "All", sort: filters.sort })
            }
            className="mt-4 cursor-pointer text-sm font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
