"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useAdminPropertyBooking, useMarkPropertyBookingAsPaidAll } from "@/lib/hooks/useBooking";
import { useBookingPayments } from "@/lib/hooks/usePayment";
import type { BookingPayment } from "@/lib/hooks/usePayment";
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

function money(value?: number | null) {
  return formatUsd(value ?? 0);
}

function statusClass(statusName: string) {
  const normalized = statusName.toLowerCase();
  if (normalized.includes("partial")) return "bg-[#e8f1ff] text-[#2c5a96]";
  if (normalized.includes("paid")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("pending") || normalized.includes("processing")) return "bg-amber-50 text-amber-700";
  if (normalized.includes("cancel") || normalized.includes("failed")) return "bg-red-50 text-red-700";
  return "bg-[#f5f7f6] text-[#667c74]";
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as {
    response?: { data?: { errors?: string[]; message?: string } };
    message?: string;
  };
  return apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || apiError.message || fallback;
}

export default function AdminBookingDetailsContent({ id }: { id: string }) {
  const {
    data: booking,
    isLoading,
    isError,
    refetch: refetchBooking,
  } = useAdminPropertyBooking(id);
  const bookingId = booking?.bookingId || booking?.id || id;
  const {
    data: payments = [],
    isLoading: isLoadingPayments,
    isError: isPaymentsError,
    refetch: refetchPayments,
  } = useBookingPayments(bookingId);
  const { mutate: markAsPaidAll, isPending: isMarkingPaid } = useMarkPropertyBookingAsPaidAll();

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

  const totalPrice = booking.totalPrice ?? booking.price.totalPrice;
  const requiredPaymentAmount = booking.requiredPaymentAmount ?? 0;
  const paidAmount = booking.paidAmount ?? 0;
  const remainingAmount = booking.remainingAmount ?? Math.max(0, totalPrice - paidAmount);
  const canMarkAsPaid = remainingAmount > 0;

  function handleMarkAsPaid() {
    markAsPaidAll(bookingId, {
      onSuccess: (response) => {
        toast.success(response.message || "Booking marked as fully paid.");
        refetchBooking();
        refetchPayments();
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Could not mark this booking as fully paid."));
      },
    });
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
            Property booking details, guest stay, and deposit balance.
          </p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.8fr)]">
        <div className="grid gap-6">
          <Section title="Booking Summary">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Booking ID" value={bookingId} mono />
              <Detail label="Booking Number" value={booking.bookingNumber} mono />
              <Detail label="Booking Status" value={booking.statusName} strong />
              <Detail label="Booking Source" value={booking.bookingSourceName || booking.bookingSource || "-"} />
              <Detail label="Payment Status" value={booking.paymentStatusName} strong badgeClass={statusClass(booking.paymentStatusName)} />
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

          <PaymentSummary
            totalPrice={totalPrice}
            requiredPaymentAmount={requiredPaymentAmount}
            paidAmount={paidAmount}
            remainingAmount={remainingAmount}
            paymentStatusName={booking.paymentStatusName}
            canMarkAsPaid={canMarkAsPaid}
            isMarkingPaid={isMarkingPaid}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </aside>
      </div>

      {(isLoadingPayments || isPaymentsError || payments.length > 0) && (
        <PaymentsSection payments={payments} isLoading={isLoadingPayments} isError={isPaymentsError} />
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
  badgeClass = "",
}: {
  label: string;
  value: string;
  strong?: boolean;
  mono?: boolean;
  badgeClass?: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8a9a94]">{label}</dt>
      <dd
        className={`mt-1 break-words text-[14px] leading-5 ${
          strong ? "font-semibold text-[#183c2f]" : "text-[#414847]"
        } ${mono ? "font-mono text-[12px]" : ""}`}
      >
        {badgeClass ? (
          <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${badgeClass}`}>
            {value || "-"}
          </span>
        ) : (
          value || "-"
        )}
      </dd>
    </div>
  );
}

function PaymentSummary({
  totalPrice,
  requiredPaymentAmount,
  paidAmount,
  remainingAmount,
  paymentStatusName,
  canMarkAsPaid,
  isMarkingPaid,
  onMarkAsPaid,
}: {
  totalPrice: number;
  requiredPaymentAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatusName: string;
  canMarkAsPaid: boolean;
  isMarkingPaid: boolean;
  onMarkAsPaid: () => void;
}) {
  return (
    <section className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold text-[#183c2f]">Payment</h2>
          <p className="mt-1 text-[13px] leading-5 text-[#667c74]">
            Client pays 10% online, then pays the remaining balance on arrival.
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(paymentStatusName)}`}>
          {paymentStatusName}
        </span>
      </div>

      <div className="grid gap-3">
        <PaymentMetric label="Total Price" value={money(totalPrice)} strong />
        <PaymentMetric label="Required Online Payment" value={money(requiredPaymentAmount)} />
        <PaymentMetric label="Paid Amount" value={money(paidAmount)} />
        <PaymentMetric label="Remaining Amount" value={money(remainingAmount)} strong={remainingAmount > 0} />
      </div>

      {canMarkAsPaid && (
        <button
          type="button"
          onClick={onMarkAsPaid}
          disabled={isMarkingPaid}
          className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isMarkingPaid ? "Marking..." : "Mark as Fully Paid"}
        </button>
      )}
    </section>
  );
}

function PaymentMetric({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f5f7f6] px-4 py-3">
      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a9a94]">{label}</span>
      <span className={`text-right text-[14px] ${strong ? "font-semibold text-[#183c2f]" : "font-medium text-[#414847]"}`}>
        {value}
      </span>
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
    <div className="mt-6">
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
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusClass(payment.statusName)}`}>
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
    </div>
  );
}
