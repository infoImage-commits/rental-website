"use client";

import { useState } from "react";
import { useReviews, useDeleteReview } from "@/lib/hooks/useReview";
import type { ReviewItem, ReviewsQuery } from "@/lib/types/review";
import ConfirmModal from "./ConfirmModal";
import { toast } from "sonner";

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fef9ec] px-2.5 py-1 text-[13px] font-bold text-[#cfb072]">
      <span className="leading-none">★ {rating}</span>
      <span className="text-[11px] text-[#cfb072]/80 hidden sm:inline">
        {"★".repeat(rounded)}
      </span>
    </div>
  );
}

export default function AdminReviewsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<"date_desc" | "date_asc" | "rate_desc" | "rate_asc">("date_desc");

  // Detail Modal & Delete Modal state
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewItem | null>(null);

  // Parse sort parameters
  let sortBy = "createdAtUtc";
  let isDescending = true;
  if (sortKey === "date_asc") {
    sortBy = "createdAtUtc";
    isDescending = false;
  } else if (sortKey === "rate_desc") {
    sortBy = "rate";
    isDescending = true;
  } else if (sortKey === "rate_asc") {
    sortBy = "rate";
    isDescending = false;
  }

  const query: ReviewsQuery = {
    SearchTerm: debouncedSearch || undefined,
    PageNumber: pageNumber,
    PageSize: pageSize,
    SortBy: sortBy,
    IsDescending: isDescending,
  };

  const { data, isLoading, isError, refetch } = useReviews(query);
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const reviews = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;

  // Calculate local stats from current data
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + (curr.rate || 0), 0) / reviews.length).toFixed(1)
      : "—";
  const fiveStarCount = reviews.filter((r) => r.rate >= 5).length;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDebouncedSearch(searchTerm.trim());
    setPageNumber(1);
  }

  function handleClearSearch() {
    setSearchTerm("");
    setDebouncedSearch("");
    setPageNumber(1);
  }

  function handleDeleteConfirm() {
    if (!reviewToDelete) return;
    deleteReview(reviewToDelete.id, {
      onSuccess: () => {
        toast.success(`Review for booking ${reviewToDelete.bookingNumber} deleted successfully.`);
        setReviewToDelete(null);
        if (selectedReview?.id === reviewToDelete.id) {
          setSelectedReview(null);
        }
      },
      onError: (err: unknown) => {
        const errorData = err as { response?: { data?: { errors?: string[]; message?: string } } };
        const errorMsg =
          errorData?.response?.data?.errors?.[0] ||
          errorData?.response?.data?.message ||
          "Failed to delete review. Please check admin permissions.";
        toast.error(errorMsg);
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#183c2f] sm:text-[28px]">Property Reviews</h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Monitor guest feedback. Administrators can review guest comments and delete inappropriate, NSFW, or offensive content.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-4 text-[13px] font-medium text-[#183c2f] shadow-sm transition hover:bg-[#f5f7f6]"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">Total Reviews</p>
          <p className="mt-2 text-[30px] font-bold leading-none text-[#183c2f]">{totalCount}</p>
          <p className="mt-1 text-[12px] text-[#667c74]">Verified guest stays</p>
        </div>

        <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">Sample Average</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-[30px] font-bold leading-none text-[#183c2f]">{averageRating}</p>
            {averageRating !== "—" && <span className="text-[20px] text-[#cfb072]">★</span>}
          </div>
          <p className="mt-1 text-[12px] text-[#667c74]">From current review dataset</p>
        </div>

        <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">5-Star Ratings</p>
          <p className="mt-2 text-[30px] font-bold leading-none text-[#183c2f]">{fiveStarCount}</p>
          <p className="mt-1 text-[12px] text-[#667c74]">Top satisfaction scores</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by property, booking #, guest name or email..."
              className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white pl-9 pr-8 text-[13px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10"
            />
            <svg
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a9a94]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9a94] hover:text-[#183c2f]"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="h-10 rounded-xl bg-[#1F4D3D] px-4 text-[13px] font-semibold text-white transition hover:bg-[#183c2f]"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-[#667c74]">Sort by:</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
            className="h-10 rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none transition focus:border-[#1F4D3D]"
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="date_asc">Date: Oldest First</option>
            <option value="rate_desc">Rating: Highest First</option>
            <option value="rate_asc">Rating: Lowest First</option>
          </select>
        </div>
      </div>

      {/* Main Reviews Table */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#dfe8e4] bg-[#f8faf9] text-[12px] font-semibold uppercase tracking-wider text-[#667c74]">
              <tr>
                <th className="px-5 py-3.5">Booking #</th>
                <th className="px-5 py-3.5">Property</th>
                <th className="px-5 py-3.5">Guest</th>
                <th className="px-5 py-3.5">Rating</th>
                <th className="px-5 py-3.5">Comment</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2ef]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="size-6 animate-spin rounded-full border-2 border-[#1F4D3D] border-t-transparent" />
                      <p className="text-[13px] text-[#667c74]">Loading reviews...</p>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#c94a4a]">
                    Failed to load reviews. Please verify network connection or admin authentication.
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#f4f7f5] text-[#1F4D3D]">
                        ★
                      </div>
                      <p className="mt-3 text-[15px] font-semibold text-[#183c2f]">No reviews found</p>
                      <p className="mt-1 text-[13px] text-[#667c74]">
                        {debouncedSearch
                          ? `No reviews match "${debouncedSearch}". Try a different keyword.`
                          : "No property reviews have been submitted yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="transition hover:bg-[#fbfdfc]">
                    {/* Booking Number */}
                    <td className="px-5 py-4 font-mono font-medium text-[#183c2f]">
                      <span className="inline-flex rounded-lg bg-[#eef4f1] px-2.5 py-1 text-[12px] font-semibold text-[#1F4D3D]">
                        {review.bookingNumber || "—"}
                      </span>
                    </td>

                    {/* Property Name */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#183c2f] line-clamp-1 max-w-[200px]" title={review.propertyName}>
                        {review.propertyName || "Vacation Rental"}
                      </p>
                    </td>

                    {/* Guest Name & Email */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#183c2f]">{review.customerName || "Guest"}</p>
                      <p className="text-[12px] text-[#8a9a94]">{review.customerEmail || "No email"}</p>
                    </td>

                    {/* Star Rating */}
                    <td className="px-5 py-4">
                      <StarRating rating={review.rate} />
                    </td>

                    {/* Comment */}
                    <td className="px-5 py-4 max-w-[240px]">
                      <p className="truncate text-[#40544c]" title={review.comment}>
                        {review.comment}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-[12px] text-[#667c74]">
                      {formatDate(review.createdAtUtc)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedReview(review)}
                          className="rounded-lg p-1.5 text-[#667c74] transition hover:bg-[#f5f7f6] hover:text-[#183c2f]"
                          title="View review details"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReviewToDelete(review)}
                          className="rounded-lg p-1.5 text-[#c94a4a] transition hover:bg-red-50"
                          title="Delete review"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalCount > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#dfe8e4] bg-[#f8faf9] px-5 py-3.5 sm:flex-row">
            <p className="text-[13px] text-[#667c74]">
              Showing <span className="font-medium text-[#183c2f]">{(pageNumber - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium text-[#183c2f]">{Math.min(pageNumber * pageSize, totalCount)}</span> of{" "}
              <span className="font-medium text-[#183c2f]">{totalCount}</span> reviews
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[12px] text-[#667c74]">
                <span>Rows:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageNumber(1);
                  }}
                  className="rounded-lg border border-[#dfe8e4] bg-white px-2 py-1 text-[12px] text-[#183c2f]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-[#dfe8e4] bg-white px-3 py-1 text-[12px] font-medium text-[#183c2f] transition hover:bg-[#f5f7f6] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-2 text-[12px] font-medium text-[#667c74]">
                  {pageNumber} / {Math.max(1, totalPages)}
                </span>
                <button
                  type="button"
                  disabled={pageNumber >= totalPages}
                  onClick={() => setPageNumber((p) => p + 1)}
                  className="rounded-lg border border-[#dfe8e4] bg-white px-3 py-1 text-[12px] font-medium text-[#183c2f] transition hover:bg-[#f5f7f6] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedReview(null);
          }}
        >
          <div className="relative w-full max-w-[560px] rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#edf2ef] pb-4">
              <div>
                <span className="inline-flex items-center rounded-lg bg-[#eef4f1] px-2.5 py-1 text-[12px] font-mono font-semibold text-[#1F4D3D]">
                  Booking: {selectedReview.bookingNumber}
                </span>
                <h3 className="mt-2 text-[18px] font-bold text-[#183c2f]">
                  {selectedReview.propertyName || "Vacation Home Review"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="rounded-full p-1.5 text-[#8a9a94] hover:bg-[#f5f7f6] hover:text-[#183c2f]"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#f8faf9] p-4">
                <div>
                  <p className="text-[11px] font-medium uppercase text-[#8a9a94]">Customer</p>
                  <p className="font-semibold text-[#183c2f]">{selectedReview.customerName || "Guest"}</p>
                  <p className="text-[12px] text-[#667c74]">{selectedReview.customerEmail || "No email"}</p>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase text-[#8a9a94]">Rating & Date</p>
                  <div className="mt-0.5">
                    <StarRating rating={selectedReview.rate} />
                  </div>
                  <p className="mt-1 text-[11px] text-[#8a9a94]">{formatDate(selectedReview.createdAtUtc)}</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#8a9a94]">Full Feedback</p>
                <div className="mt-1.5 rounded-xl border border-[#dfe8e4] bg-white p-4 text-[14px] leading-relaxed text-[#183c2f] whitespace-pre-wrap">
                  {selectedReview.comment}
                </div>
              </div>

              <div className="text-[11px] text-[#8a9a94]">
                <p>Review ID: <span className="font-mono">{selectedReview.id}</span></p>
                {selectedReview.bookingId && (
                  <p>Booking ID: <span className="font-mono">{selectedReview.bookingId}</span></p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[#edf2ef] pt-4">
              <button
                type="button"
                onClick={() => {
                  setReviewToDelete(selectedReview);
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-[#c94a4a] hover:bg-red-50"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete Review
              </button>

              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="rounded-full bg-[#1F4D3D] px-6 py-2 text-[13px] font-semibold text-white transition hover:bg-[#183c2f]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!reviewToDelete}
        title="Delete Guest Review"
        message={`Are you sure you want to permanently delete the review for booking ${reviewToDelete?.bookingNumber}? This action cannot be undone.`}
        confirmText="Delete Review"
        cancelText="Cancel"
        isPending={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setReviewToDelete(null)}
      />
    </div>
  );
}
