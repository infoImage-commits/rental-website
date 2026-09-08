import type { Metadata } from "next";
import AdminCreateBookingContent from "@/components/AdminCreateBookingContent";

export const metadata: Metadata = {
  title: "Create Booking | Admin",
  description: "Create a confirmed property booking from the admin.",
};

export default function AdminCreateBookingPage() {
  return <AdminCreateBookingContent />;
}
