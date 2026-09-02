import type { Metadata } from "next";
import AdminBlogsContent from "@/components/AdminBlogsContent";

export const metadata: Metadata = {
  title: "Blog Management | Admin",
  description: "Create, edit, publish and delete blog posts.",
};

export default function AdminBlogPage() {
  return <AdminBlogsContent />;
}
