import type { Metadata } from "next";
import TransferPageContent from "@/components/TransferPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({ params }: PageProps<"/[locale]/transfer">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return {
    title: messages.transfer.metadataTitle,
    description: messages.transfer.metadataDescription,
    alternates: {
      canonical: `/${locale}/transfer`,
    },
    openGraph: {
      title: `${messages.transfer.metadataTitle} | ${siteConfig.name}`,
      description: messages.transfer.metadataDescription,
      url: `/${locale}/transfer`,
    },
  };
}

export default function TransferPage() {
  return <TransferPageContent />;
}
