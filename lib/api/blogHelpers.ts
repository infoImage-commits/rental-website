import { API_BASE_URL } from "@/lib/api/config";
import type { BlogApiResponse, BlogItem, PaginatedBlogsResponse } from "@/lib/types/blog";
import { getBlogSlug } from "@/lib/utils/blogSlug";

async function getPublishedBlogs() {
  const params = new URLSearchParams({
    IsPublished: "true",
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "displayOrder",
    IsDescending: "false",
  });

  const res = await fetch(`${API_BASE_URL}/api/blogs?${params.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as BlogApiResponse<PaginatedBlogsResponse<BlogItem>>;
  return json.data?.items ?? [];
}

export async function getRelatedBlogs(currentBlogId: string, limit = 3) {
  const blogs = await getPublishedBlogs();

  return blogs
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, limit);
}

export async function getBlogStaticParams() {
  const blogs = await getPublishedBlogs();

  return blogs
    .map((blog) => ({ slug: getBlogSlug(blog) }))
    .filter(({ slug }) => Boolean(slug));
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getPublishedBlogs();
  const match = blogs.find((blog) => blog.id === slug || getBlogSlug(blog) === slug);

  if (!match) return null;

  const res = await fetch(`${API_BASE_URL}/api/blogs/${match.id}?incrementViewCount=true`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return match;

  const json = (await res.json()) as BlogApiResponse<BlogItem>;
  return json.data ?? match;
}
