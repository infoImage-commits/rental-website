import { Metadata } from "next";
import PropertiesLocationsContent from "@/components/PropertiesLocationsContent";

export const metadata: Metadata = {
  title: "Properties Views Management | Admin",
  description: "Manage view categories for properties in the rental system.",
};

export default function PropertiesLocationsPage() {
  return <PropertiesLocationsContent />;
}
