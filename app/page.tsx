import type { Metadata } from "next";
import BestLocationsSection from "../components/BestLocationsSection";
import BlogInsightsSection from "../components/BlogInsightsSection";
import CategoriesSection from "../components/CategoriesSection";
import FacilitiesSection from "../components/FacilitiesSection";
import FaqSection from "../components/FaqSection";
import ReviewsSection from "../components/ReviewsSection";
import FeaturedPropertiesSection from "../components/FeaturedPropertiesSection";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import RentalCtaSection from "../components/RentalCtaSection";
import WhoWeAreSection from "../components/WhoWeAreSection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacation Homes & Holiday Rentals in Hurghada",
  description:
    "Discover and book verified holiday vacation homes, apartments, chalets, studios, and private airport transfers in Hurghada with 24/7 local support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Hurghada Vacation Homes & Holiday Rentals`,
    description:
      "Discover and book verified holiday vacation homes, apartments, chalets, studios, and private airport transfers in Hurghada with 24/7 local support.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FacilitiesSection />
      <FeaturedPropertiesSection />
      <BestLocationsSection />
      <BlogInsightsSection />
      <WhoWeAreSection />
      <FaqSection />
      <HowItWorksSection />
      <ReviewsSection />
      <RentalCtaSection />
    </>
  );
}
