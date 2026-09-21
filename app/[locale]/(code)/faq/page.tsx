import type { Metadata } from "next";
import FaqPageContent from "@/components/FaqPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";

const copy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Frequently Asked Questions",
    description: "Find answers about Hurghada vacation rentals, booking, payments, private transfers, and property support.",
  },
  fr: {
    title: "Questions fréquentes",
    description: "Trouvez des réponses sur les locations, réservations, paiements, transferts privés et services à Hurghada.",
  },
  de: {
    title: "Häufig gestellte Fragen",
    description: "Antworten zu Ferienunterkünften, Buchungen, Zahlungen, privaten Transfers und Support in Hurghada.",
  },
  ru: {
    title: "Частые вопросы",
    description: "Ответы о бронировании жилья, оплате, частных трансферах и поддержке в Хургаде.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const metadata = copy[locale];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${locale}/faq`,
    },
    openGraph: {
      title: `${metadata.title} | ${siteConfig.name}`,
      description: metadata.description,
      url: `/${locale}/faq`,
    },
  };
}

export default function FaqPage() {
  return <FaqPageContent />;
}
