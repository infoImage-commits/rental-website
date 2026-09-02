import type { Metadata } from "next";
import AdminTransferBookingDetailsContent from "@/components/AdminTransferBookingDetailsContent";

export const metadata: Metadata = {
  title: "Transfer Booking Details | Admin",
  description: "View transfer booking details and payment status.",
};

export default async function AdminTransferBookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <AdminTransferBookingDetailsContent id={resolvedParams.id} />;
}
