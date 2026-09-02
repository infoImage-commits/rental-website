import type { Metadata } from "next";
import PropertyBuyingItemsContent from "@/components/PropertyBuyingItemsContent";

export const metadata: Metadata = {
  title: "Buy Includes Items | Admin",
  description: "Manage individual items for property buying categories.",
};

export default function PropertyBuyingItemsPage() {
  return <PropertyBuyingItemsContent />;
}
