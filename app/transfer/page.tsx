import type { Metadata } from "next";
import TransferPageContent from "@/components/TransferPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hurghada Private Transfers",
  description:
    "Browse and book private transfers for Hurghada airport, hotels, and Red Sea journeys.",
  alternates: {
    canonical: "/transfer",
  },
  openGraph: {
    title: `Hurghada Private Transfers | ${siteConfig.name}`,
    description: "Book private transfers for Hurghada airport, hotels, and Red Sea trips.",
    url: "/transfer",
  },
};

export default function TransferPage() {
  return <TransferPageContent />;
}
