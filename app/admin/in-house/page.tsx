import type { Metadata } from "next";
import InHouseBookingsContent from "@/components/InHouseBookingsContent";

export const metadata: Metadata = {
  title: "In-House | Admin",
  description: "View operational unit status and in-house bookings.",
};

export default function InHousePage() {
  return <InHouseBookingsContent />;
}
