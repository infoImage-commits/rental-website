import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Properties",
  description: "Hurghada Vacation Homes",
  robots: { index: false, follow: false },
};

export default function BuyPage() {
  notFound();
}
