import type { Metadata } from "next";
import PropertyBuyingEditContent from "@/components/PropertyBuyingEditContent";

export const metadata: Metadata = {
  title: "Edit Buy Property | Admin",
  description: "Edit a property listing for buying.",
};

export default async function PropertyBuyingEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <PropertyBuyingEditContent id={resolvedParams.id} />;
}
