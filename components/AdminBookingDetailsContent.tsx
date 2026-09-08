"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAdminPropertyBooking, useCreateBookingExtension } from "@/lib/hooks/useBooking";
import { useBookingPayments, useCreatePaypalOrder } from "@/lib/hooks/usePayment";
import { useCheckPropertyAvailabilityRange, usePropertyAvailability } from "@/lib/hooks/useProperties";
import type { AdminBookingDetails, BookingExtensionResponseData } from "@/lib/types/booking";
import type { BookingPayment, CreatePaypalOrderResponse } from "@/lib/hooks/usePayment";
import type { PropertyBookingCalendarItem } from "@/lib/types/property";
import { formatUsd } from "@/lib/utils/currency";

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function money(value: number) {
  return formatUsd(value);
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
  const start = new Date(`${checkIn}T00:00:00`).getTime();
  const end = new Date(`${checkOut}T00:00:00`).getTime();
  return Math.max(0, Math.round((end - start) / 86400000));
}

function getExtensionConflict(
  checkOut: string,
  newCheckOut: string,
  bookings: PropertyBookingCalendarItem[]
): PropertyBookingCalendarItem | null {
  if (!newCheckOut || newCheckOut <= checkOut) return null;

  let cursor = checkOut;
  while (cursor < newCheckOut) {
    const conflict = bookings.find(
      (b) => b.isBookable === false && b.from <= cursor && cursor < b.to
    );
    if (conflict) return conflict;
    cursor = addDays(cursor, 1);
  }

  return null;
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as {
    response?: { data?: { errors?: string[]; message?: string } };
  };
  return apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || fallback;
}

function canExtendBooking(booking: AdminBookingDetails) {
  return (
    booking.statusName.toLowerCase() === "confirmed" &&
    booking.paymentStatusName.toLowerCase() === "paid"
  );
}

