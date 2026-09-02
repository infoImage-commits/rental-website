import type { Metadata } from "next";
import BlogEditContent from "@/components/BlogEditContent";

export const metadata: Metadata = {
  title: "Edit Blog | Admin",
  description: "Edit blog details and sections.",
};

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <BlogEditContent id={resolvedParams.id} />;
}
