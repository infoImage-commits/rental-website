import type { Metadata } from "next";
import LocationsContent from "../../../components/LocationsContent";

export const metadata: Metadata = {
  title: "Locations Management | Admin",
  description: "Create, edit, and manage geographical locations for properties.",
};

export default function LocationsPage() {
  return <LocationsContent />;
}
