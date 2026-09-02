import type { Metadata } from "next";
import PropertyBuyingsContent from "@/components/PropertyBuyingsContent";

export const metadata: Metadata = {
  title: "Buy Properties | Admin",
  description: "Manage properties for buying, listings, and availability.",
};

export default function PropertyBuyingsPage() {
  return <PropertyBuyingsContent />;
}
