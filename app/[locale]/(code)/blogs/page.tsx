import type { Metadata } from "next";
import BlogsPageContent from "@/components/BlogsPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";

const copy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Hurghada Travel & Vacation Rental Guides",
    description: "Read Hurghada travel tips, vacation rental advice, neighbourhood guides, and transfer information from Hurghada Vacation Homes.",
  },
  fr: {
    title: "Guides de voyage et locations de vacances à Hurghada",
    description: "Lisez des conseils de voyage, guides de quartier, recommandations de location et informations sur les transferts à Hurghada.",
  },
  de: {
    title: "Reise- und Ferienwohnungsführer für Hurghada",
    description: "Lesen Sie Reisetipps, Ratgeber zu Ferienunterkünften, Stadtteilführer und Transferinformationen für Hurghada.",
  },
  ru: {
    title: "Гиды по путешествиям и аренде жилья в Хургаде",
    description: "Читайте советы о Хургаде, аренде жилья, районах города и трансферах от Hurghada Vacation Homes.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/blogs">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const metadata = copy[locale];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${locale}/blogs`,
    },
    openGraph: {
      title: `${metadata.title} | ${siteConfig.name}`,
      description: metadata.description,
      url: `/${locale}/blogs`,
    },
  };
}

export default function BlogsPage() {
  return <BlogsPageContent />;
}
