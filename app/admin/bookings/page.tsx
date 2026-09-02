import type { Metadata } from "next";
import AdminBookingsContent from "@/components/AdminBookingsContent";

export const metadata: Metadata = {
  title: "Bookings | Admin",
  description: "View and filter property bookings.",
};

export default function AdminBookingsPage() {
  return <AdminBookingsContent />;
}
