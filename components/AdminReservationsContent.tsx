"use client";

import { useState, useMemo } from "react";
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
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("available")) return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
  if (normalized.includes("booked")) return "bg-amber-50 text-amber-700 border border-amber-200/60";
  if (normalized.includes("house")) return "bg-[#e8f1ff] text-[#2c5a96] border border-[#2c5a96]/20";
  return "bg-[#f5f7f6] text-[#667c74] border border-[#dfe8e4]";
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

export default function AdminReservationsContent() {
  const today = useMemo(() => getDateOffset(0), []);
  const tomorrow = useMemo(() => getDateOffset(1), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [downloadingFormat, setDownloadingFormat] = useState<"excel" | "pdf" | null>(null);

  // Automatically fetch today's in-house reservations on page load - zero clicks required
  const { data, isLoading, isFetching, isError, refetch } = useInHouseBookings({
    from: today,
    to: tomorrow,
  });

  const { mutate: downloadReport, isPending: isDownloadingReport } = useDownloadReport();

  const allUnits = useMemo(() => data?.units ?? [], [data?.units]);

  const filteredUnits = useMemo(() => {
    return allUnits.filter((unit) => {
      const matchesSearch =
        !searchTerm.trim() ||
        unit.unitName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        unit.bookings.some(
          (b) =>
            b.guestName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );

      if (!matchesSearch) return false;

      if (statusFilter === "all") return true;
      const normalizedStatus = (unit.statusName || unit.status || "").toLowerCase();
      if (statusFilter === "in-house") return normalizedStatus.includes("house");
      if (statusFilter === "booked") return normalizedStatus.includes("booked");
      if (statusFilter === "available") return normalizedStatus.includes("available");

      return true;
    });
  }, [allUnits, searchTerm, statusFilter]);

  function handleDownload(format: "excel" | "pdf") {
    setDownloadingFormat(format);
    downloadReport(
      { type: "in-house", format, from: today, to: tomorrow },
      {
        onSuccess: ({ filename }) => {
          setDownloadingFormat(null);
          toast.success(`${filename} downloaded.`);
        },
        onError: (err) => {
          setDownloadingFormat(null);
          toast.error(err.message || "Failed to download today's reservations report.");
        },
      }
    );
  }

  const todayFormatted = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Top Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#d9a441]">
              Operations
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Today
            </span>
          </div>
          <h1 className="mt-1 text-[26px] font-bold leading-tight text-[#183c2f] lg:text-[32px]">
            Reservations
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Today&apos;s live in-house guest occupancy, unit availability, and active reservations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-4 text-[13px] font-medium text-[#183c2f] shadow-sm transition hover:bg-[#f5f7f6] disabled:opacity-60"
            title="Refresh today's data"
          >
            <svg
              className={`size-4 ${isFetching ? "animate-spin text-[#2e6f57]" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>{isFetching ? "Updating..." : "Refresh"}</span>
          </button>

          <Link
            href="/admin/bookings/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2e6f57] px-5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#255f49]"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Create Booking</span>
          </Link>
        </div>
      </header>

      {/* Today's KPI Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Units"
          value={isLoading ? "..." : data?.totalUnits ?? 0}
          subtitle="Managed properties"
          icon="building"
          accent="text-[#183c2f]"
        />
        <MetricCard
          label="In-House Today"
          value={isLoading ? "..." : data?.inHouseCount ?? 0}
          subtitle="Checked-in guests"
          icon="bed"
          accent="text-[#2c5a96]"
          highlight
        />
        <MetricCard
          label="Booked"
          value={isLoading ? "..." : data?.bookedCount ?? 0}
          subtitle="Reserved stays"
          icon="calendar"
          accent="text-[#cfb072]"
        />
        <MetricCard
          label="Available"
          value={isLoading ? "..." : data?.availableCount ?? 0}
          subtitle="Ready for check-in"
          icon="check"
          accent="text-emerald-700"
        />
      </div>

      {/* Search & Actions Bar */}
      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_8px_24px_rgba(31,77,61,0.04)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search and Status Filters */}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative min-w-[240px] flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search unit, guest name, booking #..."
                className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white pl-9 pr-3 text-[13px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57]"
              />
              <svg
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a9a94]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-[#667c74]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#183c2f] outline-none transition focus:border-[#2e6f57]"
              >
                <option value="all">All Units ({allUnits.length})</option>
                <option value="in-house">In-House ({data?.inHouseCount ?? 0})</option>
                <option value="booked">Booked ({data?.bookedCount ?? 0})</option>
                <option value="available">Available ({data?.availableCount ?? 0})</option>
              </select>
            </div>
          </div>

          {/* Quick Date Display & Report Export */}
          <div className="flex flex-wrap items-center gap-3 border-t border-[#f0f4f2] pt-3 lg:border-t-0 lg:pt-0">
            <span className="text-[12px] font-medium text-[#8a9a94]">
              {todayFormatted}
            </span>

            <div className="h-4 w-px bg-[#dfe8e4] hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-[#667c74]">Export:</span>
              <button
                type="button"
                onClick={() => handleDownload("excel")}
                disabled={isDownloadingReport}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-semibold text-[#183c2f] transition hover:border-[#2e6f57] hover:bg-[#eff8f3] disabled:opacity-60"
                title="Download today's reservations as Excel"
              >
                {downloadingFormat === "excel" ? (
                  <span className="size-3.5 animate-spin rounded-full border-2 border-[#2e6f57]/30 border-t-[#2e6f57]" />
                ) : (
                  <svg className="size-3.5 text-[#2e6f57]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                  </svg>
                )}
                Excel
              </button>

              <button
                type="button"
                onClick={() => handleDownload("pdf")}
                disabled={isDownloadingReport}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-semibold text-[#183c2f] transition hover:border-[#2e6f57] hover:bg-[#eff8f3] disabled:opacity-60"
                title="Download today's reservations as PDF"
              >
                {downloadingFormat === "pdf" ? (
                  <span className="size-3.5 animate-spin rounded-full border-2 border-rose-500/30 border-t-rose-600" />
                ) : (
                  <svg className="size-3.5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 15h6" />
                  </svg>
                )}
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Units & Bookings Table */}
      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-[14px]">
            <thead className="border-b border-[#dfe8e4] bg-[#f8faf9] text-[12px] font-semibold uppercase tracking-wider text-[#667c74]">
              <tr>
                <th className="px-5 py-4">Unit Name</th>
                <th className="px-5 py-4">Unit No.</th>
                <th className="px-5 py-4">Status Today</th>
                <th className="px-5 py-4">Active Reservations & Guest Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span className="size-7 animate-spin rounded-full border-3 border-[#2e6f57]/20 border-t-[#2e6f57]" />
                      <p className="text-[14px] font-medium text-[#667c74]">Loading today&apos;s reservations...</p>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="rounded-xl bg-red-50 p-6 max-w-md mx-auto text-red-700">
                      <p className="font-semibold">Unable to load reservations</p>
                      <p className="mt-1 text-[13px]">Please check your network connection or permissions.</p>
                      <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-[12px] font-semibold text-white"
                      >
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredUnits.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
                        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                      <p className="mt-3 text-[16px] font-semibold text-[#183c2f]">No matching units</p>
                      <p className="mt-1 text-[13px] text-[#667c74]">
                        {searchTerm || statusFilter !== "all"
                          ? "No units match your search or filter criteria. Try clearing the filters."
                          : "No in-house reservations recorded for today."}
                      </p>
                      {(searchTerm || statusFilter !== "all") && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                          }}
                          className="mt-3 text-[13px] font-semibold text-[#2e6f57] hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUnits.map((unit) => (
                  <tr key={unit.unitId} className="transition hover:bg-[#fbfdfc]">
                    <td className="px-5 py-4 font-semibold text-[#183c2f]">
                      {unit.unitName}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#f0f4f2] px-2.5 py-1 font-mono text-[12px] font-semibold text-[#183c2f]">
                        {unit.unitNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(unit.statusName || unit.status)}`}>
                        {unit.statusName || unit.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {unit.bookings.length === 0 ? (
                        <span className="text-[13px] italic text-[#aab4b0]">No guests checked in for today</span>
                      ) : (
                        <div className="grid gap-2">
                          {unit.bookings.map((booking) => (
                            <div
                              key={booking.bookingId}
                              className="flex flex-wrap items-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-3.5 py-2.5 text-[13px] shadow-xs"
                            >
                              <Link
                                href={`/admin/bookings/${booking.bookingId}`}
                                className="font-bold text-[#183c2f] hover:text-[#2e6f57] hover:underline"
                              >
                                {booking.bookingNumber}
                              </Link>
                              <span className="text-[#dfe8e4]">•</span>
                              <BookingStatusBadge status={booking.status} />
                              <span className="text-[#dfe8e4]">•</span>
                              <span className="font-semibold text-[#324b41]">{booking.guestName}</span>
                              <span className="text-[#dfe8e4]">•</span>
                              <span className="text-[#667c74]">
                                {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
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
    </div>
  );
}

function MetricCard({
  label,
  value,
  subtitle,
  icon,
  accent = "text-[#183c2f]",
  highlight = false,
}: {
  label: string;
  value: number | string;
  subtitle: string;
  icon: "building" | "bed" | "calendar" | "check";
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm transition ${
        highlight
          ? "border-[#2c5a96]/30 bg-gradient-to-br from-[#f2f7ff] to-white"
          : "border-[#dfe8e4] bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a9a94]">
            {label}
          </p>
          <p className={`mt-2 text-[32px] font-extrabold leading-none ${accent}`}>
            {value}
          </p>
          <p className="mt-1 text-[12px] text-[#667c74]">{subtitle}</p>
        </div>
        <div className="rounded-xl bg-[#f5f7f6] p-2.5 text-[#667c74]">
          {icon === "building" && (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 20V8l7-4 7 4v12M9 20v-6h6v6" />
            </svg>
          )}
          {icon === "bed" && (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 11V5M20 19v-7a2 2 0 0 0-2-2H9v9M4 19v-8h5M4 15h16" />
            </svg>
          )}
          {icon === "calendar" && (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          )}
          {icon === "check" && (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
