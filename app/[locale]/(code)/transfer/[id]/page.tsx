import SingleTransferPageContent from "@/components/SingleTransferPageContent";
import { getJourneyBySlug, getJourneyIdBySlug } from "@/lib/api/journeyHelpers";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);
  const journey = await getJourneyBySlug(id);

  if (!journey) {
    return {
      title: messages.transfer.notFoundTitle,
      description: messages.transfer.notFoundDescription,
      robots: { index: false, follow: false },
    };
  }

  const route = `${journey.fromLocationName} to ${journey.toLocationName}`;

  return {
    title: journey.name,
    description: messages.transfer.metaDescription
      .replace("{route}", route)
      .replace("{description}", journey.description || messages.transfer.fallbackDescription),
    alternates: {
      canonical: `/${locale}/transfer/${id}`,
    },
    openGraph: {
      title: `${journey.name} | ${siteConfig.name}`,
      description: messages.transfer.metaDescription
        .replace("{route}", route)
        .replace("{description}", ""),
      images: journey.imageUrl ? [{ url: journey.imageUrl }] : [],
    },
  };
}

export default async function SingleTransferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const journeyId = await getJourneyIdBySlug(id);
  return <SingleTransferPageContent id={journeyId} />;
}
