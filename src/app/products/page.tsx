import ProductListingContent from "@/components/product/ProductListingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full collection of minimal fashion and accessories.",
};

export default function ProductsPage() {
  return <ProductListingContent />;
}

