import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";

const copy: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  en: {
    title: "About Hurghada Vacation Homes",
    description:
      "Learn how Hurghada Vacation Homes connects travelers with handpicked holiday apartments, chalets, and private airport transfers in Hurghada.",
    ogTitle: `About ${siteConfig.name} | Vacation Homes & Holiday Rentals`,
    ogDescription: "Trusted local hosts for verified vacation homes, beachside chalets, and private transfers in Hurghada.",
  },
  fr: {
    title: "À propos de Hurghada Vacation Homes",
    description:
      "Découvrez comment Hurghada Vacation Homes aide les voyageurs à trouver des appartements, chalets et transferts privés à Hurghada.",
    ogTitle: `À propos de ${siteConfig.name} | Locations de vacances`,
    ogDescription: "Des hôtes locaux de confiance pour des locations vérifiées et des transferts privés à Hurghada.",
  },
  de: {
    title: "Über Hurghada Vacation Homes",
    description:
      "Erfahren Sie, wie Hurghada Vacation Homes Reisende mit handverlesenen Ferienwohnungen, Chalets und privaten Transfers in Hurghada verbindet.",
    ogTitle: `Über ${siteConfig.name} | Ferienunterkünfte`,
    ogDescription: "Verlässliche lokale Gastgeber für geprüfte Ferienunterkünfte und private Transfers in Hurghada.",
  },
  ru: {
    title: "О Hurghada Vacation Homes",
    description:
      "Узнайте, как Hurghada Vacation Homes помогает путешественникам находить проверенные апартаменты, шале и частные трансферы в Хургаде.",
    ogTitle: `О ${siteConfig.name} | Аренда для отдыха`,
    ogDescription: "Надежные местные хозяева, проверенное жилье и частные трансферы в Хургаде.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const metadata = copy[locale];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${locale}/about`,
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `/${locale}/about`,
    },
  };
}

export default function AboutPage() {
  return <AboutPageContent />;
}
