import type { Metadata } from "next";
import InHouseBookingsContent from "@/components/InHouseBookingsContent";

export const metadata: Metadata = {
  title: "Reservations | Admin",
  description: "View reservation lists and booking status by date range.",
};

export default function InHousePage() {
  return <InHouseBookingsContent />;
}
