import type { Metadata } from "next";
import PropertiesPageContent from "@/components/PropertiesPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({ params }: PageProps<"/[locale]/rent">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return {
    title: messages.rent.metadataTitle,
    description: messages.rent.metadataDescription,
    alternates: {
      canonical: `/${locale}/rent`,
    },
    openGraph: {
      title: `${messages.rent.metadataTitle} | ${siteConfig.name}`,
      description: messages.rent.metadataDescription,
      url: `/${locale}/rent`,
    },
  };
}

export default function RentPage() {
  return <PropertiesPageContent />;
}
