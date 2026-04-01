"use client";

import { useCartStore } from "@/store/cart";
import type { Product, ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type ProductWithVariants = Product & { variants: ProductVariant[] };

export default function ProductDetail({ product }: { product: ProductWithVariants }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  // Derive unique colors and sizes
  const colors = useMemo(
    () => [...new Set(product.variants.map((v) => v.color))],
    [product.variants],
  );
  const sizes = useMemo(
    () => [...new Set(product.variants.map((v) => v.size))],
    [product.variants],
  );

  // Find matching variant
  const selectedVariant = useMemo(
    () =>
      selectedColor && selectedSize
        ? product.variants.find((v) => v.color === selectedColor && v.size === selectedSize) ?? null
        : null,
    [product.variants, selectedColor, selectedSize],
  );

  // Price to display: selected variant price, or min price across all variants
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : Math.min(...product.variants.map((v) => v.price));

  // Discount percentage
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > displayPrice
      ? Math.round((1 - displayPrice / product.compareAtPrice) * 100)
      : null;

  // Stock for each size when a color is picked
  const stockForSize = (size: string) => {
    if (!selectedColor) return null;
    const v = product.variants.find((v) => v.color === selectedColor && v.size === size);
    return v ? v.stock : 0;
  };

  // Color name → CSS value mapping
  const colorMap: Record<string, string> = {
    Black: "#000000",
    White: "#ffffff",
    Navy: "#1e3a5f",
    Tan: "#d2b48c",
    Silver: "#c0c0c0",
    "Rose Gold": "#b76e79",
    Camel: "#c19a6b",
    Charcoal: "#36454f",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left — Image gallery */}
        <div className="md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 ${
                    idx === selectedImage ? "border-black dark:border-white" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Product info */}
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>

          {/* Price */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xl font-semibold">${(displayPrice / 100).toFixed(2)}</span>
            {product.compareAtPrice && product.compareAtPrice > displayPrice && (
              <>
                <span className="text-lg text-neutral-400 line-through">
                  ${(product.compareAtPrice / 100).toFixed(2)}
                </span>
                <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">{product.description}</p>
          )}

          {/* Color selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Color{selectedColor && <span className="ml-2 font-normal text-neutral-500 dark:text-neutral-400">— {selectedColor}</span>}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize(null);
                  }}
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 border-neutral-200 dark:border-neutral-600 ${
                    selectedColor === color ? "ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-neutral-950" : ""
                  }`}
                  style={{ backgroundColor: colorMap[color] ?? color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Size</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => {
                const stock = stockForSize(size);
                const outOfStock = selectedColor != null && stock === 0;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    className={`cursor-pointer rounded border px-4 py-2 text-sm ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : outOfStock
                          ? "cursor-not-allowed border-neutral-200 text-neutral-300 line-through opacity-50 dark:border-neutral-700 dark:text-neutral-600"
                          : "border-neutral-300 hover:border-black dark:border-neutral-600 dark:hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock indicator */}
          {selectedVariant && (
            <p
              className={`mt-4 text-sm ${
                selectedVariant.stock <= 5 ? "text-amber-600" : "text-neutral-500"
              }`}
            >
              {selectedVariant.stock} in stock
            </p>
          )}

          {/* Add to cart */}
          <button
            disabled={!selectedVariant || selectedVariant.stock === 0}
            onClick={() => {
              if (!selectedVariant || !selectedColor || !selectedSize) return;
              addItem({
                variantId: selectedVariant.id,
                productName: product.name,
                color: selectedColor,
                size: selectedSize,
                price: selectedVariant.price,
                image: product.images[0] ?? "",
              });
              toast.success("Added to cart");
            }}
            className="mt-6 w-full cursor-pointer rounded-lg bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
