"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminTransferBookings } from "@/lib/hooks/useBooking";
import type { AdminTransferBookingListQuery } from "@/lib/types/booking";

type FilterState = {
  bookingNumber: string;
  status: string;
  tripType: string;
  pickupDate: string;
  journeyId: string;
  sortBy: string;
  isDescending: boolean;
};

const defaultFilters: FilterState = {
  bookingNumber: "",
  status: "",
  tripType: "",
  pickupDate: "",
  journeyId: "",
  sortBy: "pickupDate",
  isDescending: true,
};

function compactQuery(filters: FilterState, page: number): AdminTransferBookingListQuery {
  return {
    bookingNumber: filters.bookingNumber || undefined,
    status: filters.status ? Number(filters.status) : undefined,
    tripType: filters.tripType ? Number(filters.tripType) : undefined,
    pickupDate: filters.pickupDate || undefined,
    journeyId: filters.journeyId || undefined,
    sortBy: filters.sortBy || undefined,
    isDescending: filters.isDescending,
    pageNumber: page,
    pageSize: 10,
  };
}

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

export default function AdminTransferBookingsContent() {
  const [page, setPage] = useState(1);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [filters, setFilters] = useState(defaultFilters);
  const { data: response, isLoading, isError } = useAdminTransferBookings(compactQuery(filters, page));
  const bookings = response?.items ?? [];

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  }

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setFilters(draftFilters);
  }

  function resetFilters() {
    setPage(1);
    setDraftFilters(defaultFilters);
    setFilters(defaultFilters);
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Management</p>
        <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          Transfer Bookings
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          View transfer reservations, trip details, and payment confirmation status.
        </p>
      </header>

      <form
        onSubmit={applyFilters}
        className="mb-6 grid gap-3 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_8px_24px_rgba(31,77,61,0.04)] lg:grid-cols-6"
      >
        <FilterInput
          label="Booking No."
          value={draftFilters.bookingNumber}
          onChange={(value) => updateFilter("bookingNumber", value)}
          placeholder="TR-000005"
        />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">Status</span>
          <select
            value={draftFilters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
          >
            <option value="">All</option>
            <option value="1">Pending Payment</option>
            <option value="2">Confirmed</option>
            <option value="3">Completed</option>
            <option value="4">Cancelled</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">Trip Type</span>
          <select
            value={draftFilters.tripType}
            onChange={(event) => updateFilter("tripType", event.target.value)}
            className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
          >
            <option value="">All</option>
            <option value="1">One Way</option>
            <option value="2">Round Trip</option>
          </select>
        </label>
        <FilterInput
          label="Pickup Date"
          type="date"
          value={draftFilters.pickupDate}
          onChange={(value) => updateFilter("pickupDate", value)}
          placeholder=""
        />
        <FilterInput
          label="Journey ID"
          value={draftFilters.journeyId}
          onChange={(value) => updateFilter("journeyId", value)}
          placeholder="Optional UUID"
        />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">Sort By</span>
          <select
            value={draftFilters.sortBy}
            onChange={(event) => updateFilter("sortBy", event.target.value)}
            className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
          >
            <option value="pickupDate">Pickup Date</option>
            <option value="bookingNumber">Booking Number</option>
            <option value="status">Status</option>
            <option value="tripType">Trip Type</option>
          </select>
        </label>

        <div className="flex items-end gap-2 lg:col-span-6">
          <label className="flex h-10 items-center gap-2 rounded-xl border border-[#dfe8e4] px-3 text-[13px] text-[#667c74]">
            <input
              type="checkbox"
              checked={draftFilters.isDescending}
              onChange={(event) => updateFilter("isDescending", event.target.checked)}
              className="size-4 accent-[#2e6f57]"
            />
            Descending
          </label>
          <button
            type="submit"
            className="h-10 rounded-full bg-[#2e6f57] px-5 text-[13px] font-semibold text-white transition hover:bg-[#255f49]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="h-10 rounded-full border border-[#dfe8e4] px-5 text-[13px] font-semibold text-[#667c74] transition hover:bg-[#f5f7f6]"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
              <tr>
                <th className="px-6 py-4">Booking</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Trip</th>
                <th className="px-6 py-4">Pickup</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Payment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-[14px] text-[#8a9a94]">
                    <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
                    Loading transfer bookings...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-[#183c2f]">
                    Failed to load transfer bookings.
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <p className="text-[16px] font-medium text-[#183c2f]">No transfer bookings found</p>
                    <p className="mt-1 text-[14px] text-[#667c74]">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-6 py-4">
                      <Link href={`/admin/transfer-bookings/${booking.id}`} className="font-semibold text-[#183c2f] hover:underline">
                        {booking.bookingNumber}
                      </Link>
                      <p className="mt-0.5 text-[12px] text-[#8a9a94]">{booking.passengers} passengers</p>
                    </td>
                    <td className="px-6 py-4 text-[#414847]">
                      {booking.fromLocationName} to {booking.toLocationName}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#667c74]">{booking.tripTypeName}</td>
                    <td className="px-6 py-4 text-[13px] text-[#667c74]">
                      {formatDate(booking.pickupDate)} at {formatTime(booking.pickupTime)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(booking.statusName)}`}>
                        {booking.statusName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(booking.paymentStatusName)}`}>
                        {booking.paymentStatusName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/transfer-bookings/${booking.id}`}
                        className="inline-flex h-8 items-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {response && response.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={!response.hasPreviousPage}
            className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[13px] font-medium text-[#667c74]">
            Page {response.pageNumber} of {response.totalPages}
          </span>
          <button
            onClick={() => setPage((current) => current + 1)}
            disabled={!response.hasNextPage}
            className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none placeholder:text-[#b8c8de] focus:border-[#2e6f57]"
      />
    </label>
  );
}
