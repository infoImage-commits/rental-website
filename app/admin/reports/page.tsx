import type { Metadata } from "next";
import ReportsContent from "@/components/ReportsContent";

export const metadata: Metadata = {
  title: "Reports | Admin",
  description: "Download arrival, departure, and in-house booking reports.",
};

export default function ReportsPage() {
  return <ReportsContent />;
}
