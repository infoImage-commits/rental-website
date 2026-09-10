import type { Metadata } from "next";
import AdminReservationsContent from "@/components/AdminReservationsContent";

export const metadata: Metadata = {
  title: "In-House | Admin",
  description: "Today's in-house guests, unit availability, and live occupancy.",
};

export default function ReservationsPage() {
  return <AdminReservationsContent />;
}
