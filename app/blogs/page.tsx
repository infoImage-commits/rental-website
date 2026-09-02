import type { Metadata } from "next";
import BlogsPageContent from "../../components/BlogsPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hurghada Travel & Property Blog",
  description:
    "Read Hurghada travel, vacation rental, property, and transfer guides from Hurghada Vacation Homes.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `Hurghada Travel & Property Blog | ${siteConfig.name}`,
    description: "Guides for planning better Hurghada stays, rentals, property decisions, and transfers.",
    url: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsPageContent />;
}
