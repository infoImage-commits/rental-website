"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { BlogItem, BlogSection } from "@/lib/types/blog";
import { getBlogSlug } from "@/lib/utils/blogSlug";
import { resolveApiImageUrl } from "@/lib/utils/imageUrl";

const fallbackHeroImage = "/blog-single/hero.png";
const fallbackCardImage = "/blogs/articles.png";
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: smoothEase },
  },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export default function BlogSinglePageContent({
  blog,
  relatedBlogs = [],
}: {
  blog: BlogItem;
  relatedBlogs?: BlogItem[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const heroImage = resolveApiImageUrl(blog.featuredImageUrl) || fallbackHeroImage;
  const sections = [...(blog.blogSections ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);
  const introParagraphs = splitParagraphs(blog.content || blog.summary || "No article content has been added yet.");
  const initial = shouldReduceMotion ? undefined : "hidden";
  const animate = shouldReduceMotion ? undefined : "visible";
  const viewport = { once: true, amount: 0.2 };

  return (
    <main className="overflow-hidden bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <motion.article
        variants={shouldReduceMotion ? undefined : container}
        initial={initial}
        animate={animate}
        className="px-5 pb-14 pt-7 sm:px-8 sm:pb-16 lg:px-20 lg:pb-20 lg:pt-12"
      >
        <div className="mx-auto max-w-[1120px]">
          <motion.header variants={fadeUp} className="flex flex-col gap-6">
            <BlogBreadcrumb title={blog.title} />

            <div className="max-w-[900px]">
              <h1 className="text-[28px] font-semibold leading-tight text-[#2e6f57] sm:text-[38px] lg:text-[48px]">
                {blog.title}
              </h1>
              {blog.summary && (
                <p className="mt-4 max-w-[820px] text-[15px] leading-7 text-[#667c74] sm:text-[17px] lg:text-[20px] lg:leading-9">
                  {blog.summary}
                </p>
              )}
            </div>

            <ArticleMeta date={blog.createdAtUtc} />

            <motion.div
              variants={fadeUp}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e4e0da] shadow-[0_16px_40px_rgba(31,77,61,0.12)] sm:aspect-[16/8] lg:rounded-3xl"
            >
              <Image
                src={heroImage}
                alt={blog.title}
                fill
                priority
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.header>

          <motion.div
            variants={shouldReduceMotion ? undefined : container}
            initial={initial}
            whileInView={animate}
            viewport={viewport}
            className="mt-9 max-w-[900px] space-y-5 text-[15px] leading-7 text-[#656566] sm:text-[17px] lg:mt-12 lg:text-[19px] lg:leading-9"
          >
            {introParagraphs.map((paragraph, index) => (
              <motion.p key={`${paragraph}-${index}`} variants={fadeUp}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-20">
            {sections.map((section) => (
              <ArticleSection key={section.id} section={section} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>

          <RelatedBlogs blogs={relatedBlogs} shouldReduceMotion={shouldReduceMotion} />
        </div>
      </motion.article>
    </main>
  );
}

function BlogBreadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 flex-wrap items-center gap-2 text-[13px] font-medium leading-6 text-[#667c74] sm:text-[15px]"
    >
      <Image src="/blog-single/icons/bookmark.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
      <Link href="/" className="transition hover:text-[#2e6f57]">
        Home
      </Link>
      <span>/</span>
      <Link href="/blogs" className="transition hover:text-[#2e6f57]">
        Blogs
      </Link>
      <span>/</span>
      <span className="min-w-0 max-w-full truncate text-[#183c2f]">{title}</span>
    </nav>
  );
}

function ArticleMeta({ date }: { date: string }) {
  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f5f7f6] px-4 py-2 text-[13px] font-medium text-[#667c74] sm:text-[14px]">
      <Image src="/blog-single/icons/calendar.svg" alt="" width={18} height={18} className="size-[18px] shrink-0" />
      <span>{formatDate(date)}</span>
    </div>
  );
}

function ArticleSection({
  section,
  shouldReduceMotion,
}: {
  section: BlogSection;
  shouldReduceMotion: boolean | null;
}) {
  const paragraphs = splitParagraphs(section.content);
  const imageSrc = resolveApiImageUrl(section.imageUrl);

  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      className="max-w-[980px]"
    >
      {imageSrc && (
        <motion.div
          variants={fadeUp}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e4e0da] shadow-[0_12px_32px_rgba(31,77,61,0.1)] sm:aspect-[16/7] lg:rounded-3xl"
        >
          <Image
            src={imageSrc}
            alt={section.title}
            fill
            sizes="(min-width: 1024px) 980px, 100vw"
            className="object-cover"
          />
        </motion.div>
      )}

      <motion.div variants={fadeUp} className={imageSrc ? "mt-7" : ""}>
        {section.sectionType && (
          <p className="mb-2 text-[12px] font-semibold uppercase text-[#cfb072] sm:text-[13px]">
            {section.sectionType}
          </p>
        )}
        <h2 className="text-[23px] font-semibold leading-tight text-[#2e6f57] sm:text-[30px] lg:text-[34px]">
          {section.title}
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        className="mt-5 space-y-5 text-[15px] leading-7 text-[#656566] sm:text-[17px] lg:text-[19px] lg:leading-9"
      >
        {paragraphs.map((paragraph, index) => (
          <motion.p key={`${section.id}-${index}`} variants={fadeUp}>
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </motion.section>
  );
}

function RelatedBlogs({
  blogs,
  shouldReduceMotion,
}: {
  blogs: BlogItem[];
  shouldReduceMotion: boolean | null;
}) {
  if (blogs.length === 0) return null;

  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      className="mt-16 border-t border-[#e8f0ec] pt-10 lg:mt-20 lg:pt-14"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <p className="text-[13px] font-semibold uppercase text-[#cfb072]">Related Blogs</p>
        <h2 className="text-[26px] font-semibold leading-tight text-[#2e6f57] sm:text-[32px]">
          Keep Reading
        </h2>
      </motion.div>

      <motion.div variants={container} className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((relatedBlog) => (
          <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} shouldReduceMotion={shouldReduceMotion} />
        ))}
      </motion.div>
    </motion.section>
  );
}

function RelatedBlogCard({
  blog,
  shouldReduceMotion,
}: {
  blog: BlogItem;
  shouldReduceMotion: boolean | null;
}) {
  const imageSrc = resolveApiImageUrl(blog.featuredImageUrl) || fallbackCardImage;
  const excerpt = blog.summary || blog.content || "Explore the latest rental insights and local property guidance.";

  return (
    <motion.article
      variants={fadeUp}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(31,77,61,0.1)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(31,77,61,0.16)]"
    >
      <Link href={`/blogs/${getBlogSlug(blog)}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e4e0da]">
          <Image
            src={imageSrc}
            alt={blog.title}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[12px] font-medium text-[#8a9a94]">{formatDate(blog.createdAtUtc)}</p>
          <h3 className="mt-3 line-clamp-2 text-[18px] font-semibold leading-snug text-[#183c2f]">
            {blog.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-[#667c74]">
            {excerpt}
          </p>
          <span className="mt-5 inline-flex text-[14px] font-semibold text-[#2e6f57]">
            Read Article
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function splitParagraphs(text: string) {
  return text
    .split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
