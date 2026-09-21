"use client";

import { motion } from "framer-motion";
import { useReviews } from "@/lib/hooks/useReview";
import { useI18n } from "@/components/I18nProvider";

function StarRow({ rate }: { rate: number }) {
  const full = Math.min(5, Math.max(0, Math.round(rate)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`size-4 shrink-0 ${i < full ? "text-[#cfb072]" : "text-[#e2ddd5]"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1.5 text-[13px] font-semibold text-[#cfb072]">{rate.toFixed(1)}</span>
    </div>
  );
}

function ReviewCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#f0ede8] bg-white p-6 shadow-[0_4px_24px_rgba(31,77,61,0.06)]">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 animate-pulse rounded-full bg-[#e8e4dc]" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#e8e4dc]" />
        <div className="h-3.5 w-5/6 animate-pulse rounded bg-[#e8e4dc]" />
        <div className="h-3.5 w-4/6 animate-pulse rounded bg-[#e8e4dc]" />
      </div>
      <div className="mt-auto flex items-center gap-3 border-t border-[#f0ede8] pt-4">
        <div className="size-9 animate-pulse rounded-full bg-[#e8e4dc]" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-24 animate-pulse rounded bg-[#e8e4dc]" />
          <div className="h-3 w-32 animate-pulse rounded bg-[#e8e4dc]" />
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  customerName,
  comment,
  rate,
  propertyName,
  index,
}: {
  customerName: string;
  comment: string;
  rate: number;
  propertyName: string;
  index: number;
}) {
  const initials = customerName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

  const avatarColors = [
    "bg-[#1F4D3D]",
    "bg-[#2e6f57]",
    "bg-[#cfb072]",
    "bg-[#8b6f3c]",
    "bg-[#4a7c68]",
  ];
  const color = avatarColors[index % avatarColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl border border-[#f0ede8] bg-white p-5 shadow-[0_4px_24px_rgba(31,77,61,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(31,77,61,0.12)] sm:p-6"
    >
      {/* Stars */}
      <StarRow rate={rate} />

      {/* Quote icon + Comment */}
      <div className="relative flex-1">
        <svg
          className="absolute -left-1 -top-1 size-6 text-[#cfb072]/20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="line-clamp-4 pl-5 text-[13px] leading-relaxed text-[#5a6b64] sm:text-[14px]">
          {comment}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#f0ede8]" />

      {/* Footer: avatar + name + property */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white ${color}`}
        >
          {initials || "?"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#1F4D3D] sm:text-[14px]">
            {customerName}
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <svg
              className="size-3 shrink-0 text-[#cfb072]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="truncate text-[11px] font-medium text-[#8a9a94] sm:text-[12px]">
              {propertyName}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const { t } = useI18n();
  const { data, isLoading, isError } = useReviews({
    PageSize: 9,
    SortBy: "rate",
    IsDescending: true,
  });

  const reviews = data?.items ?? [];

  return (
    <section className="bg-[#f7f5f2] px-5 py-14 font-[var(--font-poppins)] sm:px-8 sm:py-20 lg:px-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex max-w-[730px] flex-col items-center gap-2 text-center lg:gap-5"
        >
          <p className="text-[14px] font-medium uppercase tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
            {t("home.reviews.eyebrow")}
          </p>
          <h2 className="max-w-[480px] text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] lg:max-w-none lg:text-[36px]">
            {t("home.reviews.title")}
          </h2>
          <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
          <p className="max-w-[480px] text-[14px] leading-relaxed text-[#5a6b64] lg:text-[16px]">
            {t("home.reviews.body")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 lg:mt-14">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-12 text-[14px] text-[#8a9a94]">
              {t("home.reviews.failed")}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#d9d3c9] bg-white py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#f7f5f2]">
                <svg
                  className="size-7 text-[#cfb072]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#1F4D3D]">{t("home.reviews.emptyTitle")}</p>
                <p className="mt-1 text-[13px] text-[#8a9a94]">
                  {t("home.reviews.emptyBody")}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  customerName={review.customerName}
                  comment={review.comment}
                  rate={review.rate}
                  propertyName={review.propertyName}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary bar */}
        {!isLoading && !isError && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6"
          >
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-sm">
              <svg className="size-4 text-[#cfb072]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[13px] font-semibold text-[#1F4D3D]">
                {t("home.reviews.averageRating", {
                  rating: (reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length).toFixed(1),
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-sm">
              <svg className="size-4 text-[#2e6f57]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-[13px] font-semibold text-[#1F4D3D]">
                {t("home.reviews.verifiedReviews", { count: data?.totalCount ?? reviews.length })}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
