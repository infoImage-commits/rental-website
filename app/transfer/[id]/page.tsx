import SingleTransferPageContent from "@/components/SingleTransferPageContent";
import { getJourneyBySlug, getJourneyIdBySlug } from "@/lib/api/journeyHelpers";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/transfer/[id]">) {
  const { id } = await params;
  const journey = await getJourneyBySlug(id);

  if (!journey) {
    return {
      title: "Transfer Not Found",
      description: "Book your transfer journey.",
      robots: { index: false, follow: false },
    };
  }

  const route = `${journey.fromLocationName} to ${journey.toLocationName}`;

  return {
    title: journey.name,
    description: `Book a transfer from ${route}. ${journey.description || "View transfer details and complete your booking."}`,
    alternates: {
      canonical: `/transfer/${id}`,
    },
    openGraph: {
      title: `${journey.name} | ${siteConfig.name}`,
      description: `Book a transfer from ${route}.`,
      images: journey.imageUrl ? [{ url: journey.imageUrl }] : [],
    },
  };
}

export default async function SingleTransferPage({ params }: PageProps<"/transfer/[id]">) {
  const { id } = await params;
  const journeyId = await getJourneyIdBySlug(id);
  return <SingleTransferPageContent id={journeyId} />;
}
