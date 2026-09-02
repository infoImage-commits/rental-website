import type { Metadata } from "next";
import BlogCreateContent from "@/components/BlogCreateContent";

export const metadata: Metadata = {
  title: "Create Blog | Admin",
  description: "Create a new blog post.",
};

export default function BlogCreatePage() {
  return <BlogCreateContent />;
}
