import type { Metadata } from "next";
import BestLocationsSection from "@/components/BestLocationsSection";
import BlogInsightsSection from "@/components/BlogInsightsSection";
import CategoriesSection from "@/components/CategoriesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import FaqSection from "@/components/FaqSection";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InfoAreaHomeSection from "@/components/InfoAreaHomeSection";
import RentalCtaSection from "@/components/RentalCtaSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return {
    title: messages.seo.homeTitle,
    description: messages.seo.homeDescription,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: `${siteConfig.name} | ${messages.seo.homeTitle}`,
      description: messages.seo.homeDescription,
      url: `/${locale}`,
    },
  };
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FacilitiesSection />
      <FeaturedPropertiesSection />
      <BestLocationsSection />
      <InfoAreaHomeSection />
      <BlogInsightsSection />
      <WhoWeAreSection />
      <FaqSection />
      <HowItWorksSection />
      <ReviewsSection />
      <RentalCtaSection />
    </>
  );
}
