import type { Metadata } from "next";
import AboutPageContent from "../../components/AboutPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hurghada Vacation Homes",
  description:
    "Learn how Hurghada Vacation Homes helps guests book vacation homes, property stays, and transfers in Hurghada.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: "Trusted local support for vacation homes, property stays, and transfers in Hurghada.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
