import type { Metadata } from "next";
import AdminReviewsContent from "../../../components/AdminReviewsContent";

export const metadata: Metadata = {
  title: "Property Reviews | Admin",
  description: "Browse, inspect, and manage guest reviews for completed stays.",
};

export default function AdminReviewsPage() {
  return <AdminReviewsContent />;
}
