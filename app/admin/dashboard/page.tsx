import type { Metadata } from "next";
import AdminDashboardContent from "../../../components/AdminDashboardContent";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Hurghada Vacation Homes admin dashboard.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
