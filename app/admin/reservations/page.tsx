import type { Metadata } from "next";
import AdminReservationsContent from "@/components/AdminReservationsContent";

export const metadata: Metadata = {
  title: "Reservations | Admin",
  description: "Today's in-house guest reservations, unit availability, and live occupancy.",
};

export default function ReservationsPage() {
  return <AdminReservationsContent />;
}
