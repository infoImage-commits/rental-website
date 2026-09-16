"use client";

import Link from "next/link";
import { formatUsd } from "@/lib/utils/currency";

interface PropertyBookingCardProps {
  idPrefix?: string;
  propertyId: string;
  propertyName: string;
  basePrice: number;
  capacity: number;
  rating?: number;
  totalReviews?: number;
  todayString: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onClearDates: () => void;
  bookingForm: {
    fullName: string;
    email: string;
    phone: string;
    person: number;
  };
  setBookingForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      phone: string;
      person: number;
    }>
  >;
  hasAcceptedRules: boolean;
  setHasAcceptedRules: (accepted: boolean) => void;
  formError: string;
  isPending: boolean;
  isCheckingPrice: boolean;
  isPriceUnavailable: boolean;
  estimatedTotal: number;
  missingDates: string[];
  onSubmitBooking: (e: React.FormEvent<HTMLFormElement>) => void;
  onScrollToCalendar?: () => void;
}

export default function PropertyBookingCard({
  idPrefix,
  basePrice,
  capacity,
  rating = 0,
  totalReviews = 0,
  todayString,
  checkIn,
  checkOut,
  nights,
  onCheckInChange,
  onCheckOutChange,
  onClearDates,
  bookingForm,
  setBookingForm,
  hasAcceptedRules,
  setHasAcceptedRules,
  formError,
  isPending,
  isCheckingPrice,
  isPriceUnavailable,
  estimatedTotal,
  missingDates,
  onSubmitBooking,
  onScrollToCalendar,
}: PropertyBookingCardProps) {
  const isFormValid =
    !isPending &&
    !isPriceUnavailable &&
    bookingForm.fullName.trim() !== "" &&
    bookingForm.email.trim() !== "" &&
    bookingForm.phone.trim() !== "" &&
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    checkOut > checkIn &&
    bookingForm.person <= capacity &&
    hasAcceptedRules;

  return (
    <div
      id={idPrefix ? `booking-card-${idPrefix}` : "booking-card"}
      className="scroll-mt-24 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_4px_24px_rgba(24,60,47,0.06)] transition hover:shadow-[0_8px_32px_rgba(24,60,47,0.1)] sm:p-5"
    >
      {/* ─── Card Header: Price & Rating ─── */}
      <div className="flex items-baseline justify-between border-b border-[#edf2ef] pb-3.5">
        <div>
          <span className="text-[26px] font-bold text-[#183c2f] lg:text-[28px]">
            {formatUsd(basePrice)}
          </span>
          <span className="text-[13px] font-medium text-[#667c74]"> / night</span>
        </div>

        {totalReviews > 0 ? (
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#183c2f]">
            <span className="text-[#cfb072]">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-[12px] font-normal text-[#8a9a94]">
              ({totalReviews})
            </span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f7f5] px-2.5 py-1 text-[11px] font-semibold text-[#2e6f57]">
            ★ New
          </span>
        )}
      </div>

      <form onSubmit={onSubmitBooking} className="mt-3.5 space-y-3.5">
        {/* ─── Date Picker Box ─── */}
        <div className="rounded-xl border border-[#dfe8e4] bg-[#fbfdfc] p-3 transition focus-within:border-[#2e6f57]">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667c74]">
                Check-in
              </label>
              <input
                type="date"
                min={todayString}
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-[#183c2f] outline-none cursor-pointer"
              />
            </div>
            <div className="border-l border-[#dfe8e4] pl-2.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667c74]">
                Checkout
              </label>
              <input
                type="date"
                min={checkIn || todayString}
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-[#183c2f] outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-[#edf2ef] pt-2 text-[11px]">
            <span className="text-[#667c74]">
              {checkIn && checkOut
                ? `${nights} ${nights === 1 ? "night" : "nights"} selected`
                : checkIn
                  ? "Select checkout date"
                  : "Select dates"}
            </span>
            <div className="flex items-center gap-2">
              {onScrollToCalendar && (
                <button
                  type="button"
                  onClick={onScrollToCalendar}
                  className="font-medium text-[#2e6f57] hover:underline"
                >
                  View calendar
                </button>
              )}
              {(checkIn || checkOut) && (
                <>
                  <span className="text-[#d0ded8]">•</span>
                  <button
                    type="button"
                    onClick={onClearDates}
                    className="font-medium text-[#cfb072] hover:underline"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── Guests Selector ─── */}
        <div>
          <label className="block text-[12px] font-semibold text-[#183c2f]">
            Guests
          </label>
          <select
            value={bookingForm.person}
            onChange={(e) =>
              setBookingForm((prev) => ({
                ...prev,
                person: Number(e.target.value),
              }))
            }
            className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-3.5 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
          >
            {Array.from(
              { length: Math.max(1, capacity) },
              (_, index) => index + 1
            ).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "Guest" : "Guests"}{" "}
                {count === capacity ? "(Max capacity)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ─── Guest Contact Fields ─── */}
        <div className="space-y-3 pt-1">
          <div>
            <label className="block text-[12px] font-semibold text-[#183c2f]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={bookingForm.fullName}
              onChange={(e) =>
                setBookingForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-3.5 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#183c2f]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              value={bookingForm.email}
              onChange={(e) =>
                setBookingForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-3.5 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#183c2f]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +20 123 456 7890"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/[^\d+]/g, ""),
                }))
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-3.5 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>
        </div>

        {/* ─── Price Breakdown Summary ─── */}
        <div className="rounded-xl border border-[#edf2ef] bg-[#fbfdfc] p-4">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#183c2f]">
            Price Summary
          </h4>
          <dl className="mt-2.5 space-y-2 text-[13px]">
            <div className="flex justify-between text-[#667c74]">
              <span>
                {formatUsd(basePrice)} × {nights || 0}{" "}
                {nights === 1 ? "night" : "nights"}
              </span>
              <span className="font-semibold text-[#183c2f]">
                {isCheckingPrice && checkIn && checkOut
                  ? "Checking..."
                  : formatUsd(estimatedTotal)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#edf2ef] pt-2 text-[14px]">
              <span className="font-bold text-[#183c2f]">Total</span>
              <span className="text-[17px] font-bold text-[#2e6f57]">
                {isCheckingPrice && checkIn && checkOut
                  ? "Checking..."
                  : formatUsd(estimatedTotal)}
              </span>
            </div>
          </dl>
          {!checkIn || !checkOut ? (
            <p className="mt-2 text-[11px] text-[#8a9a94]">
              Select dates to check final price and availability.
            </p>
          ) : null}
        </div>

        {/* Alerts & Errors */}
        {isPriceUnavailable && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] leading-relaxed text-amber-700">
            Pricing is missing for{" "}
            {missingDates.length ? missingDates.join(", ") : "the selected range"}.
          </div>
        )}

        {formError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] leading-relaxed text-red-600">
            {formError}
          </div>
        )}

        {/* House Rules Acceptance */}
        <label className="flex items-start gap-2.5 text-[12px] leading-5 text-[#656566] cursor-pointer">
          <input
            type="checkbox"
            checked={hasAcceptedRules}
            onChange={(e) => setHasAcceptedRules(e.target.checked)}
            className="mt-0.5 size-4 rounded accent-[#2e6f57] cursor-pointer"
          />
          <span>
            I have read and agree to the{" "}
            <Link
              href="/house-rules"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#2e6f57] underline hover:text-[#183c2f]"
            >
              House Rules
            </Link>
            .
          </span>
        </label>

        {/* Submit CTA Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#255f49] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Book & Pay with PayPal</span>
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="space-y-2 border-t border-[#edf2ef] pt-3.5 text-[12px] text-[#667c74]">
          <div className="flex items-center gap-2">
            <svg
              className="size-4 text-[#2e6f57] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Instant confirmation & secure payment</span>
          </div>
        </div>
      </form>
    </div>
  );
}
