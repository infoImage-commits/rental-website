import type { Metadata } from "next";
import ContactPageContent from "../../components/ContactPageContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Hurghada Vacation Homes",
  description:
    `Contact ${siteConfig.name} in Hurghada El Kawther by phone or WhatsApp for vacation rentals, buying support, and transfers.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description:
      "Get in touch for Hurghada vacation rentals, property support, and private transfers.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
