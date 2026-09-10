"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useInHouseBookings } from "@/lib/hooks/useBooking";
import { useDownloadReport } from "@/lib/hooks/useReports";

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

function formatBookingStatus(status: string) {
  if (!status) return "Unknown";
  return status.replace(/([A-Z])/g, " $1").trim();
}

function BookingStatusBadge({ status }: { status: string }) {
  const norm = (status || "").toLowerCase();
  let badgeStyle = "bg-[#f5f7f6] text-[#556961] border-[#dfe8e4]";
  let dotColor = "bg-[#8a9a94]";
  const label = formatBookingStatus(status);

  if (norm.includes("confirmed") || norm.includes("paid") || norm.includes("approved")) {
    badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200/80";
    dotColor = "bg-emerald-600";
  } else if (norm.includes("pending")) {
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-200/80";
    dotColor = "bg-amber-600";
  } else if (norm.includes("cancel") || norm.includes("rejected")) {
    badgeStyle = "bg-rose-50 text-rose-700 border-rose-200/80";
    dotColor = "bg-rose-600";
  } else if (norm.includes("completed")) {
    badgeStyle = "bg-blue-50 text-blue-700 border-blue-200/80";
    dotColor = "bg-blue-600";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold ${badgeStyle}`}
    >
      <span className={`size-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}

export default function InHouseBookingsContent() {
  const [from, setFrom] = useState(getDateOffset(0));
  const [to, setTo] = useState(getDateOffset(1));
  const [appliedRange, setAppliedRange] = useState<{ from: string; to: string } | null>(null);
  const [formError, setFormError] = useState("");
  const [downloadingFormat, setDownloadingFormat] = useState<"excel" | "pdf" | null>(null);

  const { data, isLoading, isFetching, isError } = useInHouseBookings(appliedRange ?? {});
  const { mutate: downloadReport, isPending: isDownloadingReport } = useDownloadReport();
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

  function handleDownload(format: "excel" | "pdf") {
    const reportFrom = appliedRange?.from || from;
    const reportTo = appliedRange?.to || to;

    if (!reportFrom || !reportTo || reportTo <= reportFrom) {
      toast.error("Please choose a valid date range to download the report.");
      return;
    }

    setDownloadingFormat(format);
    downloadReport(
      { type: "in-house", format, from: reportFrom, to: reportTo },
      {
        onSuccess: ({ filename }) => {
          setDownloadingFormat(null);
          toast.success(`${filename} downloaded.`);
        },
        onError: (err) => {
          setDownloadingFormat(null);
          toast.error(err.message || "Failed to download the report.");
        },
      }
    );
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Operations</p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Reservations
          </h1>
          <p className="mt-1 max-w-2xl text-[14px] leading-6 text-[#667c74]">
            View reservation status and booking details for a selected range.
          </p>
        </div>
        <Link
          href="/admin/bookings/create"
          className="inline-flex h-10 items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
        >
          Create Booking
        </Link>
      </header>

      <div className="mb-6 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_8px_24px_rgba(31,77,61,0.04)] sm:p-5">
        <form
          onSubmit={handleGenerate}
          className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
        >
          <DateField label="From Date" value={from} onChange={setFrom} />
          <DateField label="To Date" value={to} onChange={setTo} />
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isFetching}
              className="inline-flex h-11 w-full min-w-[130px] items-center justify-center rounded-full bg-[#2e6f57] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
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
      </div>

      {!appliedRange ? (
        <div className="rounded-2xl border border-[#dfe8e4] bg-white p-10 text-center shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#eff8f3] text-[#2e6f57]">
            <CalendarTodayIcon className="size-7" />
          </div>
          <p className="mt-4 text-[18px] font-semibold text-[#183c2f]">Choose dates to generate the reservations list.</p>
          <p className="mx-auto mt-1 max-w-md text-[14px] text-[#667c74]">
            Select your desired from and to dates above and click Generate to view reservation status and guest occupancy for that timeframe.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Total Units" value={data?.totalUnits ?? 0} />
            <Metric label="Reservations" value={data?.inHouseCount ?? 0} />
            <Metric label="Booked" value={data?.bookedCount ?? 0} />
            <Metric label="Available" value={data?.availableCount ?? 0} />
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
            <div className="flex flex-col gap-3 border-b border-[#dfe8e4] bg-[#f8faf9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <p className="text-[14px] font-semibold text-[#183c2f]">
                  {formatDate(appliedRange.from)} - {formatDate(appliedRange.to)}
                </p>
              </div>

              {/* Quick Report Downloads */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[#667c74]">Download Report:</span>
                <button
                  type="button"
                  onClick={() => handleDownload("excel")}
                  disabled={isDownloadingReport}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#183c2f] transition hover:border-[#2e6f57] hover:bg-[#eff8f3] disabled:opacity-60"
                  title="Download Reservations Report as Excel"
                >
                  {downloadingFormat === "excel" ? (
                    <span className="size-3.5 animate-spin rounded-full border-2 border-[#2e6f57]/30 border-t-[#2e6f57]" />
                  ) : (
                    <FileSpreadsheetIcon className="size-3.5 text-[#2e6f57]" />
                  )}
                  Excel
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("pdf")}
                  disabled={isDownloadingReport}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#183c2f] transition hover:border-[#2e6f57] hover:bg-[#eff8f3] disabled:opacity-60"
                  title="Download Reservations Report as PDF"
                >
                  {downloadingFormat === "pdf" ? (
                    <span className="size-3.5 animate-spin rounded-full border-2 border-[#2e6f57]/30 border-t-[#2e6f57]" />
                  ) : (
                    <FilePdfIcon className="size-3.5 text-rose-600" />
                  )}
                  PDF
                </button>
              </div>
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
                                  className="flex flex-wrap items-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-3.5 py-2 text-[13px] leading-5 shadow-xs"
                                >
                                  <Link
                                    href={`/admin/bookings/${booking.bookingId}`}
                                    className="font-semibold text-[#183c2f] hover:underline"
                                  >
                                    {booking.bookingNumber}
                                  </Link>
                                  <span className="text-[#dfe8e4]">•</span>
                                  <BookingStatusBadge status={booking.status} />
                                  <span className="text-[#dfe8e4]">•</span>
                                  <span className="font-medium text-[#414847]">{booking.guestName}</span>
                                  <span className="text-[#dfe8e4]">•</span>
                                  <span className="text-[#667c74]">
                                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                  </span>
                                  <span className="text-[#dfe8e4]">•</span>
                                  <span className="rounded-md bg-[#eff8f3] px-2 py-0.5 text-[11px] font-semibold text-[#2e6f57]">
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

function CalendarTodayIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function FileSpreadsheetIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 13h2" />
      <path d="M14 17h2" />
    </svg>
  );
}

function FilePdfIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15v-4h1.5a1.5 1.5 0 0 1 0 3H9" />
    </svg>
  );
}
