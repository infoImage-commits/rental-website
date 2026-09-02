import type { Metadata } from "next";
import AdminBookingDetailsContent from "@/components/AdminBookingDetailsContent";

export const metadata: Metadata = {
  title: "Booking Details | Admin",
  description: "View booking details and create extension requests.",
};

export default async function AdminBookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <AdminBookingDetailsContent id={resolvedParams.id} />;
}
