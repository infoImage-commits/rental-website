"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminPropertyBookings } from "@/lib/hooks/useBooking";
import type { AdminBookingListQuery } from "@/lib/types/booking";

type FilterState = {
  SearchTerm: string;
  BookingNumber: string;
  PropertyNumber: string;
  CustomerName: string;
  CustomerEmail: string;
  Status: string;
  SortBy: string;
  IsDescending: boolean;
};

const defaultFilters: FilterState = {
  SearchTerm: "",
  BookingNumber: "",
  PropertyNumber: "",
  CustomerName: "",
  CustomerEmail: "",
  Status: "",
  SortBy: "createdAtUtc",
  IsDescending: true,
};

function compactQuery(filters: FilterState, page: number): AdminBookingListQuery {
  return {
    SearchTerm: filters.SearchTerm || undefined,
    BookingNumber: filters.BookingNumber || undefined,
    PropertyNumber: filters.PropertyNumber || undefined,
    CustomerName: filters.CustomerName || undefined,
    CustomerEmail: filters.CustomerEmail || undefined,
    Status: filters.Status ? Number(filters.Status) : undefined,
    SortBy: filters.SortBy || undefined,
    IsDescending: filters.IsDescending,
    PageNumber: page,
    PageSize: 10,
  };
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function money(value: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function statusClass(statusName: string) {
  const normalized = statusName.toLowerCase();
  if (normalized.includes("confirm")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("pending")) return "bg-amber-50 text-amber-700";
  if (normalized.includes("cancel")) return "bg-red-50 text-red-700";
  return "bg-[#f5f7f6] text-[#667c74]";
}

export default function AdminBookingsContent() {
  const [page, setPage] = useState(1);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [filters, setFilters] = useState(defaultFilters);
  const query = compactQuery(filters, page);
  const { data: response, isLoading, isError } = useAdminPropertyBookings(query);
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
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Management</p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Bookings
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            View property bookings, payment status, and extension eligibility.
          </p>
        </div>
      </header>

      <form
        onSubmit={applyFilters}
        className="mb-6 grid gap-3 rounded-2xl border border-[#dfe8e4] bg-white p-4 shadow-[0_8px_24px_rgba(31,77,61,0.04)] lg:grid-cols-6"
      >
        <FilterInput
          label="Search"
          value={draftFilters.SearchTerm}
          onChange={(value) => updateFilter("SearchTerm", value)}
          placeholder="Name, email, booking..."
        />
        <FilterInput
          label="Booking No."
          value={draftFilters.BookingNumber}
          onChange={(value) => updateFilter("BookingNumber", value)}
          placeholder="BK-000003"
        />
        <FilterInput
          label="Property No."
          value={draftFilters.PropertyNumber}
          onChange={(value) => updateFilter("PropertyNumber", value)}
          placeholder="PR-000001"
        />
        <FilterInput
          label="Customer"
          value={draftFilters.CustomerName}
          onChange={(value) => updateFilter("CustomerName", value)}
          placeholder="Full name"
        />
        <FilterInput
          label="Email"
          type="email"
          value={draftFilters.CustomerEmail}
          onChange={(value) => updateFilter("CustomerEmail", value)}
          placeholder="customer@email.com"
        />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">Status</span>
          <select
            value={draftFilters.Status}
            onChange={(event) => updateFilter("Status", event.target.value)}
            className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
          >
            <option value="">All</option>
            <option value="1">Pending Payment</option>
            <option value="2">Confirmed</option>
            <option value="3">Completed</option>
            <option value="4">Cancelled</option>
          </select>
        </label>

        <div className="flex items-end gap-2 lg:col-span-6">
          <label className="block w-full max-w-[180px]">
            <span className="mb-1.5 block text-[12px] font-medium text-[#667c74]">Sort By</span>
            <select
              value={draftFilters.SortBy}
              onChange={(event) => updateFilter("SortBy", event.target.value)}
              className="h-10 w-full rounded-xl border border-[#dfe8e4] bg-white px-3 text-[13px] text-[#183c2f] outline-none focus:border-[#2e6f57]"
            >
              <option value="createdAtUtc">Created</option>
              <option value="bookingNumber">Booking Number</option>
              <option value="checkIn">Check-in</option>
              <option value="totalPrice">Total Price</option>
              <option value="status">Status</option>
            </select>
          </label>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-[#dfe8e4] px-3 text-[13px] text-[#667c74]">
            <input
              type="checkbox"
              checked={draftFilters.IsDescending}
              onChange={(event) => updateFilter("IsDescending", event.target.checked)}
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
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Stay</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-[14px] text-[#8a9a94]">
                    <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
                    Loading bookings...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-[#183c2f]">
                    Failed to load bookings.
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <p className="text-[16px] font-medium text-[#183c2f]">No bookings found</p>
                    <p className="mt-1 text-[14px] text-[#667c74]">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-6 py-4">
                      <Link href={`/admin/bookings/${booking.id}`} className="font-semibold text-[#183c2f] hover:underline">
                        {booking.bookingNumber}
                      </Link>
                      <p className="mt-0.5 text-[12px] text-[#8a9a94]">{booking.bookingTypeName}</p>
                    </td>
                    <td className="px-6 py-4 text-[#414847]">{booking.fullName}</td>
                    <td className="px-6 py-4 text-[13px] text-[#667c74]">
                      {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-[#183c2f]">{money(booking.totalPrice)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusClass(booking.statusName)}`}>
                        {booking.statusName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#667c74]">{formatDate(booking.createdAtUtc)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
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
