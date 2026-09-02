import type { Metadata } from "next";
import PropertiesPageContent from "../../components/PropertiesPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacation Rentals in Hurghada",
  description:
    "Browse apartments, villas, studios, and vacation homes for rent in Hurghada and El Kawther.",
  alternates: {
    canonical: "/rent",
  },
  openGraph: {
    title: `Vacation Rentals in Hurghada | ${siteConfig.name}`,
    description: "Browse furnished holiday rentals in Hurghada with availability, amenities, and local support.",
    url: "/rent",
  },
};

export default function RentPage() {
  return <PropertiesPageContent />;
}
