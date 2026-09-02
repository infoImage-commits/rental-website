import { Metadata } from "next";
import PropertiesLocationsContent from "@/components/PropertiesLocationsContent";

export const metadata: Metadata = {
  title: "Properties Locations Management | Admin",
  description: "Manage locations for properties in the rental system.",
};

export default function PropertiesLocationsPage() {
  return <PropertiesLocationsContent />;
}
