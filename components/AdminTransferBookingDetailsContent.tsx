"use client";

import Link from "next/link";
import { useAdminTransferBooking } from "@/lib/hooks/useBooking";

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function formatTime(value?: string | null) {
  if (!value) return "-";
  return value.slice(0, 5);
}

function statusClass(statusName: string) {
  const normalized = statusName.toLowerCase();
  if (normalized.includes("confirm") || normalized.includes("paid")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("pending") || statusName === "0") return "bg-amber-50 text-amber-700";
  if (normalized.includes("cancel")) return "bg-red-50 text-red-700";
  return "bg-[#f5f7f6] text-[#667c74]";
}

export default function AdminTransferBookingDetailsContent({ id }: { id: string }) {
  const { data: booking, isLoading, isError } = useAdminTransferBooking(id);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[14px] text-[#8a9a94]">
        <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading transfer booking...
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-10 text-center">
        <p className="text-[18px] font-semibold text-[#183c2f]">Transfer booking not found</p>
        <Link href="/admin/transfer-bookings" className="mt-4 inline-flex text-[14px] font-semibold text-[#2e6f57]">
          Back to transfer bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6">
        <Link href="/admin/transfer-bookings" className="text-[13px] font-semibold text-[#2e6f57] hover:underline">
          Back to transfer bookings
        </Link>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          {booking.bookingNumber}
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          Transfer route, pickup details, booking status, and backend payment confirmation status.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.8fr)]">
        <div className="grid gap-6">
          <Section title="Booking Summary">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Detail label="Booking Number" value={booking.bookingNumber} mono />
              <BadgeDetail label="Booking Status" value={booking.statusName} />
              <BadgeDetail label="Payment Status" value={booking.paymentStatusName} />
              <Detail label="Passengers" value={String(booking.passengers)} strong />
            </div>
          </Section>

          <Section title="Route">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="From" value={booking.fromLocationName} strong />
              <Detail label="To" value={booking.toLocationName} strong />
            </div>
          </Section>

          <Section title="Trip Details">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Detail label="Trip Type" value={booking.tripTypeName} strong />
              <Detail label="Pickup Date" value={formatDate(booking.pickupDate)} strong />
              <Detail label="Pickup Time" value={formatTime(booking.pickupTime)} strong />
              <Detail label="Flight Number" value={booking.flightNumber || "-"} />
              <Detail label="Return Date" value={formatDate(booking.returnDate)} />
              <Detail label="Return Time" value={formatTime(booking.returnTime)} />
            </div>
          </Section>
        </div>

        <aside className="grid gap-6 self-start">
          <Section title="Pickup Notes">
            <p className="text-[14px] leading-6 text-[#414847]">{booking.pickupNotes || "-"}</p>
          </Section>

          <Section title="Drop-off Notes">
            <p className="text-[14px] leading-6 text-[#414847]">{booking.dropOffNotes || "-"}</p>
          </Section>

          <section className="rounded-2xl border border-[#dfe8e4] bg-[#f5f7f6] p-5">
            <h2 className="text-[15px] font-semibold text-[#183c2f]">Payment Confirmation</h2>
            <p className="mt-2 text-[13px] leading-5 text-[#667c74]">
              Transfer payment is confirmed by the shared PayPal success flow, which calls the backend capture endpoint after PayPal redirects back.
            </p>
          </section>
        </aside>
      </div>
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

function BadgeDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8a9a94]">{label}</dt>
      <dd className="mt-1">
        <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(value)}`}>
          {value}
        </span>
      </dd>
    </div>
  );
}
