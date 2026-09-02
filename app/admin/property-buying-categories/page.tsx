import type { Metadata } from "next";
import PropertyBuyingCategoriesContent from "@/components/PropertyBuyingCategoriesContent";

export const metadata: Metadata = {
  title: "Buy Includes Categories | Admin",
  description: "Manage included property buying categories.",
};

export default function PropertyBuyingCategoriesPage() {
  return <PropertyBuyingCategoriesContent />;
}
