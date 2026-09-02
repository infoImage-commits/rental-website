import type { Metadata } from "next";
import AdminTransferBookingsContent from "@/components/AdminTransferBookingsContent";

export const metadata: Metadata = {
  title: "Transfer Bookings | Admin",
  description: "View and filter transfer bookings.",
};

export default function AdminTransferBookingsPage() {
  return <AdminTransferBookingsContent />;
}
