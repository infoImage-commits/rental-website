import type { Metadata } from "next";
import PropertiesContent from "@/components/PropertiesContent";

export const metadata: Metadata = {
  title: "Rent Properties | Admin",
  description: "Manage rent properties, listings, and availability.",
};

export default function PropertiesPage() {
  return <PropertiesContent />;
}
