import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogSinglePageContent from "@/components/BlogSinglePageContent";
import { getBlogBySlug, getBlogStaticParams, getRelatedBlogs } from "@/lib/api/blogHelpers";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";

type BlogSinglePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogSinglePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: locale === "fr" ? "Article introuvable" : locale === "de" ? "Blog nicht gefunden" : locale === "ru" ? "Статья не найдена" : "Blog Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: blog.title,
    description:
      blog.summary ||
      blog.content?.slice(0, 160) ||
      locale === "fr"
        ? "Lisez des conseils de voyage et de location à Hurghada."
        : locale === "de"
          ? "Lesen Sie Reisetipps und Einblicke zu Ferienunterkünften in Hurghada."
          : locale === "ru"
            ? "Читайте советы о путешествиях и жилье в Хургаде."
            : "Read Hurghada travel, vacation rental, and property insights.",
    alternates: {
      canonical: `/${locale}/blogs/${slug}`,
    },
    openGraph: {
      title: `${blog.title} | ${siteConfig.name}`,
      description:
        blog.summary ||
        blog.content?.slice(0, 160) ||
        locale === "fr"
          ? "Lisez des conseils de voyage et de location à Hurghada."
          : locale === "de"
            ? "Lesen Sie Reisetipps und Einblicke zu Ferienunterkünften in Hurghada."
            : locale === "ru"
              ? "Читайте советы о путешествиях и жилье в Хургаде."
              : "Read Hurghada travel, vacation rental, and property insights.",
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
