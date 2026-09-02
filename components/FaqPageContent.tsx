"use client";

import { useState } from "react";
import Link from "next/link";
import { useFaqs } from "@/lib/hooks/useFaq";
import FaqAccordion from "./FaqAccordion";

const PAGE_STEP = 10;

export default function FaqPageContent() {
  const [pageSize, setPageSize] = useState(PAGE_STEP);

  const { data, isLoading, isFetching, isError } = useFaqs({
    IsPublished: true,
    PageNumber: 1,
    PageSize: pageSize,
    SortBy: "displayOrder",
    IsDescending: false,
  });

  const faqs = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const hasMore = faqs.length < totalCount;

  return (
    <div className="font-[var(--font-poppins)]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#1b634f] px-5 py-20 text-white sm:px-8 lg:px-20 lg:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 size-72 rounded-full bg-[#d9a441]/10" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#d9a441] lg:text-[16px]">
            Help Centre
          </p>
          <h1 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] lg:text-[52px]">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] text-[14px] leading-[1.7] text-white/70 lg:mt-6 lg:text-[18px]">
            Browse answers to the most common questions about our rental platform,
            booking process, payments, and property management.
          </p>

          {/* Breadcrumb */}
          <nav className="mt-8 flex items-center justify-center gap-2 text-[13px] text-white/50">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">FAQ</span>
          </nav>
        </div>
      </section>

      {/* FAQ List */}
      <section className="bg-[#f5f7f6] px-5 py-14 sm:px-8 sm:py-20 lg:px-20">
        <div className="mx-auto max-w-[900px]">

          {/* Loading skeleton */}
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[60px] animate-pulse rounded-2xl bg-white shadow-[2px_1px_2.5px_rgba(0,0,0,0.08)]"
                  style={{ opacity: 1 - i * 0.08 }}
                />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm">
              <div className="grid size-16 place-items-center rounded-full bg-red-50 text-red-400 mb-4">
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-[16px] font-semibold text-[#183c2f]">Failed to load FAQs</p>
              <p className="mt-1 text-[14px] text-[#667c74]">Please try refreshing the page.</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm">
              <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[16px] font-semibold text-[#183c2f]">No FAQs available yet</p>
              <p className="mt-1 text-[14px] text-[#667c74]">Check back soon — we&apos;re updating our help content.</p>
            </div>
          ) : (
            <>
              {/* Count */}
              <p className="mb-6 text-[13px] text-[#8a9a94]">
                Showing {faqs.length} of {totalCount} question{totalCount !== 1 ? "s" : ""}
              </p>

              {/* Accordion */}
              <FaqAccordion items={faqs} />

              {/* Load More */}
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    disabled={isFetching}
                    onClick={() => setPageSize((s) => s + PAGE_STEP)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#2e6f57] px-8 text-[14px] font-semibold text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white disabled:opacity-70 disabled:cursor-not-allowed lg:text-[16px]"
                  >
                    {isFetching ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-[#2e6f57]/30 border-t-[#2e6f57]" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Questions
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* All loaded message */}
              {!hasMore && totalCount > PAGE_STEP && (
                <p className="mt-8 text-center text-[13px] text-[#8a9a94]">
                  You&apos;ve seen all {totalCount} questions!
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-20">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="text-[22px] font-semibold leading-snug text-[#183c2f] lg:text-[32px]">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-[1.7] text-[#667c74] lg:text-[16px]">
            Our team is always happy to help. Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#2e6f57] px-7 text-[14px] font-semibold text-white transition hover:bg-[#255f49] shadow-md hover:shadow-lg"
            >
              Contact Us
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#dfe8e4] px-7 text-[14px] font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
