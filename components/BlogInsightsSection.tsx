"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useBlogs } from "@/lib/hooks/useBlog";
import type { BlogItem } from "@/lib/types/blog";
import { resolveApiImageUrl } from "@/lib/utils/imageUrl";
import { getBlogSlug } from "@/lib/utils/blogSlug";

const metaIcons = {
  date: "/homepage/blogs/icons/calendar.svg",
};

const fallbackImage = "/homepage/blogs/articles.png";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BlogInsightsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useBlogs({
    IsPublished: true,
    PageNumber: 1,
    PageSize: 3,
    SortBy: "displayOrder",
    IsDescending: false,
  });

  const blogs = data?.items ?? [];

  useEffect(() => {
    const rail = railRef.current;
    const track = rail?.firstElementChild;
    const firstCard = track?.firstElementChild as HTMLElement | null;

    if (!rail || !(track instanceof HTMLElement) || !firstCard) {
      return;
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    rail.scrollLeft = firstCard.offsetWidth + gap;
  }, [blogs.length, isLoading]);

  if (!isLoading && !isError && blogs.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white px-5 py-6 font-[var(--font-poppins)] sm:px-8 sm:py-12 lg:px-20 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading />

        <div className="mt-10 hidden justify-end lg:flex">
          <ViewMoreButton className="w-[162px]" />
        </div>

        {isError ? (
          <div className="mt-12 rounded-2xl border border-[#dfe8e4] bg-[#f5f7f6] px-5 py-8 text-center text-[14px] text-[#667c74]">
            Unable to load blogs right now.
          </div>
        ) : (
          <div
            ref={railRef}
            className="-mx-5 mt-16 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 lg:mx-0 lg:mt-8 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max snap-x items-start gap-[21px] px-[calc((100vw-min(84vw,328px))/2)] lg:w-full lg:justify-center lg:px-0">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => <ArticleSkeleton key={index} />)
                : blogs.map((blog) => (
                    <ArticleCard key={blog.id} blog={blog} />
                  ))}
            </div>
          </div>
        )}

        <div className="mt-6 lg:hidden">
          <ViewMoreButton className="w-full" />
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <div className="mx-auto flex max-w-[730px] flex-col items-center gap-2 text-center lg:gap-[21px]">
      <p className="text-[14px] font-medium uppercase leading-normal tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
        Blogs Articles
      </p>
      <h2 className="text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] lg:text-[36px]">
        Real Estate Insights
      </h2>
      <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
    </div>
  );
}

function ViewMoreButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/blogs"
      className={`inline-flex h-10 items-center justify-center rounded-full border border-[#737373]/70 bg-white px-8 text-[16px] text-[#737373]/70 transition hover:-translate-y-0.5 hover:border-[#2e6f57] hover:text-[#2e6f57] ${className}`}
    >
      View More
    </Link>
  );
}

function ArticleCard({ blog }: { blog: BlogItem }) {
  const imageSrc = resolveApiImageUrl(blog.featuredImageUrl) || fallbackImage;
  const excerpt = blog.summary || blog.content || "Explore the latest rental insights and local property guidance.";

  return (
    <article
      className="group flex min-h-[440px] w-[min(84vw,328px)] shrink-0 snap-center flex-col overflow-hidden rounded-[18px] bg-[#eeeded] shadow-[0_1.5px_5px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1.5 sm:min-h-[500px] sm:w-[380px] lg:min-h-[590px] lg:w-[390px] lg:rounded-3xl lg:shadow-[0_2px_7px_rgba(0,0,0,0.15)] xl:w-[410px]"
    >
      <div className="relative h-[250px] shrink-0 overflow-hidden rounded-t-[18px] bg-[#e4e0da] sm:h-[285px] lg:h-[335px] lg:rounded-t-3xl">
        <Image
          src={imageSrc}
          alt={blog.title}
          fill
          sizes="(min-width: 1024px) 31vw, 302px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-white px-4 py-4 sm:px-5 sm:py-5 lg:px-5 lg:py-5">
        <div className="flex items-center text-[12px] leading-normal text-[#8a9a94] sm:text-[13px] lg:text-[14px]">
          <ArticleMeta icon={metaIcons.date} label={formatDate(blog.createdAtUtc)} />
        </div>

        <div className="mt-3 flex min-w-0 flex-col gap-2 lg:mt-3 lg:gap-2.5">
          <h3 className="line-clamp-2 min-w-0 text-[17px] font-semibold leading-snug text-[#183c2f] [overflow-wrap:anywhere] sm:text-[19px] lg:text-[21px]">
            {blog.title}
          </h3>
          <p className="min-w-0 text-[13px] leading-6 text-[#667c74] [overflow-wrap:anywhere] sm:text-[14px] lg:text-[15px]">
            {excerpt}
          </p>
        </div>

        <ReadArticleLink blog={blog} />
      </div>
    </article>
  );
}

function ReadArticleLink({ blog }: { blog: BlogItem }) {
  return (
    <Link
      href={`/blogs/${getBlogSlug(blog)}`}
      className="mt-auto ml-auto inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-full border border-[#d59e52] bg-white px-5 text-[14px] font-semibold text-[#183c2f] transition hover:-translate-y-0.5 hover:bg-[#f5f7f6] sm:h-11 sm:min-w-[170px] sm:text-[15px] lg:h-11 lg:min-w-[184px] lg:text-[16px]"
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
  );
}

function ArticleSkeleton() {
  return (
    <article
      className="flex min-h-[440px] w-[min(84vw,328px)] shrink-0 snap-center flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_1.5px_5px_rgba(0,0,0,0.15)] sm:min-h-[500px] sm:w-[380px] lg:min-h-[590px] lg:w-[390px] lg:rounded-3xl lg:shadow-[0_2px_7px_rgba(0,0,0,0.15)] xl:w-[410px]"
    >
      <div className="h-[250px] shrink-0 animate-pulse rounded-t-[18px] bg-[#dfe8e4] sm:h-[285px] lg:h-[335px] lg:rounded-t-3xl" />
      <div className="flex flex-1 flex-col gap-3 bg-white px-4 py-4 sm:px-5 sm:py-5">
        <span className="h-3 w-28 animate-pulse rounded bg-[#f0f4f2]" />
        <span className="mt-1 h-5 w-4/5 animate-pulse rounded bg-[#dfe8e4]" />
        <span className="h-4 w-full animate-pulse rounded bg-[#f0f4f2]" />
        <span className="h-4 w-3/4 animate-pulse rounded bg-[#f0f4f2]" />
        <span className="mt-auto ml-auto h-10 w-[150px] animate-pulse rounded-full bg-[#f0f4f2] sm:h-11 sm:w-[170px]" />
      </div>
    </article>
  );
}

function ArticleMeta({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap">
      <Image src={icon} alt="" width={16} height={16} className="size-3 shrink-0 lg:size-4" />
      <span>{label}</span>
    </span>
  );
}
