"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateAdminPropertyBooking, useInHouseBookings } from "@/lib/hooks/useBooking";
import { useProperties } from "@/lib/hooks/useProperties";
import { BOOKING_SOURCES } from "@/lib/types/booking";
import type { BookingSource } from "@/lib/types/booking";
import { formatUsd } from "@/lib/utils/currency";

function getDateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as {
    response?: { data?: { errors?: string[]; message?: string } };
    message?: string;
  };
  return apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || apiError.message || fallback;
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("available")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("booked")) return "bg-amber-50 text-amber-700";
  if (normalized.includes("house")) return "bg-[#e8f1ff] text-[#2c5a96]";
  return "bg-[#f5f7f6] text-[#667c74]";
}

export default function AdminCreateBookingContent() {
  const router = useRouter();
  const defaultCheckIn = useMemo(() => getDateOffset(1), []);
  const defaultCheckOut = useMemo(() => getDateOffset(2), []);
  const [propertyId, setPropertyId] = useState("");
  const [bookingSource, setBookingSource] = useState<BookingSource>("Website");
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [propertySearch, setPropertySearch] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState(1);
  const [formError, setFormError] = useState("");

  const { data: propertiesResponse, isLoading: isLoadingProperties } = useProperties({
    pageNumber: 1,
    pageSize: 1000,
  });
  const { data: operationalData, isLoading: isLoadingStatus } = useInHouseBookings({
    from: checkIn,
    to: checkOut,
  });
  const { mutate: createBooking, isPending } = useCreateAdminPropertyBooking();

  const properties = propertiesResponse?.items ?? [];
  const selectedProperty = properties.find((property) => property.id === propertyId);
  const filteredProperties = useMemo(() => {
    const searchTerm = propertySearch.trim().toLowerCase();
    const matches = searchTerm
      ? properties.filter((property) =>
          [
            property.propertyNumber,
            property.name,
            property.city,
            property.country,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm)
        )
      : properties;

    if (!selectedProperty || matches.some((property) => property.id === selectedProperty.id)) {
      return matches;
    }

    return [selectedProperty, ...matches];
  }, [properties, propertySearch, selectedProperty]);
  const selectedUnitStatus = operationalData?.units.find((unit) => unit.unitId === propertyId);
  const knownUnavailable =
    selectedUnitStatus &&
    selectedUnitStatus.status.toLowerCase() !== "available" &&
    selectedUnitStatus.statusName.toLowerCase() !== "available";

  function validateForm() {
    if (!propertyId) return "Choose a property.";
    if (!checkIn) return "Choose a check-in date.";
    if (!checkOut) return "Choose a check-out date.";
    if (checkOut <= checkIn) return "Check-out must be after check-in.";
    if (!fullName.trim()) return "Enter the guest name.";
    if (!email.trim()) return "Enter the guest email.";
    if (!phone.trim()) return "Enter the guest phone.";
    if (person < 1) return "Guests must be at least 1.";
    if (selectedProperty && person > selectedProperty.capacity) {
      return `This property allows up to ${selectedProperty.capacity} guests.`;
    }
    if (knownUnavailable) return "This unit is not available for the selected dates.";
    return "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    createBooking(
      {
        unitId: propertyId,
        propertyId,
        checkIn,
        checkOut,
        bookingSource,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        person,
      },
      {
        onSuccess: (booking) => {
          toast.success(`Booking ${booking.bookingNumber} created.`);
          router.push(`/admin/bookings/${booking.bookingId}`);
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Could not create this booking.");
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
            Create Booking
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Create a confirmed property booking and block the selected unit.
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.05)] lg:p-7"
      >
        <section className="grid gap-4 lg:grid-cols-2">
          <label className="block lg:col-span-2">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property</span>
            <input
              type="search"
              value={propertySearch}
              onChange={(event) => setPropertySearch(event.target.value)}
              placeholder="Search by property number, name, city..."
              className="mb-2 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none placeholder:text-[#b8c8de] transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
            <select
              value={propertyId}
              onChange={(event) => setPropertyId(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            >
              <option value="">
                {isLoadingProperties
                  ? "Loading properties..."
                  : filteredProperties.length === 0
                    ? "No properties match this search"
                    : "Choose property"}
              </option>
              {filteredProperties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.propertyNumber} - {property.name}
                </option>
              ))}
            </select>
            {!isLoadingProperties && propertySearch.trim() && (
              <span className="mt-1.5 block text-[12px] text-[#8a9a94]">
                {filteredProperties.length} matching propert{filteredProperties.length === 1 ? "y" : "ies"}
              </span>
            )}
          </label>

          {selectedProperty && (
            <div className="rounded-xl bg-[#f5f7f6] p-4 text-[13px] leading-5 text-[#667c74] lg:col-span-2">
              <span className="font-semibold text-[#183c2f]">{selectedProperty.name}</span>
              <span className="mx-2 text-[#b8c8be]">|</span>
              Capacity {selectedProperty.capacity}
              <span className="mx-2 text-[#b8c8be]">|</span>
              Base {formatUsd(selectedProperty.basePrice)}
              {selectedUnitStatus && (
                <>
                  <span className="mx-2 text-[#b8c8be]">|</span>
                  <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusClass(selectedUnitStatus.statusName)}`}>
                    {selectedUnitStatus.statusName}
                  </span>
                </>
              )}
              {isLoadingStatus && <span className="ml-2 text-[#8a9a94]">Checking status...</span>}
            </div>
          )}

          <DateField label="Check-in" value={checkIn} onChange={setCheckIn} />
          <DateField label="Check-out" value={checkOut} onChange={setCheckOut} />

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Booking Source</span>
            <select
              value={bookingSource}
              onChange={(event) => setBookingSource(event.target.value as BookingSource)}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            >
              {BOOKING_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Guests</span>
            <input
              type="number"
              min={1}
              max={selectedProperty?.capacity}
              value={person}
              onChange={(event) => setPerson(Number(event.target.value))}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </label>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <TextField label="Guest Name" value={fullName} onChange={setFullName} placeholder="Full name" />
          <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="guest@email.com" />
          <TextField label="Phone" value={phone} onChange={setPhone} placeholder="+20..." />
        </section>

        {formError && (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] leading-5 text-red-600">
            {formError}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/bookings"
            className="inline-flex h-10 items-center justify-center rounded-full px-5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </form>
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

function TextField({
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
      <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none placeholder:text-[#b8c8de] transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
      />
    </label>
  );
}
