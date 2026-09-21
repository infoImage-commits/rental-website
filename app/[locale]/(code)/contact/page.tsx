import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return {
    title: messages.contact.metadataTitle,
    description: messages.contact.metadataDescription,
    alternates: {
      canonical: `/${locale}/contact`,
    },
    openGraph: {
      title: `${messages.common.contact} ${siteConfig.name}`,
      description: messages.contact.metadataDescription,
      url: `/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactPageContent />;
}
