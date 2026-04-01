"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const products = [
  { name: "Classic Cotton Tee", slug: "classic-cotton-tee", price: 2999, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { name: "Leather Crossbody Bag", slug: "leather-crossbody-bag", price: 8999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
  { name: "Minimalist Watch", slug: "minimalist-watch", price: 12999, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" },
  { name: "Wool Blend Scarf", slug: "wool-blend-scarf", price: 4999, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80" },
  { name: "Canvas Sneakers", slug: "canvas-sneakers", price: 5999, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
  { name: "Aviator Sunglasses", slug: "aviator-sunglasses", price: 7999, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80" },
  { name: "Soy Wax Candle", slug: "soy-wax-candle", price: 2499, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80" },
  { name: "Canvas Tote Bag", slug: "canvas-tote-bag", price: 3499, image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80" },
  { name: "Slim Fit Chinos", slug: "slim-fit-chinos", price: 5499, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80" },
  { name: "Chronograph Watch", slug: "chronograph-watch", price: 19999, image: "https://images.unsplash.com/photo-1639037687665-4f60498e0498?w=800&q=80" },
  { name: "Merino Wool Beanie", slug: "merino-wool-beanie", price: 1999, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80" },
  { name: "Linen Button-Down", slug: "linen-button-down", price: 4499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
];

const popularSearches = ["Watch", "Bag", "Tee", "Scarf"];

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Reset query when dialog opens
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleSelect = (slug: string) => {
    onOpenChange(false);
    router.push(`/products/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Search products</DialogTitle>

        {/* Search input */}
        <div className="flex items-center border-b px-4 dark:border-neutral-800">
          <Search className="h-5 w-5 shrink-0 text-neutral-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="h-14 flex-1 border-none bg-transparent px-3 text-lg outline-none placeholder:text-neutral-400"
          />
          <kbd className="hidden rounded border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-400 dark:border-neutral-700 sm:inline">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div className="max-h-80 overflow-y-auto p-2">
          {!query.trim() ? (
            /* Popular searches */
            <div className="p-3">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Product results */
            <ul>
              {results.map((product) => (
                <li key={product.slug}>
                  <button
                    onClick={() => handleSelect(product.slug)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.name}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        ${(product.price / 100).toFixed(2)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            /* No results */
            <p className="px-3 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              No products found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
