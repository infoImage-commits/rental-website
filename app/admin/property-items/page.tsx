import type { Metadata } from "next";
import PropertyItemsContent from "@/components/PropertyItemsContent";

export const metadata: Metadata = {
  title: "Rent Includes Items | Admin",
  description: "Manage individual items for property included categories.",
};

export default function PropertyItemsPage() {
  return <PropertyItemsContent />;
}
