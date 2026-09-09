import type { Metadata } from "next";
import BlogsPageContent from "../../components/BlogsPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hurghada Travel & Vacation Rental Guides",
  description:
    "Read Hurghada travel tips, vacation rental advice, neighbourhood guides, and transfer information from Hurghada Vacation Homes.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `Hurghada Travel & Vacation Rental Guides | ${siteConfig.name}`,
    description: "Guides and local tips for planning better Hurghada holidays, vacation stays, and private transfers.",
    url: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsPageContent />;
}
