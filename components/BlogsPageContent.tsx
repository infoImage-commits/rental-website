"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";
import { useBlogs } from "@/lib/hooks/useBlog";
import type { BlogItem } from "@/lib/types/blog";
import { resolveApiImageUrl } from "@/lib/utils/imageUrl";
import { getBlogSlug } from "@/lib/utils/blogSlug";

const metaIcons = {
  date: "/homepage/blogs/icons/calendar.svg",
};

const fallbackImage = "/blogs/articles.png";
const pageSize = 6;
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const cardMotion: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.99,
    transition: { duration: 0.18, ease: smoothEase },
  },
};
const gridMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};
const panelMotion: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.16, ease: smoothEase },
  },
};
const ctaBackgroundMotion: Variants = {
  hidden: { opacity: 0.85, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: smoothEase },
  },
};
const ctaOverlayMotion: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: smoothEase },
  },
};
const ctaContentMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};
const ctaItemMotion: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages] as const;
  if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages] as const;
}

export default function BlogsPageContent() {
  const [page, setPage] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? false : "hidden";
  const { data, isLoading, isError, isFetching } = useBlogs({
    IsPublished: true,
    PageNumber: page,
    PageSize: pageSize,
    SortBy: "displayOrder",
    IsDescending: false,
  });

  const blogs = data?.items ?? [];

  return (
    <main className="bg-white font-[var(--font-poppins)]">
      <section className="px-5 pb-10 pt-7 sm:px-8 sm:pb-12 lg:px-20 lg:pb-16 lg:pt-[58px]">
        <div className="mx-auto max-w-[1281px]">
          <PageHeader initialState={initialState} />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="blogs-loading"
                variants={panelMotion}
                initial={initialState}
                animate="visible"
                exit="exit"
              >
                <BlogGrid>
                  {Array.from({ length: pageSize }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
                  ))}
                </BlogGrid>
              </motion.div>
            ) : isError ? (
              <StatePanel
                key="blogs-error"
                initialState={initialState}
                title="Unable to load blogs"
                description="Check your connection and try again in a moment."
              />
            ) : blogs.length === 0 ? (
              <StatePanel
                key="blogs-empty"
                initialState={initialState}
                title="No blogs published yet"
                description="Published articles will appear here once they are available."
              />
            ) : (
              <motion.div
                key={`blogs-page-${data?.pageNumber ?? page}`}
                variants={panelMotion}
                initial={initialState}
                animate="visible"
                exit="exit"
              >
                <BlogGrid>
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} shouldReduceMotion={!!shouldReduceMotion} />
                  ))}
                </BlogGrid>

                <BlogPagination
                  currentPage={data?.pageNumber ?? page}
                  totalPages={data?.totalPages ?? 1}
                  hasPreviousPage={!!data?.hasPreviousPage}
                  hasNextPage={!!data?.hasNextPage}
                  isFetching={isFetching}
                  initialState={initialState}
                  onPageChange={setPage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <PropertyCta initialState={initialState} />
    </main>
  );
}

function PageHeader({ initialState }: { initialState: false | "hidden" }) {
  return (
    <motion.div
      variants={panelMotion}
      initial={initialState}
      animate="visible"
      className="flex flex-col items-start gap-3 lg:gap-6"
    >
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[16px] font-semibold leading-[14px]">
        <Link href="/" className="text-[#667c74] transition hover:text-[#2e6f57]">
          Home
        </Link>
        <span className="text-[#667c74]">&gt;</span>
        <span className="text-[#183c2f]">Blog</span>
      </nav>

      <h1 className="text-[28px] font-semibold leading-tight text-[#2e6f57] lg:text-[42px]">
        Real Estate Insights
      </h1>
    </motion.div>
  );
}

function BlogGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={gridMotion}
      className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[21px] lg:gap-y-10"
    >
      {children}
    </motion.div>
  );
}

function BlogCard({ blog, shouldReduceMotion }: { blog: BlogItem; shouldReduceMotion: boolean }) {
  const imageSrc = resolveApiImageUrl(blog.featuredImageUrl) || fallbackImage;
  const excerpt = blog.summary || blog.content || "Explore the latest rental insights and local property guidance.";

  return (
    <motion.article
      variants={cardMotion}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className="group flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(31,77,61,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(31,77,61,0.16)] lg:min-h-[560px] lg:rounded-3xl"
    >
      <div className="relative h-[260px] shrink-0 overflow-hidden bg-[#e4e0da] sm:h-[280px] lg:h-[315px]">
        <Image
          src={imageSrc}
          alt={blog.title}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 py-5 lg:px-6 lg:py-6">
        <ArticleMeta icon={metaIcons.date} label={formatDate(blog.createdAtUtc)} />

        <div className="mt-3 flex min-w-0 flex-col gap-2.5">
          <h2 className="line-clamp-2 min-w-0 text-[20px] font-semibold leading-snug text-[#183c2f] [overflow-wrap:anywhere] lg:text-[22px]">
            {blog.title}
          </h2>
          <p className="min-w-0 text-[14px] leading-6 text-[#667c74] [overflow-wrap:anywhere] lg:text-[15px]">
            {excerpt}
          </p>
        </div>

        <Link
          href={`/blogs/${getBlogSlug(blog)}`}
          className="mt-auto ml-auto inline-flex h-11 min-w-[170px] items-center justify-center gap-2 rounded-full border border-[#d59e52] bg-white px-5 text-[15px] font-semibold text-[#183c2f] transition hover:-translate-y-0.5 hover:bg-[#f5f7f6] lg:min-w-[184px] lg:text-[16px]"
        >
          <span>Read Article</span>
          <Image
            src="/homepage/blogs/icons/arrow.svg"
            alt=""
            width={24}
            height={24}
            className="size-5 -scale-x-100 transition group-hover:translate-x-1 lg:size-6"
          />
        </Link>
      </div>
    </motion.article>
  );
}

