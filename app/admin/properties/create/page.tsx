import type { Metadata } from "next";
import PropertyCreateContent from "@/components/PropertyCreateContent";

export const metadata: Metadata = {
  title: "Create Property | Admin",
  description: "Create a new rent property listing.",
};

export default function PropertyCreatePage() {
  return <PropertyCreateContent />;
}
