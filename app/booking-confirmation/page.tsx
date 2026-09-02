import type { Metadata } from "next";
import BookingConfirmationPageContent from "../../components/BookingConfirmationPageContent";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your rental booking has been successfully confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingConfirmationPage() {
  return <BookingConfirmationPageContent />;
}
