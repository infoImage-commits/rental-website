import type { Metadata } from "next";
import PropertiesPageContent from "../../components/PropertiesPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Properties for Sale in Hurghada",
  description:
    "Explore apartments, villas, and homes for sale in Hurghada with local property guidance.",
  alternates: {
    canonical: "/buy",
  },
  openGraph: {
    title: `Properties for Sale in Hurghada | ${siteConfig.name}`,
    description: "Explore Hurghada homes and investment properties with local support.",
    url: "/buy",
  },
};

import { notFound } from "next/navigation";

export default function BuyPage() {
  notFound();
}
