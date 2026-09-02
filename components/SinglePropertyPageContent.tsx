"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import PropertyImageGallery from "./PropertyImageGallery";
import ScrollAnimation from "./ScrollAnimation";
import { usePropertyById, usePropertyAvailability } from "@/lib/hooks/useProperties";
import { API_BASE_URL } from "@/lib/api/config";
import { useCreateRentBooking } from "@/lib/hooks/useBooking";
import { useCreatePaypalOrder } from "@/lib/hooks/usePayment";
import type { Property, PropertyCategoryGroup } from "@/lib/types/property";
import { savePaymentBookingContext } from "@/lib/utils/paymentBookingContext";
import { toast } from "sonner";


const ratingBars = [
  { score: 5, width: "100%" },
  { score: 4, width: "65%" },
  { score: 3, width: "53%" },
  { score: 2, width: "31%" },
  { score: 1, width: "14%" },
];

const reviews = [
  {
    name: "Cameron Williamson",
    role: "Designer",
    rating: "4.75",
    text: "Searches for properties, comparisons, and booking details were simple and clear. The villa matched the photos and the location was exactly what we needed.",
  },
  {
    name: "Mariam Nabil",
    role: "Guest",
    rating: "4.5",
    text: "The stay was quiet, clean, and close to the water. Check-in was easy, and the property felt comfortable for a short family break.",
  },
];

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarDay = {
  day: number;
  date: string;
  price?: string;
  status?: "available" | "booked" | "today" | "past";
};

type BookingCalendarItem = {
  from: string;
  to: string;
  isBookable?: boolean;
};

type QuickFact = {
  label: string;
  icon: string;
};

type DetailRow = [string, string];

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

