import type { Metadata } from "next";
import PropertyEditContent from "@/components/PropertyEditContent";

export const metadata: Metadata = {
  title: "Edit Property | Admin",
  description: "Edit rent property details, images, and prices.",
};

export default async function PropertyEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <PropertyEditContent id={resolvedParams.id} />;
}