export default function AdminBookingDetailsContent({ id }: { id: string }) {
  const { data: booking, isLoading, isError } = useAdminPropertyBooking(id);
  const { data: payments = [], isLoading: isLoadingPayments, isError: isPaymentsError, refetch: refetchPayments } =
    useBookingPayments(id);
  const { mutate: createExtension, isPending: isCreatingExtension } = useCreateBookingExtension();
  const { mutate: createPaypalOrder, isPending: isCreatingOrder } = useCreatePaypalOrder();
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [extensionResult, setExtensionResult] = useState<BookingExtensionResponseData | null>(null);
  const [paymentOrder, setPaymentOrder] = useState<CreatePaypalOrderResponse | null>(null);
  const [paymentLinkError, setPaymentLinkError] = useState("");
  const [extensionForm, setExtensionForm] = useState({ newCheckOut: "", notes: "" });
  const [formError, setFormError] = useState("");

  const propertyId = booking?.property?.propertyId ?? "";
  const currentCheckOut = booking?.stay?.checkOut ?? "";
  const minimumCheckout = currentCheckOut ? addDays(currentCheckOut, 1) : "";
  const availabilityStart = currentCheckOut;
  const availabilityEnd = currentCheckOut ? addDays(currentCheckOut, 90) : "";

  const {
    data: availabilityData,
    isLoading: isLoadingAvailability,
    refetch: refetchAvailability,
  } = usePropertyAvailability(propertyId, availabilityStart, availabilityEnd);

  const { mutateAsync: checkAvailabilityRange, isPending: isCheckingAvailability } =
    useCheckPropertyAvailabilityRange();

  const calendarBookings = useMemo(() => {
    const raw = (availabilityData?.bookingCalendar || []) as PropertyBookingCalendarItem[];
    if (!booking) return raw;
    return raw.filter((item) => {
      const isCurrent =
        (item.bookingId && item.bookingId.toLowerCase() === booking.id.toLowerCase()) ||
        (item.bookingNumber && item.bookingNumber.toLowerCase() === booking.bookingNumber.toLowerCase());
      return !isCurrent;
    });
  }, [availabilityData, booking]);

  const bookedReservations = useMemo(() => {
    return calendarBookings.filter((item) => item.isBookable === false);
  }, [calendarBookings]);

  const initialConflict = useMemo(() => {
    if (!currentCheckOut) return null;
    return (
      bookedReservations.find(
        (b) => b.from <= currentCheckOut && currentCheckOut < b.to
      ) || null
    );
  }, [bookedReservations, currentCheckOut]);

  const isExtensionPossible = !initialConflict;

  const nextBooking = useMemo(() => {
    if (!currentCheckOut) return null;
    const upcoming = bookedReservations
      .filter((b) => b.to > currentCheckOut)
      .sort((a, b) => a.from.localeCompare(b.from));
    return upcoming[0] || null;
  }, [bookedReservations, currentCheckOut]);

  const maxCheckoutDate = useMemo(() => {
    if (!isExtensionPossible) return undefined;
    if (nextBooking && nextBooking.from > currentCheckOut) {
      return nextBooking.from;
    }
    return undefined;
  }, [isExtensionPossible, nextBooking, currentCheckOut]);

  const selectedConflict = useMemo(() => {
    if (!booking || !extensionForm.newCheckOut) return null;
    return getExtensionConflict(
      booking.stay.checkOut,
      extensionForm.newCheckOut,
      calendarBookings
    );
  }, [booking, extensionForm.newCheckOut, calendarBookings]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[14px] text-[#8a9a94]">
        <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading booking...
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-10 text-center">
        <p className="text-[18px] font-semibold text-[#183c2f]">Booking not found</p>
        <Link href="/admin/bookings" className="mt-4 inline-flex text-[14px] font-semibold text-[#2e6f57]">
          Back to bookings
        </Link>
      </div>
    );
  }

  const extensionAllowed = canExtendBooking(booking);

  function createPaymentLink(extension: BookingExtensionResponseData) {
    setPaymentLinkError("");
    setPaymentOrder(null);

    createPaypalOrder(
      {
        bookingId: extension.bookingId,
        bookingExtensionId: extension.extensionId,
      },
      {
        onSuccess: (order) => {
          setPaymentOrder(order);
          refetchPayments();
          toast.success("Payment link created. Copy it and send it to the client.");
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Extension was created, but the PayPal payment link could not be created.");
          setPaymentLinkError(message);
          toast.error(message);
        },
      }
    );
  }

  async function copyPaymentLink() {
    if (!paymentOrder?.approvalUrl) return;

    try {
      await navigator.clipboard.writeText(paymentOrder.approvalUrl);
      toast.success("Payment link copied.");
    } catch {
      toast.error("Could not copy the payment link.");
    }
  }

  async function submitExtension(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking) return;

    setFormError("");

    if (!extensionAllowed) {
      setFormError("Only confirmed and paid bookings can be extended.");
      return;
    }

    if (!isExtensionPossible) {
      setFormError("Property is already booked starting on the checkout date. No extension is possible.");
      return;
    }

    if (!extensionForm.newCheckOut || extensionForm.newCheckOut <= booking.stay.checkOut) {
      setFormError("New checkout must be after the current checkout date.");
      return;
    }

    // 1. Client-side conflict check from loaded calendar
    const conflict = getExtensionConflict(
      booking.stay.checkOut,
      extensionForm.newCheckOut,
      calendarBookings
    );

    if (conflict) {
      const conflictMsg = `Property is already booked for some of the requested extension dates (${conflict.bookingNumber ? `Booking ${conflict.bookingNumber}: ` : ""}${formatDate(conflict.from)} to ${formatDate(conflict.to)}). Please select an available date.`;
      setFormError(conflictMsg);
      toast.error("Requested extension dates are already booked.");
      return;
    }

    // 2. Real-time availability verification with backend
    try {
      const freshData = await checkAvailabilityRange({
        propertyId: booking.property.propertyId,
        startDate: booking.stay.checkOut,
        endDate: extensionForm.newCheckOut,
      });

      const freshBookings = (freshData?.bookingCalendar || []) as PropertyBookingCalendarItem[];
      const freshOtherBookings = freshBookings.filter((item) => {
        const isCurrent =
          (item.bookingId && item.bookingId.toLowerCase() === booking.id.toLowerCase()) ||
          (item.bookingNumber && item.bookingNumber.toLowerCase() === booking.bookingNumber.toLowerCase());
        return !isCurrent;
      });

      const freshConflict = getExtensionConflict(
        booking.stay.checkOut,
        extensionForm.newCheckOut,
        freshOtherBookings
      );

      if (freshConflict) {
        const conflictMsg = `Property is already booked for some of the requested extension dates (${freshConflict.bookingNumber ? `Booking ${freshConflict.bookingNumber}: ` : ""}${formatDate(freshConflict.from)} to ${formatDate(freshConflict.to)}).`;
        setFormError(conflictMsg);
        toast.error(conflictMsg);
        return;
      }
    } catch (verifyErr) {
      console.warn("Could not pre-verify fresh availability range:", verifyErr);
    }

    createExtension(
      {
        bookingId: booking.id,
        payload: {
          newCheckOut: extensionForm.newCheckOut,
          notes: extensionForm.notes.trim(),
        },
      },
      {
        onSuccess: (res) => {
          if (!res.isSuccess || !res.data) {
            const message = res.errors?.[0] || res.message || "Could not create booking extension.";
            setFormError(message);
            toast.error(message);
            return;
          }

          setExtensionResult(res.data);
          setPaymentOrder(null);
          setPaymentLinkError("");
          setIsExtensionOpen(false);
          setExtensionForm({ newCheckOut: "", notes: "" });
          toast.success("Booking extension created. Creating payment link...");
          createPaymentLink(res.data);
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Could not create booking extension.");
          setFormError(message);
          toast.error(message);
        },
      }
    );
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/admin/bookings" className="text-[13px] font-semibold text-[#2e6f57] hover:underline">
            Back to bookings
          </Link>
          <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            {booking.bookingNumber}
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Property booking details, stay dates, payment status, and extension request.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setExtensionForm({ newCheckOut: "", notes: "" });
            refetchAvailability();
            setIsExtensionOpen(true);
          }}
          disabled={!extensionAllowed}
          className="inline-flex h-10 items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:bg-[#b9c6cf]"
        >
          Extend Booking
        </button>
      </header>

      {!extensionAllowed && (
        <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-[13px] leading-5 text-amber-700">
          Only confirmed and paid bookings can be extended. Current status is {booking.statusName} and payment is {booking.paymentStatusName}.
        </div>
      )}

      {extensionResult && (
        <ExtensionResultCard
          extension={extensionResult}
          paymentOrder={paymentOrder}
          isCreatingOrder={isCreatingOrder}
          paymentLinkError={paymentLinkError}
          onRetry={() => createPaymentLink(extensionResult)}
          onCopy={copyPaymentLink}
        />
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.8fr)]">
        <div className="grid gap-6">
          <Section title="Booking Summary">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Booking Number" value={booking.bookingNumber} mono />
              <Detail label="Booking Status" value={booking.statusName} strong />
              <Detail label="Booking Source" value={booking.bookingSourceName || booking.bookingSource || "-"} />
              <Detail label="Payment Status" value={booking.paymentStatusName} strong />
              <Detail label="Created" value={formatDateTime(booking.createdAtUtc)} />
              <Detail label="Confirmed" value={formatDateTime(booking.confirmedAt)} />
              <Detail label="Completed" value={formatDateTime(booking.completedAt)} />
            </div>
          </Section>

          <Section title="Property">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Property Name" value={booking.property.propertyName} strong />
              <Detail label="Property Number" value={booking.property.propertyNumber} mono />
              <Detail label="Address" value={booking.property.address} />
            </div>
          </Section>

          <Section title="Guest">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Detail label="Full Name" value={booking.guest.fullName} strong />
              <Detail label="Email" value={booking.guest.email} />
              <Detail label="Phone" value={booking.guest.phone} />
              <Detail label="Guests" value={String(booking.guest.person)} />
            </div>
          </Section>
        </div>

        <aside className="grid gap-6 self-start">
          <Section title="Stay">
            <div className="grid gap-4">
              <Detail label="Check-in" value={formatDate(booking.stay.checkIn)} strong />
              <Detail label="Check-out" value={formatDate(booking.stay.checkOut)} strong />
              <Detail label="Nights" value={String(booking.stay.numberOfNights)} />
            </div>
          </Section>

          <Section title="Price">
            <div className="grid gap-4">
              <Detail label="Price Per Night" value={money(booking.price.pricePerNight)} />
              <Detail label="Total Price" value={money(booking.price.totalPrice)} strong />
            </div>
          </Section>
        </aside>
      </div>

      {(isLoadingPayments || isPaymentsError || payments.length > 0) && (
        <PaymentsSection payments={payments} isLoading={isLoadingPayments} isError={isPaymentsError} />
      )}

      {isExtensionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close extension dialog"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => {
              if (!isCreatingExtension && !isCheckingAvailability) setIsExtensionOpen(false);
            }}
          />
          <form
            onSubmit={submitExtension}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#dfe8e4] pb-4">
              <div>
                <h2 className="text-[20px] font-semibold text-[#183c2f]">Extend Booking</h2>
                <p className="mt-1 text-[13px] leading-5 text-[#667c74]">
                  Check property availability calendar and choose an available new checkout date.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExtensionOpen(false)}
                disabled={isCreatingExtension || isCheckingAvailability}
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dfe8e4] text-[16px] text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Current Stay & Property Context */}
              <div className="grid gap-3 rounded-2xl border border-[#dfe8e4] bg-[#f8faf9] p-4 text-[13px] sm:grid-cols-3">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a9a94]">
                    Property
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#183c2f] truncate">
                    {booking.property.propertyName}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a9a94]">
                    Current Stay
                  </span>
                  <span className="mt-0.5 block font-medium text-[#183c2f]">
                    {formatDate(booking.stay.checkIn)} → <strong className="font-semibold text-[#2e6f57]">{formatDate(booking.stay.checkOut)}</strong>
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a9a94]">
                    Rate Per Night
                  </span>
                  <span className="mt-0.5 block font-semibold text-[#183c2f]">
                    {money(booking.price.pricePerNight)}
                  </span>
                </div>
              </div>

              {/* Status / Notice Banner */}
              {!isExtensionPossible ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-[13px] leading-5 text-rose-800">
                  <p className="font-semibold text-rose-900">⚠️ Cannot Extend Booking</p>
                  <p className="mt-1">
                    This property already has another confirmed booking starting on {formatDate(booking.stay.checkOut)}
                    {initialConflict?.bookingNumber ? ` (${initialConflict.bookingNumber})` : ""}. No extension nights are available.
                  </p>
                </div>
              ) : nextBooking && nextBooking.from > currentCheckOut ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-[13px] text-emerald-900">
                  <span className="font-semibold">Available for extension:</span> You can extend up to{" "}
                  <strong className="underline decoration-emerald-500 font-semibold">{formatDate(nextBooking.from)}</strong> (maximum{" "}
                  {getNights(currentCheckOut, nextBooking.from)}{" "}
                  {getNights(currentCheckOut, nextBooking.from) === 1 ? "night" : "nights"}). Next booking
                  {nextBooking.bookingNumber ? ` (${nextBooking.bookingNumber})` : ""} arrives on {formatDate(nextBooking.from)}.
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-[13px] text-emerald-900">
                  <span className="font-semibold">All upcoming dates available:</span> No conflicting bookings in the next 90 days. Select any date to extend.
                </div>
              )}

              {/* Availability Calendar */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#183c2f]">
                    Availability Calendar
                  </span>
                  <span className="text-[12px] text-[#667c74]">
                    Click an available date to select checkout
                  </span>
                </div>
                <ExtendAvailabilityCalendar
                  checkOutDate={currentCheckOut}
                  selectedDate={extensionForm.newCheckOut}
                  onSelectDate={(newDate) => {
                    setFormError("");
                    setExtensionForm((curr) => ({ ...curr, newCheckOut: newDate }));
                  }}
                  bookedReservations={bookedReservations}
                  isLoading={isLoadingAvailability}
                  isExtensionPossible={isExtensionPossible}
                />
              </div>

              {/* Manual Date Input and Selection Summary */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                    New Checkout Date
                  </span>
                  <input
                    type="date"
                    min={minimumCheckout}
                    max={maxCheckoutDate}
                    disabled={!isExtensionPossible}
                    value={extensionForm.newCheckOut}
                    onChange={(event) => {
                      setFormError("");
                      setExtensionForm((current) => ({ ...current, newCheckOut: event.target.value }));
                    }}
                    className="h-11 w-full rounded-xl border border-[#dfe8e4] px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57] disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                  {maxCheckoutDate && (
                    <span className="mt-1 block text-[11px] text-[#8a9a94]">
                      Max available checkout: {formatDate(maxCheckoutDate)}
                    </span>
                  )}
                </label>

                {/* Live Extension Calculation Card */}
                {extensionForm.newCheckOut && !selectedConflict && isExtensionPossible ? (
                  <div className="flex flex-col justify-center rounded-xl border border-[#dfe8e4] bg-[#f8faf9] p-3.5 text-[13px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#667c74]">Additional Duration</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        {getNights(currentCheckOut, extensionForm.newCheckOut)}{" "}
                        {getNights(currentCheckOut, extensionForm.newCheckOut) === 1 ? "Night" : "Nights"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between border-t border-[#dfe8e4] pt-2">
                      <span className="text-[12px] text-[#667c74]">Est. Additional Cost</span>
                      <span className="text-[15px] font-bold text-[#183c2f]">
                        {money(
                          getNights(currentCheckOut, extensionForm.newCheckOut) * booking.price.pricePerNight
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-[#dfe8e4] bg-[#fcfdfd] p-3.5 text-center text-[12px] text-[#8a9a94]">
                    Select a checkout date on the calendar to see duration and cost.
                  </div>
                )}
              </div>

              {/* Conflict Alert if admin manually typed or selected an invalid date */}
              {selectedConflict && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-[13px] text-rose-700">
                  <p className="font-semibold">⚠️ Selected Date Conflicts with Existing Booking</p>
                  <p className="mt-1 text-[12px]">
                    Property is already booked from {formatDate(selectedConflict.from)} to{" "}
                    {formatDate(selectedConflict.to)}
                    {selectedConflict.bookingNumber ? ` (${selectedConflict.bookingNumber})` : ""}. Please select an available date on or before {formatDate(selectedConflict.from)}.
                  </p>
                </div>
              )}

              {/* Notes */}
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Notes</span>
                <textarea
                  value={extensionForm.notes}
                  onChange={(event) =>
                    setExtensionForm((current) => ({ ...current, notes: event.target.value }))
                  }
                  rows={3}
                  placeholder="Optional admin note"
                  className="w-full resize-none rounded-xl border border-[#dfe8e4] px-4 py-3 text-[14px] text-[#183c2f] outline-none placeholder:text-[#b8c8de] transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                />
              </label>
            </div>

            {formError && (
              <p className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-[12px] leading-5 text-red-600">
                {formError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3 border-t border-[#dfe8e4] pt-4">
              <button
                type="button"
                disabled={isCreatingExtension || isCheckingAvailability}
                onClick={() => setIsExtensionOpen(false)}
                className="h-10 rounded-full px-5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isCreatingExtension ||
                  isCheckingAvailability ||
                  !isExtensionPossible ||
                  !extensionForm.newCheckOut ||
                  Boolean(selectedConflict) ||
                  !extensionAllowed
                }
                className="inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-6 text-[14px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:bg-[#b9c6cf]"
              >
                {isCheckingAvailability ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Checking dates...
                  </>
                ) : isCreatingExtension ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating...
                  </>
                ) : (
                  "Create Extension"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ExtendAvailabilityCalendar({
  checkOutDate,
  selectedDate,
  onSelectDate,
  bookedReservations,
  isLoading,
  isExtensionPossible,
}: {
  checkOutDate: string;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  bookedReservations: PropertyBookingCalendarItem[];
  isLoading: boolean;
  isExtensionPossible: boolean;
}) {
  const [monthOffset, setMonthOffset] = useState(0);

  const viewDate = useMemo(() => {
    const base = checkOutDate ? new Date(`${checkOutDate}T00:00:00`) : new Date();
    return new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  }, [checkOutDate, monthOffset]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthTitle = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const isEarliestMonth = monthOffset <= 0;

  function handlePrev() {
    if (isEarliestMonth) return;
    setMonthOffset((current) => Math.max(0, current - 1));
  }

  function handleNext() {
    setMonthOffset((current) => current + 1);
  }

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="rounded-2xl border border-[#dfe8e4] bg-[#fcfdfd] p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3">
        <h4 className="text-[14px] font-semibold text-[#183c2f]">{monthTitle}</h4>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isEarliestMonth}
            className="flex size-7 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white text-[13px] font-semibold text-[#183c2f] transition hover:bg-[#f5f7f6] disabled:cursor-not-allowed disabled:opacity-30"
            title="Previous month"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex size-7 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white text-[13px] font-semibold text-[#183c2f] transition hover:bg-[#f5f7f6]"
            title="Next month"
          >
            →
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-10 text-center text-[13px] text-[#8a9a94]">
          <span className="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
          Loading property availability...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-[#8a9a94]">
            {weekdays.map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[46px]" />
            ))}

            {Array.from({ length: totalDaysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

              const isPast = dayDate < checkOutDate;
              const isCurrentCheckout = dayDate === checkOutDate;
              const isSelected = dayDate === selectedDate;
              const isInRange = selectedDate && dayDate > checkOutDate && dayDate < selectedDate;

              const conflict =
                dayDate > checkOutDate
                  ? getExtensionConflict(checkOutDate, dayDate, bookedReservations)
                  : null;
              const isBooked = Boolean(conflict) || (!isExtensionPossible && dayDate > checkOutDate);

              if (isPast) {
                return (
                  <div
                    key={dayDate}
                    className="flex min-h-[46px] flex-col items-center justify-center rounded-xl p-1 text-[12px] text-gray-300"
                  >
                    <span>{day}</span>
                  </div>
                );
              }

              if (isCurrentCheckout) {
                return (
                  <div
                    key={dayDate}
                    className="flex min-h-[46px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 p-1 text-[12px] font-semibold text-gray-700"
                    title="Current Checkout Date"
                  >
                    <span>{day}</span>
                    <span className="text-[9px] font-medium leading-none text-gray-500">Current</span>
                  </div>
                );
              }

              if (isSelected) {
                return (
                  <button
                    key={dayDate}
                    type="button"
                    onClick={() => onSelectDate(dayDate)}
                    className="flex min-h-[46px] flex-col items-center justify-center rounded-xl bg-[#2e6f57] p-1 text-[12px] font-bold text-white shadow-sm ring-2 ring-[#2e6f57] ring-offset-1 transition"
                  >
                    <span>{day}</span>
                    <span className="text-[9px] font-semibold leading-none">✓ Checkout</span>
                  </button>
                );
              }

              if (isInRange) {
                return (
                  <button
                    key={dayDate}
                    type="button"
                    onClick={() => onSelectDate(dayDate)}
                    className="flex min-h-[46px] flex-col items-center justify-center rounded-xl bg-emerald-100/90 p-1 text-[12px] font-semibold text-emerald-900 transition hover:bg-emerald-200"
                    title="Click to set as checkout"
                  >
                    <span>{day}</span>
                    <span className="text-[9px] font-medium leading-none text-emerald-700">Extended</span>
                  </button>
                );
              }

              if (isBooked) {
                return (
                  <div
                    key={dayDate}
                    className="flex min-h-[46px] flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/70 p-1 text-[12px] font-medium text-rose-500 opacity-80 cursor-not-allowed"
                    title={
                      conflict
                        ? `Booked (${conflict.bookingNumber || "Confirmed"}) ${conflict.from} to ${conflict.to}`
                        : "Booked / Unavailable"
                    }
                  >
                    <span className="line-through">{day}</span>
                    <span className="text-[9px] font-normal leading-none text-rose-600">Booked</span>
                  </div>
                );
              }

              return (
                <button
                  key={dayDate}
                  type="button"
                  onClick={() => onSelectDate(dayDate)}
                  className="flex min-h-[46px] flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/60 p-1 text-[12px] font-semibold text-[#183c2f] transition hover:scale-[1.03] hover:border-emerald-500 hover:bg-emerald-100 shadow-sm"
                  title="Click to select this checkout date"
                >
                  <span>{day}</span>
                  <span className="text-[9px] font-normal leading-none text-emerald-700">Available</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-[#dfe8e4] pt-3 text-[11px] text-[#667c74]">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-emerald-400 bg-emerald-100" />
              <span>Available to Extend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-rose-400 bg-rose-100" />
              <span>Booked / Blocked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2 border-dashed border-gray-400 bg-gray-200" />
              <span>Current Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#2e6f57]" />
              <span>Selected Checkout</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
      <h2 className="mb-5 text-[18px] font-semibold text-[#183c2f]">{title}</h2>
      {children}
    </section>
  );
}

function Detail({
  label,
  value,
  strong = false,
  mono = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8a9a94]">{label}</dt>
      <dd
        className={`mt-1 break-words text-[14px] leading-5 ${
          strong ? "font-semibold text-[#183c2f]" : "text-[#414847]"
        } ${mono ? "font-mono text-[12px]" : ""}`}
      >
        {value || "-"}
      </dd>
    </div>
  );
}

function PaymentsSection({
  payments,
  isLoading,
  isError,
}: {
  payments: BookingPayment[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Section title="Payments">
      {isLoading ? (
        <p className="text-[14px] text-[#8a9a94]">Loading payments...</p>
      ) : isError ? (
        <p className="text-[14px] text-red-600">Could not load booking payments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-left">
            <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2ef] text-[13px]">
              {payments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-[#f8faf9]">
                  <td className="px-4 py-3 font-semibold text-[#183c2f]">{payment.paymentTypeName}</td>
                  <td className="px-4 py-3 font-semibold text-[#183c2f]">{money(payment.amount)}</td>
                  <td className="px-4 py-3 text-[#414847]">{payment.providerName}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[#414847]">{payment.payPalOrderId || "-"}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[#414847]">{payment.transactionId || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                        payment.statusName.toLowerCase() === "paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {payment.statusName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#667c74]">{formatDateTime(payment.createdAtUtc)}</td>
                  <td className="px-4 py-3 text-[#667c74]">{formatDateTime(payment.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function ExtensionResultCard({
  extension,
  paymentOrder,
  isCreatingOrder,
  paymentLinkError,
  onRetry,
  onCopy,
}: {
  extension: BookingExtensionResponseData;
  paymentOrder: CreatePaypalOrderResponse | null;
  isCreatingOrder: boolean;
  paymentLinkError: string;
  onRetry: () => void;
  onCopy: () => void;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-emerald-800">Extension Created</h2>
          <p className="mt-1 text-[13px] leading-5 text-emerald-700">
            Share the PayPal payment link with the client. Once the client completes PayPal, the payment success page will capture the order with the backend.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-emerald-700">
          {extension.paymentStatus}
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Extension ID" value={extension.extensionId} mono />
        <Detail label="Old Checkout" value={formatDate(extension.oldCheckOut)} />
        <Detail label="New Checkout" value={formatDate(extension.newCheckOut)} strong />
        <Detail label="Additional Nights" value={String(extension.additionalNights)} />
        <Detail label="Additional Amount" value={money(extension.additionalAmount)} strong />
        <Detail label="Booking Status" value={extension.bookingStatus} />
        <Detail label="Booking Number" value={extension.bookingNumber} mono />
      </div>

      <div className="mt-5 rounded-xl border border-emerald-100 bg-white p-4">
        <h3 className="text-[14px] font-semibold text-[#183c2f]">Client Payment Link</h3>
        {isCreatingOrder ? (
          <p className="mt-3 text-[13px] text-[#667c74]">Creating PayPal payment link...</p>
        ) : paymentOrder ? (
          <div className="mt-3 grid gap-3">
            <div className="rounded-lg border border-[#dfe8e4] bg-[#f8faf9] px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a9a94]">PayPal Order ID</p>
              <p className="mt-1 break-all font-mono text-[12px] text-[#183c2f]">{paymentOrder.orderId}</p>
            </div>
            <div className="rounded-lg border border-[#dfe8e4] bg-[#f8faf9] px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a9a94]">Approval URL</p>
              <p className="mt-1 break-all text-[13px] font-medium text-[#2e6f57]">
                {paymentOrder.approvalUrl}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex h-9 items-center rounded-full bg-[#2e6f57] px-4 text-[13px] font-semibold text-white transition hover:bg-[#255f49]"
              >
                Copy Link
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            {paymentLinkError && (
              <p className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-600">
                {paymentLinkError}
              </p>
            )}
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-9 items-center rounded-full bg-[#2e6f57] px-4 text-[13px] font-semibold text-white transition hover:bg-[#255f49]"
            >
              Create Payment Link
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
