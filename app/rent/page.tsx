import type { Metadata } from "next";
import PropertiesPageContent from "../../components/PropertiesPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hurghada Vacation Rentals & Holiday Homes",
  description:
    "Find and book verified holiday apartments, chalets, studios, and vacation homes in Hurghada and El Kawther with local guest support.",
  alternates: {
    canonical: "/rent",
  },
  openGraph: {
    title: `Hurghada Vacation Rentals & Holiday Homes | ${siteConfig.name}`,
    description: "Browse furnished vacation rentals in Hurghada with live calendar availability, amenities, and local host support.",
    url: "/rent",
  },
};

export default function RentPage() {
  return <PropertiesPageContent />;
}