function BlogCardSkeleton() {
  return (
    <motion.article
      variants={cardMotion}
      className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(31,77,61,0.12)] lg:min-h-[560px] lg:rounded-3xl"
    >
      <div className="h-[260px] shrink-0 animate-pulse bg-[#dfe8e4] sm:h-[280px] lg:h-[315px]" />
      <div className="flex flex-1 flex-col gap-4 px-5 py-5 lg:px-6 lg:py-6">
        <span className="h-3 w-28 animate-pulse rounded bg-[#f0f4f2]" />
        <span className="h-6 w-4/5 animate-pulse rounded bg-[#dfe8e4]" />
        <span className="h-4 w-full animate-pulse rounded bg-[#f0f4f2]" />
        <span className="h-4 w-full animate-pulse rounded bg-[#f0f4f2]" />
        <span className="h-4 w-3/4 animate-pulse rounded bg-[#f0f4f2]" />
        <span className="mt-auto ml-auto h-11 w-[170px] animate-pulse rounded-full bg-[#f0f4f2]" />
      </div>
    </motion.article>
  );
}

function ArticleMeta({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 text-[13px] text-[#8a9a94] lg:text-[14px]">
      <Image src={icon} alt="" width={16} height={16} className="size-4 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

function StatePanel({
  title,
  description,
  initialState,
}: {
  title: string;
  description: string;
  initialState: false | "hidden";
}) {
  return (
    <motion.div
      variants={panelMotion}
      initial={initialState}
      animate="visible"
      exit="exit"
      className="mt-9 rounded-3xl border border-[#dfe8e4] bg-[#f5f7f6] px-6 py-16 text-center"
    >
      <p className="text-[18px] font-semibold text-[#183c2f]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-[14px] leading-6 text-[#667c74]">{description}</p>
    </motion.div>
  );
}

function BlogPagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  isFetching,
  initialState,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFetching: boolean;
  initialState: false | "hidden";
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <motion.nav
      aria-label="Blog pagination"
      variants={panelMotion}
      initial={initialState}
      animate="visible"
      className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:mt-12"
    >
      <PaginationArrow
        direction="prev"
        disabled={!hasPreviousPage || isFetching}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`${page}-${index}`} className="px-1 text-[16px] leading-[1.6] text-[#667c74]">
            ...
          </span>
        ) : (
          <motion.button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            disabled={isFetching}
            onClick={() => onPageChange(page)}
            whileTap={{ scale: 0.94 }}
            className={`grid size-10 place-items-center rounded-full text-[14px] font-semibold leading-none transition disabled:cursor-not-allowed disabled:opacity-60 ${
              page === currentPage
                ? "bg-[#2e6f57] text-white"
                : "border border-[#c0c8c6] text-[#414847] hover:border-[#2e6f57] hover:text-[#2e6f57]"
            }`}
          >
            {page}
          </motion.button>
        ),
      )}

      <PaginationArrow
        direction="next"
        disabled={!hasNextPage || isFetching}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    </motion.nav>
  );
}

function PaginationArrow({
  direction,
  disabled = false,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`${direction === "prev" ? "Previous" : "Next"} blog page`}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`grid size-10 place-items-center rounded-full border border-[#c0c8c6] transition disabled:cursor-not-allowed disabled:opacity-50 ${
        disabled ? "" : "hover:border-[#2e6f57]"
      }`}
    >
      <Image
        src="/homepage/blogs/icons/arrow.svg"
        alt=""
        width={14}
        height={14}
        className={`h-[10px] w-[7px] ${direction === "next" ? "-scale-x-100" : ""}`}
      />
    </motion.button>
  );
}

function PropertyCta({ initialState }: { initialState: false | "hidden" }) {
  return (
    <motion.section
      variants={panelMotion}
      initial={initialState}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative min-h-[320px] overflow-hidden lg:min-h-[432px]"
    >
      <motion.div variants={ctaBackgroundMotion} className="absolute inset-0">
        <Image
          src="/blogs/cta-background.png"
          alt=""
          width={1128}
          height={1024}
          sizes="100vw"
          className="absolute left-0 w-full max-w-none"
          style={{ top: "-25.23%", height: "305.14%" }}
        />
      </motion.div>
      <motion.div variants={ctaOverlayMotion} className="absolute inset-0 bg-black/25" />

      <motion.div
        variants={ctaContentMotion}
        className="relative mx-auto flex min-h-[320px] max-w-[1050px] flex-col items-center justify-center px-5 py-14 text-center text-white sm:px-8 lg:min-h-[432px] lg:py-20"
      >
        <motion.h2 variants={ctaItemMotion} className="text-[30px] font-semibold leading-[1.12] sm:text-[38px] lg:text-[48px]">
          Find Your Perfect Property
        </motion.h2>
        <motion.p variants={ctaItemMotion} className="mt-4 max-w-[1001px] text-[14px] leading-[1.45] sm:text-[17px] lg:text-[20px]">
          Whether you&apos;re looking for a short stay, a long-term rental, or a property to buy, we&apos;re here to
          make your search simple and seamless. Explore our carefully selected properties across Egypt and find a space
          that fits your lifestyle, needs, and plans.
        </motion.p>
        <motion.div
          variants={ctaItemMotion}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 w-[min(100%,304px)]"
        >
          <Link
            href="/rent"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium tracking-[-0.05em] text-[#2e6f57] transition hover:bg-[#f5f5f5] lg:h-[52px] lg:text-[20px]"
          >
            Explore Properties
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