function getNights(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00`).getTime();
  const end = new Date(`${checkOut}T00:00:00`).getTime();
  return Math.max(0, Math.round((end - start) / 86400000));
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const apiError = error as {
    response?: { data?: { errors?: string[]; message?: string } };
  };
  return apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || fallback;
}

export default function SinglePropertyPageContent({ id }: { id: string }) {
  const { data: property, isLoading } = usePropertyById(id);

  if (isLoading) return <div className="p-20 text-center">Loading Property...</div>;
  if (!property) return <div className="p-20 text-center">Property not found</div>;

  const galleryImages = (property.images || []).sort((a,b)=>a.displayOrder - b.displayOrder).map((img, i) => ({ src: `${API_BASE_URL}/${img.imageUrl}`, alt: property.name, className: i === 0 ? "col-span-2 row-span-2" : (i === 3 ? "col-span-2" : "") }));
  if (galleryImages.length === 0) galleryImages.push({ src: "/rent/property-card.png", alt: "Placeholder", className: "col-span-2 row-span-2" });
  const quickFacts = [
    { label: property.propertyTypeName || "Property", icon: "/homepage/properties/icons/size.svg" },
    { label: `${property.capacity || 2} Guests`, icon: "/billing/icons/tenant.svg" },
    { label: `${property.bedroomNo || 1} Bedroom`, icon: "/homepage/properties/icons/bed.svg" },
  ];

  const priceDetails: DetailRow[] = [
    ["Price per night:", `$${property.basePrice} / night`],
  ];

  const locationDetails: DetailRow[] = [
    ["City:", property.address?.city || "Unknown"],
    ["Area:", property.address?.area || "Unknown"],
    ["Availability:", property.isAvailable ? "Available" : "Not Available"],
  ];
  return (
    <main className="overflow-hidden bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <section className="px-5 pb-12 pt-6 lg:px-20 lg:pb-4 lg:pt-14">
        <div className="mx-auto w-full max-w-[1282px]">
          <ScrollAnimation delay={0}>
            <PropertyHeader property={property} />
          </ScrollAnimation>

          <div className="mt-5 min-w-0 lg:mt-[22px]">
            <ScrollAnimation delay={0} className="min-w-0">
              <PropertyImageGallery images={galleryImages} />
              <QuickFacts facts={quickFacts} />
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.1}>
            <DescriptionSection text={property.description} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <DetailsCards prices={priceDetails} location={locationDetails} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <AmenitiesSection categories={property.categories || []} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <AvailabilitySection propertyId={property.id} propertyName={property.name} capacity={property.capacity || 1} basePrice={property.basePrice || 0} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <ReviewsSection />
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
}

function PropertyHeader({ property }: { property: Property }) {
  return (
    <header>
      <nav className="flex items-center gap-1 text-[14px] leading-6 text-[#b3b3b3] lg:text-[20px] lg:leading-[30px]">
        <span className="relative grid size-5 place-items-center lg:size-6">
          <Image src="/single-property/icon-home.svg" alt="" fill sizes="24px" className="object-contain" />
        </span>
        <span>Home&gt;Apartment &gt;</span>
        <span className="text-[#292d32]">Property Details</span>
      </nav>

      <div className="mt-4 lg:mt-6">
        <h1 className="text-[16px] font-semibold leading-6 text-[#183c2f] lg:text-[36px] lg:font-medium lg:leading-[49px]">
          {property.name}
        </h1>
        <p className="mt-2 flex items-center gap-1 text-[12px] leading-6 text-[#b3b3b3] lg:text-[16px]">
          <Image src="/homepage/properties/icons/location.svg" alt="" width={24} height={24} className="size-6" />
          <span className="truncate">{[property.address?.street, property.address?.area, property.address?.city, property.address?.country].filter(Boolean).join(", ")}</span>
        </p>
      </div>
    </header>
  );
}


function QuickFacts({ facts }: { facts: QuickFact[] }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] leading-4 text-[#656566] lg:text-[14px]">
      {facts.map((fact) => (
        <span key={fact.label} className="inline-flex items-center gap-2">
          <Image src={fact.icon} alt="" width={16} height={16} className="size-4" />
          {fact.label}
        </span>
      ))}
    </div>
  );
}

function DescriptionSection({ text }: { text: string }) {
  return (
    <section className="mt-8 lg:mt-10">
      <SectionTitle>Description</SectionTitle>
      <p className="mt-[15px] max-w-[954px] text-[14px] leading-[1.9] text-[#656566] lg:text-[16px] lg:leading-[23px]">
        {text || "No description provided."}
      </p>
    </section>
  );
}

function DetailsCards({ prices, location }: { prices: DetailRow[]; location: DetailRow[] }) {
  return (
    <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.05fr)]">
      <InfoCard title="PRICE DETAILS" icon="/billing/icons/cash.svg" rows={prices} />
      <InfoCard title="Location" icon="/billing/icons/location.svg" rows={location} />
    </section>
  );
}

function InfoCard({ title, icon, rows }: { title: string; icon: string; rows: string[][] }) {
  return (
    <article className="rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase leading-4 tracking-[0.05em] text-[#183c2f]">
        <Image src={icon} alt="" width={22} height={20} className="max-h-5 w-5 object-contain" />
        {title}
      </h2>
      <dl className="mt-4 grid gap-3 text-[14px] leading-[22px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <dt className="text-[#183c2f]">{label}</dt>
            <dd className="whitespace-nowrap font-medium text-[#101d28]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function AmenitiesSection({ categories }: { categories: PropertyCategoryGroup[] }) {
  return (
    <section className="mt-7 rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <div className="flex items-center gap-2">
        <Image src="/icons/amenities/amenities-title.svg" alt="" width={20} height={20} className="object-contain" />
        <SectionTitle>Amenities</SectionTitle>
      </div>
      <div className="mt-6 grid gap-8 lg:gap-10">
        {categories?.map((cat) => (
          <div key={cat.categoryName}>
            <h3 className="inline-flex min-h-10 items-center rounded bg-[#f5f7f6] px-3 text-[14px] font-medium leading-6 text-[#183c2f] lg:text-[16px]">
              {cat.categoryName}
            </h3>
            <ul className="mt-4 grid gap-x-4 gap-y-4 text-[14px] leading-5 text-[#656566] lg:grid-cols-4">
              {cat.items?.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-2.5 shrink-0 rounded-full bg-[#cfb072]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function AvailabilitySection({
  propertyId,
  propertyName,
  capacity,
  basePrice,
}: {
  propertyId: string;
  propertyName: string;
  capacity: number;
  basePrice: number;
}) {
  const today = new Date();
  const todayString = formatLocalDate(today);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [monthsToShow, setMonthsToShow] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [formError, setFormError] = useState("");
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    person: Math.min(1, capacity),
  });

  const { mutate: createRentBooking, isPending: isCreatingBooking } = useCreateRentBooking();
  const { mutate: createPaypalOrder, isPending: isCreatingOrder } = useCreatePaypalOrder();
  const isPending = isCreatingBooking || isCreatingOrder;

  const startDate = todayString;
  const endDate = formatLocalDate(new Date(currentYear, currentMonth + monthsToShow, 0));
  const { data: availabilityData } = usePropertyAvailability(propertyId, startDate, endDate);
  const bookings = (availabilityData?.bookingCalendar || []) as BookingCalendarItem[];

  const isDateBooked = (dateString: string) => {
    const overlappingBooking = bookings.find((booking) => dateString >= booking.from && dateString <= booking.to);
    return Boolean(overlappingBooking && overlappingBooking.isBookable === false);
  };

  const rangeHasBookedDate = (from: string, to: string) => {
    let cursor = from;
    while (cursor <= to) {
      if (isDateBooked(cursor)) return true;
      cursor = addDays(cursor, 1);
    }
    return false;
  };

  const selectDate = (day: CalendarDay) => {
    if (day.status === "past" || day.status === "booked") return;
    setFormError("");

    if (!checkIn || checkOut || day.date <= checkIn) {
      setCheckIn(day.date);
      setCheckOut("");
      return;
    }

    if (rangeHasBookedDate(checkIn, day.date)) {
      setFormError("This date range includes unavailable days. Please choose a different checkout date.");
      return;
    }

    setCheckOut(day.date);
  };

  const getDaysForMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const dateString = formatLocalDate(date);
      const isPast = dateString < todayString;
      const isBooked = isDateBooked(dateString);
      const isToday = dateString === todayString;

      let status: CalendarDay["status"] = "available";
      if (isPast) status = "past";
      else if (isBooked) status = "booked";
      else if (isToday) status = "today";

      return { day: i + 1, date: dateString, status };
    });
  };

  const months = useMemo(
    () =>
      Array.from({ length: monthsToShow }, (_, index) => {
        const monthDate = new Date(currentYear, currentMonth + index, 1);
        return {
          title: monthDate.toLocaleString("default", { month: "long", year: "numeric" }),
          startOffset: monthDate.getDay(),
          days: getDaysForMonth(monthDate.getFullYear(), monthDate.getMonth()),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthsToShow, bookings, todayString],
  );

  const nights = checkIn && checkOut ? getNights(checkIn, checkOut) : 0;
  const estimatedTotal = nights * basePrice;

  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!bookingForm.fullName.trim() || !bookingForm.email.trim() || !bookingForm.phone.trim()) {
      setFormError("Please enter your name, email, and phone number.");
      return;
    }

    if (!checkIn || !checkOut) {
      setFormError("Please select your check-in and check-out dates from the calendar.");
      return;
    }

    if (checkOut <= checkIn) {
      setFormError("Check-out must be after check-in.");
      return;
    }

    if (bookingForm.person > capacity) {
      setFormError(`This property allows up to ${capacity} guests.`);
      return;
    }

    createRentBooking(
      {
        propertyId,
        fullName: bookingForm.fullName.trim(),
        email: bookingForm.email.trim(),
        phone: bookingForm.phone.trim(),
        person: bookingForm.person,
        checkIn,
        checkOut,
      },
      {
        onSuccess: (res) => {
          if (!res.isSuccess || !res.data?.bookingId) {
            const message = res.errors?.[0] || res.message || "Could not create this booking.";
            setFormError(message);
            toast.error(message);
            return;
          }

          createPaypalOrder(
            { bookingId: res.data.bookingId, bookingExtensionId: null },
            {
              onSuccess: (orderRes) => {
                localStorage.setItem("paypal_order_id", orderRes.orderId);
                savePaymentBookingContext({
                  kind: "rent",
                  bookingId: res.data.bookingId,
                  bookingNumber: res.data.bookingNumber,
                  propertyId,
                  propertyName,
                  checkIn,
                  checkOut,
                  guests: bookingForm.person,
                });
                window.location.href = orderRes.approvalUrl;
              },
              onError: (error) => {
                const message = getApiErrorMessage(error, "Booking was created, but payment could not be started.");
                setFormError(message);
                toast.error(message);
              },
            }
          );
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Failed to create booking. Please check your details and try again.");
          setFormError(message);
          toast.error(message);
        },
      }
    );
  };

  return (
    <section className="mt-7 rounded-xl border border-[#e5edf1] bg-white p-4 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold leading-7 text-[#101d28]">
          <span
            aria-hidden="true"
            className="size-[18px] bg-[#d6a85c]"
            style={{
              WebkitMask: "url('/billing/icons/calendar.svg') center / contain no-repeat",
              mask: "url('/billing/icons/calendar.svg') center / contain no-repeat",
            }}
          />
          Availability & Booking
        </h2>

        <div className="inline-flex rounded-full border border-[#dfe8e4] bg-[#f8faf9] p-1">
          {[1, 2, 3].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setMonthsToShow(count)}
              className={`h-9 rounded-full px-4 text-[12px] font-semibold transition ${
                monthsToShow === count ? "bg-[#2e6f57] text-white" : "text-[#667c74] hover:text-[#183c2f]"
              }`}
            >
              {count} mo
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-[980px] gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
        {months.map((month) => (
          <CalendarMonth
            key={month.title}
            {...month}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDate={selectDate}
          />
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-4 text-[11px] leading-4 text-[#6f8793] lg:ml-1">
        <Legend label="Past" className="bg-[#f1f5f8]" />
        <Legend label="Today" className="border border-[#2e6f57] bg-white" />
        <Legend label="Booked" className="bg-[#e9eef3]" />
        <Legend label="Selected" className="bg-[#2e6f57]" />
      </div>

      <form onSubmit={submitBooking} className="mt-8 grid gap-5 rounded-xl border border-[#dfe8e4] bg-[#fbfdfc] p-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Full Name</span>
            <input
              type="text"
              value={bookingForm.fullName}
              onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Email</span>
            <input
              type="email"
              value={bookingForm.email}
              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Phone</span>
            <input
              type="tel"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Guests</span>
            <select
              value={bookingForm.person}
              onChange={(e) => setBookingForm({ ...bookingForm, person: Number(e.target.value) })}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            >
              {Array.from({ length: Math.max(1, capacity) }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-xl border border-[#dfe8e4] bg-white p-4">
          <h3 className="text-[15px] font-semibold text-[#101d28]">Booking Summary</h3>
          <dl className="mt-4 grid gap-3 text-[13px] leading-5">
            <div className="flex justify-between gap-4">
              <dt className="text-[#667c74]">Check-in</dt>
              <dd className="font-semibold text-[#183c2f]">{checkIn || "Select date"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#667c74]">Check-out</dt>
              <dd className="font-semibold text-[#183c2f]">{checkOut || "Select date"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#667c74]">Nights</dt>
              <dd className="font-semibold text-[#183c2f]">{nights || "-"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#eef3f1] pt-3">
              <dt className="text-[#667c74]">Estimated total</dt>
              <dd className="font-semibold text-[#2e6f57]">${estimatedTotal}</dd>
            </div>
          </dl>

          {formError && (
            <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-600">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Processing..." : "Book & Pay Now"}
          </button>
        </div>
      </form>
    </section>
  );
}

function CalendarMonth({
  title,
  startOffset,
  days,
  checkIn,
  checkOut,
  onSelectDate,
}: {
  title: string;
  startOffset: number;
  days: CalendarDay[];
  checkIn: string;
  checkOut: string;
  onSelectDate: (day: CalendarDay) => void;
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-center text-[13px] font-bold leading-5 text-[#101d28]">{title}</h3>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekdays.map((day) => (
          <span key={day} className="grid h-5 place-items-center text-[9px] font-bold text-[#101d28]">
            {day}
          </span>
        ))}

        {Array.from({ length: startOffset }, (_, index) => (
          <span key={`empty-${index}`} aria-hidden="true" className="h-[38px] lg:h-[42px]" />
        ))}

        {days.map((calendarDay) => (
          <CalendarDayButton
            key={calendarDay.date}
            day={calendarDay}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}

function CalendarDayButton({
  day,
  checkIn,
  checkOut,
  onSelectDate,
}: {
  day: CalendarDay;
  checkIn: string;
  checkOut: string;
  onSelectDate: (day: CalendarDay) => void;
}) {
  const isDisabled = day.status === "past" || day.status === "booked";
  const isRangeEdge = day.date === checkIn || day.date === checkOut;
  const isInRange = Boolean(checkIn && checkOut && day.date > checkIn && day.date < checkOut);
  const stateClass = isRangeEdge
    ? "border-[#2e6f57] bg-[#2e6f57] font-bold text-white shadow-[0_4px_12px_rgba(46,111,87,0.18)]"
    : isInRange
      ? "border-[#a7cabb] bg-[#eef7f3] font-bold text-[#2e6f57]"
      : day.status === "available"
        ? "border-[#2e6f57] bg-[#f5f7f6] font-bold text-[#2e6f57] shadow-[0_1px_0_rgba(46,111,87,0.08)] hover:bg-[#eef7f3]"
        : day.status === "booked"
          ? "border-[#dfe7ee] bg-[#edf2f6] text-[#7e8c98]"
          : day.status === "today"
            ? "border-[#2e6f57] bg-white text-[#2e6f57] hover:bg-[#eef7f3]"
            : "border-[#dfe7ee] bg-white text-[#2f3a48]";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onSelectDate(day)}
      className={`flex h-[38px] min-w-0 flex-col items-center justify-center rounded-md border text-center text-[10px] leading-none transition lg:h-[42px] ${
        isDisabled ? "cursor-not-allowed" : ""
      } ${stateClass}`}
    >
      <span className={day.status === "available" || isRangeEdge ? "font-bold" : ""}>
        {day.day}
      </span>
      {day.price && (
        <span className="mt-0.5 text-[6px] font-bold leading-none text-current">
          {day.price}
        </span>
      )}
    </button>
  );
}

function Legend({ label, className }: { label: string; className: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`size-2.5 rounded-sm ${className}`} />
      {label}
    </span>
  );
}

function ReviewsSection() {
  return (
    <section className="mt-9 lg:mt-12">
      <div className="rounded-lg border border-[#dfe8e4] bg-white p-5 shadow-[0_4px_10px_rgba(175,132,255,0.03)] lg:p-[30px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(12rem,0.4fr)_minmax(16rem,0.6fr)] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3">
              <span className="text-[56px] font-semibold leading-none text-[#183c2f] lg:text-[72px]">4.5</span>
              <span className="text-[34px] leading-none text-[#cfb072]">★</span>
            </div>
            <p className="mt-2 inline-flex rounded-full bg-[#f5f7f6] px-6 py-2 text-[12px] leading-4 text-[#656566]">
              653 reviews
            </p>
          </div>

          <div className="grid gap-3">
            {ratingBars.map((bar) => (
              <div key={bar.score} className="grid grid-cols-[2rem_1fr] items-center gap-2">
                <span className="text-[12px] text-[#656566]">{bar.score} ★</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-[#e7edf3]">
                  <span className="block h-full rounded-full bg-[#cfb072]" style={{ width: bar.width }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-lg border border-[#dfe8e4] bg-[#fbfdfc] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[16px] font-semibold leading-6 text-[#183c2f]">{review.name}</h3>
                  <p className="text-[13px] leading-5 text-[#656566]">{review.role}</p>
                </div>
                <span className="whitespace-nowrap text-[14px] font-medium text-[#cfb072]">★ {review.rating}</span>
              </div>
              <p className="mt-4 text-[14px] leading-7 text-[#656566]">{review.text}</p>
            </article>
          ))}
        </div>
      </div>

      <AddReviewForm />
    </section>
  );
}

function AddReviewForm() {
  return (
    <section className="mt-8">
      <h2 className="text-[24px] font-semibold leading-9 text-[#183c2f]">Add Review</h2>
      <p className="mt-3 text-[14px] leading-6 text-[#656566]">
        Your email address will not be published. Required fields are marked *
      </p>

      <form className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-[16px] leading-6 text-[#183c2f]">Review</span>
          <select className="mt-2 h-12 w-full rounded-lg border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#656566] outline-none focus:border-[#2e6f57]">
            <option>Rate this property</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
          </select>
        </label>

        <label className="block">
          <span className="text-[16px] leading-6 text-[#183c2f]">Comment</span>
          <textarea
            placeholder="Text..."
            className="mt-2 min-h-[94px] w-full resize-none rounded-lg border border-[#dfe8e4] bg-white p-3 text-[14px] text-[#183c2f] outline-none placeholder:text-[#b3b3b3] focus:border-[#2e6f57]"
          />
        </label>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[#2e6f57] text-[16px] font-semibold text-white transition hover:bg-[#255f49] lg:ml-auto lg:w-[299px]"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[20px] font-semibold leading-7 text-[#101d28]">{children}</h2>;
}
