import type { Metadata } from "next";
import AdminsContent from "../../../components/AdminsContent";

export const metadata: Metadata = {
  title: "Admins Management | Admin",
  description: "Create and manage admin accounts and permissions.",
};

export default function AdminsPage() {
  return <AdminsContent />;
}
