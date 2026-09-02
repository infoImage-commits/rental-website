import type { Metadata } from "next";
import PropertyBuyingCreateContent from "@/components/PropertyBuyingCreateContent";

export const metadata: Metadata = {
  title: "Add Buy Property | Admin",
  description: "Create a new property listing for buying.",
};

export default function PropertyBuyingCreatePage() {
  return <PropertyBuyingCreateContent />;
}
