import type { Metadata } from "next";
import PropertyCategoriesContent from "@/components/PropertyCategoriesContent";

export const metadata: Metadata = {
  title: "Rent Includes Categories | Admin",
  description: "Manage included property categories and their items.",
};

export default function PropertyCategoriesPage() {
  return <PropertyCategoriesContent />;
}
