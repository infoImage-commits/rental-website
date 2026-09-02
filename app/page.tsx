import type { Metadata } from "next";
import BestLocationsSection from "../components/BestLocationsSection";
import BlogInsightsSection from "../components/BlogInsightsSection";
import CategoriesSection from "../components/CategoriesSection";
import FaqSection from "../components/FaqSection";
import FeaturedPropertiesSection from "../components/FeaturedPropertiesSection";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import RentalCtaSection from "../components/RentalCtaSection";
import WhoWeAreSection from "../components/WhoWeAreSection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacation Homes & Private Transfers in Hurghada",
  description:
    "Find holiday apartments, villas, homes, and private transfers in Hurghada El Kawther with local booking support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Hurghada Vacation Homes & Private Transfers`,
    description:
      "Book vacation homes, villas, apartments, and private transfers in Hurghada with local support.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedPropertiesSection />
      <BestLocationsSection />
      <BlogInsightsSection />
      <WhoWeAreSection />
      <HowItWorksSection />
      <FaqSection />
      <RentalCtaSection />
    </>
  );
}
