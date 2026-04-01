import OnSaleContent from "@/components/product/OnSaleContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On Sale",
  description: "Shop our latest deals and discounts.",
};

export default function OnSalePage() {
  return <OnSaleContent />;
}
