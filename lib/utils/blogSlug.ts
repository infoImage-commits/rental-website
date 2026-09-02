import type { BlogItem } from "@/lib/types/blog";
import { slugify } from "@/lib/utils/slugify";

export function getBlogSlug(blog: Pick<BlogItem, "id" | "title">) {
  return slugify(blog.title) || blog.id;
}
