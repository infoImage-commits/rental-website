"use client";

import { useState } from "react";
import Link from "next/link";
import { useInHouseBookings } from "@/lib/hooks/useBooking";

function getDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("available")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("booked")) return "bg-amber-50 text-amber-700";
  if (normalized.includes("house")) return "bg-[#e8f1ff] text-[#2c5a96]";
  return "bg-[#f5f7f6] text-[#667c74]";
}

export default function InHouseBookingsContent() {
  const [from, setFrom] = useState(getDateOffset(0));
  const [to, setTo] = useState(getDateOffset(1));
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const [formError, setFormError] = useState("");

  const { data, isLoading, isFetching, isError } = useInHouseBookings(appliedRange ?? {});
  const units = data?.units ?? [];

  function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!from) {
      setFormError("Choose a from date.");
      return;
    }

    if (!to) {
      setFormError("Choose a to date.");
      return;
    }

    if (to <= from) {
      setFormError("The to date must be after the from date.");
      return;
    }

    setAppliedRange({ from, to });
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Operations</p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            In-House
          </h1>
          <p className="mt-1 max-w-2xl text-[14px] leading-6 text-[#667c74]">
            View unit availability, booked units, and guests currently in house for a selected range.
          </p>
        </div>
        <Link
          href="/admin/bookings/create"
          className="inline-flex h-10 items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
        >
          Create Booking
        </Link>
      </header>

      <form
        onSubmit={handleGenerate}
        className="mb-6 grid gap-4 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_8px_24px_rgba(31,77,61,0.04)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
      >
        <DateField label="From Date" value={from} onChange={setFrom} />
        <DateField label="To Date" value={to} onChange={setTo} />
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isFetching}
            className="inline-flex h-11 w-full min-w-[120px] items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isFetching ? "Loading..." : "Generate"}
          </button>
        </div>
        {formError && (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-600 sm:col-span-3">
            {formError}
          </p>
        )}
      </form>

      {!appliedRange ? (
        <div className="rounded-2xl border border-[#dfe8e4] bg-white p-10 text-center shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
          <p className="text-[16px] font-semibold text-[#183c2f]">Choose dates to generate the in-house list.</p>
          <p className="mt-1 text-[14px] text-[#667c74]">The to date is an exclusive boundary.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Total Units" value={data?.totalUnits ?? 0} />
            <Metric label="In-House" value={data?.inHouseCount ?? 0} />
            <Metric label="Booked" value={data?.bookedCount ?? 0} />
            <Metric label="Available" value={data?.availableCount ?? 0} />
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
            <div className="border-b border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
              <p className="text-[14px] font-semibold text-[#183c2f]">
                {formatDate(appliedRange.from)} - {formatDate(appliedRange.to)}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-[14px]">
                <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Unit No.</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Bookings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4f2]">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-[#8a9a94]">
                        Loading units...
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-[#183c2f]">
                        Failed to load in-house data.
                      </td>
                    </tr>
                  ) : units.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <p className="text-[16px] font-medium text-[#183c2f]">No units found</p>
                        <p className="mt-1 text-[14px] text-[#667c74]">Try a different date range.</p>
                      </td>
                    </tr>
                  ) : (
                    units.map((unit) => (
                      <tr key={unit.unitId} className="transition hover:bg-[#f8faf9]">
                        <td className="px-5 py-4 font-semibold text-[#183c2f]">{unit.unitName}</td>
                        <td className="px-5 py-4 font-mono text-[12px] text-[#414847]">{unit.unitNumber}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(unit.statusName)}`}>
                            {unit.statusName || unit.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {unit.bookings.length === 0 ? (
                            <span className="text-[13px] text-[#8a9a94]">No bookings</span>
                          ) : (
                            <div className="grid gap-2">
                              {unit.bookings.map((booking) => (
                                <div
                                  key={booking.bookingId}
                                  className="rounded-xl border border-[#dfe8e4] bg-white px-3 py-2 text-[13px] leading-5"
                                >
                                  <Link
                                    href={`/admin/bookings/${booking.bookingId}`}
                                    className="font-semibold text-[#183c2f] hover:underline"
                                  >
                                    {booking.bookingNumber}
                                  </Link>
                                  <span className="mx-2 text-[#b8c8be]">|</span>
                                  <span className="text-[#414847]">{booking.guestName}</span>
                                  <span className="mx-2 text-[#b8c8be]">|</span>
                                  <span className="text-[#667c74]">
                                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                  </span>
                                  <span className="mx-2 text-[#b8c8be]">|</span>
                                  <span className="font-medium text-[#2e6f57]">
                                    {booking.bookingSourceName || booking.bookingSource}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.04)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a9a94]">{label}</p>
      <p className="mt-2 text-[28px] font-semibold text-[#183c2f]">{value}</p>
    </div>
  );
}
