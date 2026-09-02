"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAdminPropertyBooking, useCreateBookingExtension } from "@/lib/hooks/useBooking";
import { useBookingPayments, useCreatePaypalOrder } from "@/lib/hooks/usePayment";
import type { AdminBookingDetails, BookingExtensionResponseData } from "@/lib/types/booking";
import type { BookingPayment, CreatePaypalOrderResponse } from "@/lib/hooks/usePayment";

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

function money(value: number, currency = "USD") {
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const minimumCheckout = addDays(booking.stay.checkOut, 1);

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

  function submitExtension(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking) return;

    setFormError("");

    if (!extensionAllowed) {
      setFormError("Only confirmed and paid bookings can be extended.");
      return;
    }

    if (!extensionForm.newCheckOut || extensionForm.newCheckOut <= booking.stay.checkOut) {
      setFormError("New checkout must be after the current checkout date.");
      return;
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

      <PaymentsSection payments={payments} isLoading={isLoadingPayments} isError={isPaymentsError} />

      {isExtensionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close extension dialog"
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              if (!isCreatingExtension) setIsExtensionOpen(false);
            }}
          />
          <form
            onSubmit={submitExtension}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-[20px] font-semibold text-[#183c2f]">Extend Booking</h2>
            <p className="mt-1 text-[13px] leading-5 text-[#667c74]">
              Create the extension, then the admin will get a PayPal link to send to the client.
            </p>

            <div className="mt-5 grid gap-4">
              <div className="rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4 text-[13px] text-[#667c74]">
                Current checkout: <span className="font-semibold text-[#183c2f]">{formatDate(booking.stay.checkOut)}</span>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">New Checkout</span>
                <input
                  type="date"
                  min={minimumCheckout}
                  value={extensionForm.newCheckOut}
                  onChange={(event) => setExtensionForm((current) => ({ ...current, newCheckOut: event.target.value }))}
                  className="h-11 w-full rounded-xl border border-[#dfe8e4] px-4 text-[14px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Notes</span>
                <textarea
                  value={extensionForm.notes}
                  onChange={(event) => setExtensionForm((current) => ({ ...current, notes: event.target.value }))}
                  rows={4}
                  placeholder="Optional admin note"
                  className="w-full resize-none rounded-xl border border-[#dfe8e4] px-4 py-3 text-[14px] text-[#183c2f] outline-none placeholder:text-[#b8c8de] focus:border-[#2e6f57]"
                />
              </label>
            </div>

            {formError && (
              <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-600">
                {formError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isCreatingExtension}
                onClick={() => setIsExtensionOpen(false)}
                className="h-10 rounded-full px-4 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingExtension}
                className="inline-flex h-10 min-w-[140px] items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCreatingExtension ? "Creating..." : "Create Extension"}
              </button>
            </div>
          </form>
        </div>
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
      ) : payments.length === 0 ? (
        <p className="text-[14px] text-[#667c74]">No payments found for this booking yet.</p>
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
                  <td className="px-4 py-3 font-semibold text-[#183c2f]">{money(payment.amount, payment.currency)}</td>
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
        <Detail label="Additional Amount" value={money(extension.additionalAmount, extension.currency)} strong />
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
