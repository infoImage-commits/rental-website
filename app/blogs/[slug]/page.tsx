import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogSinglePageContent from "../../../components/BlogSinglePageContent";
import { getBlogBySlug, getBlogStaticParams, getRelatedBlogs } from "@/lib/api/blogHelpers";
import { siteConfig } from "@/lib/site";

type BlogSinglePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogSinglePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: blog.title,
    description:
      blog.summary ||
      blog.content?.slice(0, 160) ||
      "Read Hurghada travel, vacation rental, and property insights.",
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: `${blog.title} | ${siteConfig.name}`,
      description:
        blog.summary ||
        blog.content?.slice(0, 160) ||
        "Read Hurghada travel, vacation rental, and property insights.",
    },
  };
}

export async function generateStaticParams() {
  return getBlogStaticParams();
}

export default async function BlogSinglePage({ params }: BlogSinglePageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id);

  return <BlogSinglePageContent blog={blog} relatedBlogs={relatedBlogs} />;
}
