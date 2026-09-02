import type { Metadata } from "next";
import FaqPageContent from "../../components/FaqPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers about Hurghada vacation rentals, booking, payments, private transfers, and property support.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Frequently Asked Questions | ${siteConfig.name}`,
    description: "Answers about vacation rentals, transfers, booking, and payment support in Hurghada.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return <FaqPageContent />;
}
