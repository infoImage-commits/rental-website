"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PropertyImageGallery from "./PropertyImageGallery";
import ScrollAnimation from "./ScrollAnimation";
import {
  useCheckPropertyAvailabilityRange,
  useCheckPropertyDailyPrices,
  usePropertyById,
  usePropertyAvailability,
} from "@/lib/hooks/useProperties";
import { API_BASE_URL } from "@/lib/api/config";
import { useCreateRentBooking } from "@/lib/hooks/useBooking";
import { useCreatePaypalOrder } from "@/lib/hooks/usePayment";
import { usePropertyCategories } from "@/lib/hooks/usePropertyCategory";
import { usePropertyCategoryItems } from "@/lib/hooks/usePropertyCategoryItem";
import { useLandmarks } from "@/lib/hooks/useAttributeGroupItem";
import type { Property, PropertyCategoryGroup } from "@/lib/types/property";
import type { AttributeGroupItem } from "@/lib/types/attributeGroupItem";
import { useReviews, usePropertyAverageRating, useCreateReview } from "@/lib/hooks/useReview";
import { savePaymentBookingContext } from "@/lib/utils/paymentBookingContext";
import { formatUsd } from "@/lib/utils/currency";
import { DEFAULT_LANDMARK_ICON } from "@/lib/constants/landmarks";
import { getPropertyLandmarks } from "@/lib/utils/landmarks";
import { getPropertyCategoryGroupsFromValues } from "@/lib/utils/propertyCategoryValues";
import { toast } from "sonner";


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

function resolveApiImageUrl(url?: string | null) {
  if (!url || url.trim() === "") return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http") || trimmed.startsWith("/")) return trimmed;
  return `${API_BASE_URL}/${trimmed.replace(/^\/+/, "")}`;
}

function normalizeLookupKey(value: string) {
  return value.trim().toLowerCase();
}

function resolveAmenityIcon(icon?: string | null) {
  if (!icon || icon.trim() === "") return "/icons/amenities/amenities-title.svg";
  const trimmed = icon.trim();
  if (trimmed.startsWith("http") || trimmed.startsWith("/")) return trimmed;
  return `/icons/amenities/${trimmed}.svg`;
}

export default function SinglePropertyPageContent({ id }: { id: string }) {
  const { data: property, isLoading } = usePropertyById(id);
  const { data: includeCategories = [] } = usePropertyCategories();
  const { data: includeItems = [] } = usePropertyCategoryItems();
  const { data: landmarkItems = [] } = useLandmarks();

  if (isLoading) return <div className="p-20 text-center">Loading Property...</div>;
  if (!property) return <div className="p-20 text-center">Property not found</div>;

  const propertyWithOptionalCover = property as Property & { coverImageUrl?: string | null };
  const galleryImages = (property.images || [])
    .sort((a,b)=>a.displayOrder - b.displayOrder)
    .map((img, i) => ({ src: resolveApiImageUrl(img.imageUrl), alt: property.name, className: i === 0 ? "col-span-2 row-span-2" : (i === 3 ? "col-span-2" : "") }));
  const fallbackImage = resolveApiImageUrl(propertyWithOptionalCover.coverImageUrl) || resolveApiImageUrl(property.category?.imageUrl) || "/rent/property-card.png";
  if (galleryImages.length === 0) galleryImages.push({ src: fallbackImage, alt: property.name, className: "col-span-2 row-span-2" });
  const categoryNameById = new Map(includeCategories.map(category => [category.id, category.name]));
  const categoryIconByName = new Map(includeCategories.map(category => [
    normalizeLookupKey(category.name),
    category.defaultIcon || category.icon,
  ]));
  const itemIconByName = new Map<string, string | null>();
  const itemIconByCategoryAndName = new Map<string, string | null>();
  includeItems.forEach(item => {
    itemIconByName.set(normalizeLookupKey(item.name), item.icon);
    const categoryName = categoryNameById.get(item.propertyCategoryId);
    if (categoryName) {
      itemIconByCategoryAndName.set(`${normalizeLookupKey(categoryName)}::${normalizeLookupKey(item.name)}`, item.icon);
    }
  });
  const quickFacts = [
    { label: property.propertyTypeName || "Property", icon: "/homepage/properties/icons/size.svg" },
    { label: `${property.capacity || 2} Guests`, icon: "/billing/icons/tenant.svg" },
    { label: `${property.bedroomNo || 1} Bedroom`, icon: "/homepage/properties/icons/bed.svg" },
  ];

  const priceDetails: DetailRow[] = [
    ["Price per night:", `${formatUsd(property.basePrice)} / night`],
  ];

  const locationDetails: DetailRow[] = [
    ["City:", property.address?.city || "Unknown"],
    ["Area:", property.address?.area || "Unknown"],
    ["Availability:", property.isAvailable ? "Available" : "Not Available"],
  ];
  const amenityCategories = getPropertyCategoryGroupsFromValues(property, includeCategories, includeItems);
  const selectedLandmarks = getPropertyLandmarks(property, landmarkItems);
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
            <AmenitiesSection
              categories={amenityCategories}
              categoryIconByName={categoryIconByName}
              itemIconByName={itemIconByName}
              itemIconByCategoryAndName={itemIconByCategoryAndName}
            />
          </ScrollAnimation>

          {selectedLandmarks.length > 0 && (
            <ScrollAnimation delay={0.1}>
              <LandmarksSection landmarks={selectedLandmarks} />
            </ScrollAnimation>
          )}
          
          <ScrollAnimation delay={0.1}>
            <AvailabilitySection propertyId={property.id} propertyName={property.name} capacity={property.capacity || 1} basePrice={property.basePrice || 0} />
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <ReviewsSection propertyId={property.id} propertyName={property.name} />
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

function AmenitiesSection({
  categories,
  categoryIconByName,
  itemIconByName,
  itemIconByCategoryAndName,
}: {
  categories: PropertyCategoryGroup[];
  categoryIconByName: Map<string, string | null>;
  itemIconByName: Map<string, string | null>;
  itemIconByCategoryAndName: Map<string, string | null>;
}) {
  return (
    <section className="mt-7 rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <div className="flex items-center gap-2">
        <Image src="/icons/amenities/amenities-title.svg" alt="" width={20} height={20} className="object-contain" />
        <SectionTitle>Amenities</SectionTitle>
      </div>
      <div className="mt-6 grid gap-8 lg:gap-10">
        {categories?.map((cat) => (
          <div key={cat.categoryName}>
            <h3 className="inline-flex min-h-10 items-center gap-2 rounded bg-[#f5f7f6] px-3 text-[14px] font-medium leading-6 text-[#183c2f] lg:text-[16px]">
              <Image
                src={resolveAmenityIcon(categoryIconByName.get(normalizeLookupKey(cat.categoryName)))}
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain"
              />
              {cat.categoryName}
            </h3>
            <ul className="mt-4 grid gap-x-4 gap-y-4 text-[14px] leading-5 text-[#656566] lg:grid-cols-4">
              {cat.items?.map((item) => {
                const categoryKey = normalizeLookupKey(cat.categoryName);
                const itemKey = normalizeLookupKey(item);
                const icon = itemIconByCategoryAndName.get(`${categoryKey}::${itemKey}`) ?? itemIconByName.get(itemKey);

                return (
                  <li key={item} className="flex items-center gap-3">
                    <Image
                      src={resolveAmenityIcon(icon)}
                      alt=""
                      width={18}
                      height={18}
                      className="size-[18px] shrink-0 object-contain"
                    />
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function LandmarksSection({ landmarks }: { landmarks: AttributeGroupItem[] }) {
  if (landmarks.length === 0) return null;

  return (
    <section className="mt-7 rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <div className="flex items-center gap-2">
        <Image src={DEFAULT_LANDMARK_ICON} alt="" width={20} height={20} className="size-5 object-contain" />
        <SectionTitle>Landmarks</SectionTitle>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {landmarks.map((landmark) => (
          <article key={landmark.id} className="flex min-w-0 items-center gap-3 rounded-lg bg-[#f5f7f6] px-4 py-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-[#2e6f57]">
              <Image src={DEFAULT_LANDMARK_ICON} alt="" width={18} height={18} className="size-[18px] object-contain" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-semibold text-[#183c2f]">{landmark.key}</h3>
              <p className="mt-0.5 text-[13px] font-medium text-[#667c74]">{landmark.value}</p>
            </div>
          </article>
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
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    person: Math.min(1, capacity),
  });
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  // Restore saved booking draft on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCheckIn = urlParams.get("checkIn") || urlParams.get("from");
        const urlCheckOut = urlParams.get("checkOut") || urlParams.get("to");

        const saved = localStorage.getItem(`rent_booking_draft_${propertyId}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setBookingForm((prev) => ({
              fullName: typeof parsed.fullName === "string" ? parsed.fullName : prev.fullName,
              email: typeof parsed.email === "string" ? parsed.email : prev.email,
              phone: typeof parsed.phone === "string" ? parsed.phone : prev.phone,
              person: typeof parsed.person === "number" ? Math.min(Math.max(1, parsed.person), capacity) : prev.person,
            }));

            if (typeof parsed.checkIn === "string" && parsed.checkIn >= todayString) {
              setCheckIn(parsed.checkIn);
            }
            if (typeof parsed.checkOut === "string" && parsed.checkOut > todayString) {
              setCheckOut(parsed.checkOut);
            }
            if (typeof parsed.hasAcceptedRules === "boolean") {
              setHasAcceptedRules(parsed.hasAcceptedRules);
            }
          }
        }

        // If URL search params provided dates from vacation homes filter, use them
        if (urlCheckIn && urlCheckIn >= todayString) {
          setCheckIn(urlCheckIn);
        }
        if (urlCheckOut && (!urlCheckIn || urlCheckOut > urlCheckIn)) {
          setCheckOut(urlCheckOut);
        }
      } catch (err) {
        console.warn("Could not restore booking draft", err);
      } finally {
        setHasRestoredDraft(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [propertyId, capacity, todayString]);

  // Persist booking draft whenever user changes data
  useEffect(() => {
    if (typeof window === "undefined" || !hasRestoredDraft) return;

    const storageKey = `rent_booking_draft_${propertyId}`;
    const hasData =
      bookingForm.fullName.trim() !== "" ||
      bookingForm.email.trim() !== "" ||
      bookingForm.phone.trim() !== "" ||
      checkIn !== "" ||
      checkOut !== "" ||
      hasAcceptedRules;

    try {
      if (hasData) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            fullName: bookingForm.fullName,
            email: bookingForm.email,
            phone: bookingForm.phone,
            person: bookingForm.person,
            checkIn,
            checkOut,
            hasAcceptedRules,
          })
        );
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (err) {
      console.warn("Could not save booking draft", err);
    }
  }, [bookingForm, checkIn, checkOut, hasAcceptedRules, hasRestoredDraft, propertyId]);

  const { mutate: createRentBooking, isPending: isCreatingBooking } = useCreateRentBooking();
  const { mutate: createPaypalOrder, isPending: isCreatingOrder } = useCreatePaypalOrder();
  const {
    mutateAsync: checkDailyPrices,
    data: priceCheck,
    isPending: isCheckingPrice,
    reset: resetPriceCheck,
  } = useCheckPropertyDailyPrices();
  const { mutateAsync: checkAvailabilityRange, isPending: isCheckingAvailability } = useCheckPropertyAvailabilityRange();
  const isPending = isCreatingBooking || isCreatingOrder || isCheckingPrice || isCheckingAvailability;

  const startDate = todayString;
  const endDate = formatLocalDate(new Date(currentYear, currentMonth + monthsToShow, 0));
  const { data: availabilityData } = usePropertyAvailability(propertyId, startDate, endDate);
  const bookings = (availabilityData?.bookingCalendar || []) as BookingCalendarItem[];

  const isDateBooked = (dateString: string) => {
    const overlappingBooking = bookings.find((booking) => dateString >= booking.from && dateString < booking.to);
    return Boolean(overlappingBooking && overlappingBooking.isBookable === false);
  };

  const rangeHasBookedDate = (from: string, to: string, calendar = bookings) => {
    let cursor = from;
    while (cursor < to) {
      const overlappingBooking = calendar.find((booking) => cursor >= booking.from && cursor < booking.to);
      if (overlappingBooking && overlappingBooking.isBookable === false) return true;
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

  useEffect(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      resetPriceCheck();
      return;
    }

    let isCurrent = true;

    checkDailyPrices({
      propertyId,
      payload: { checkIn, checkOut },
    }).catch((error) => {
      if (!isCurrent) return;
      const message = getApiErrorMessage(error, "Could not check prices for this date range.");
      setFormError(message);
    });

    return () => {
      isCurrent = false;
    };
  }, [checkDailyPrices, checkIn, checkOut, propertyId, resetPriceCheck]);

  const nights = checkIn && checkOut ? getNights(checkIn, checkOut) : 0;
  const estimatedTotal = checkIn && checkOut && priceCheck?.isPriceAvailable ? priceCheck.totalPrice : nights * basePrice;
  const missingDates = priceCheck?.missingDates || [];
  const isPriceUnavailable = Boolean(checkIn && checkOut && priceCheck && !priceCheck.isPriceAvailable);

  const submitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const latestAvailability = await checkAvailabilityRange({ propertyId, startDate: checkIn, endDate: checkOut });
      const latestBookings = (latestAvailability?.bookingCalendar || []) as BookingCalendarItem[];

      if (rangeHasBookedDate(checkIn, checkOut, latestBookings)) {
        const message = "This date range includes unavailable days. Please choose a different checkout date.";
        setFormError(message);
        toast.error(message);
        return;
      }

      const latestPriceCheck = await checkDailyPrices({
        propertyId,
        payload: { checkIn, checkOut },
      });

      if (!latestPriceCheck?.isPriceAvailable) {
        const missing = latestPriceCheck?.missingDates?.length
          ? ` Missing prices: ${latestPriceCheck.missingDates.join(", ")}.`
          : "";
        const message = `Pricing is not available for the selected dates.${missing}`;
        setFormError(message);
        toast.error(message);
        return;
      }
    } catch (error) {
      const message = getApiErrorMessage(error, "Could not verify availability and pricing for this booking.");
      setFormError(message);
      toast.error(message);
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
        bookingSource: "Website",
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
            { bookingId: res.data.bookingId },
            {
              onSuccess: (orderRes) => {
                localStorage.setItem("paypal_order_id", orderRes.orderId);
                try {
                  localStorage.removeItem(`rent_booking_draft_${propertyId}`);
                } catch {
                  // Ignore
                }
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
              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value.replace(/[^\d+]/g, '') })}
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
              <dt className="text-[#667c74]">Total</dt>
              <dd className="font-semibold text-[#2e6f57]">
                {isCheckingPrice && checkIn && checkOut ? "Checking..." : formatUsd(estimatedTotal)}
              </dd>
            </div>
          </dl>

          {isPriceUnavailable && (
            <p className="mt-4 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-[12px] leading-5 text-amber-700">
              Pricing is missing for {missingDates.length ? missingDates.join(", ") : "this date range"}.
            </p>
          )}

          {formError && (
            <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-600">
              {formError}
            </p>
          )}

          <label className="mt-4 flex items-start gap-2 text-[13px] leading-5 text-[#656566] cursor-pointer">
            <input
              type="checkbox"
              checked={hasAcceptedRules}
              onChange={(e) => setHasAcceptedRules(e.target.checked)}
              className="mt-0.5 accent-[#2e6f57]"
            />
            <span>
              I have read and accepted the{" "}
              <Link
                href="/house-rules"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2e6f57] underline hover:no-underline"
              >
                House Rules
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={
              isPending ||
              isPriceUnavailable ||
              !bookingForm.fullName.trim() ||
              !bookingForm.email.trim() ||
              !bookingForm.phone.trim() ||
              !checkIn ||
              !checkOut ||
              checkOut <= checkIn ||
              bookingForm.person > capacity ||
              !hasAcceptedRules
            }
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
      ? "border-[#2e6f57] bg-[#2e6f57] font-bold text-white"
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

function ReviewsSection({ propertyId, propertyName }: { propertyId: string; propertyName: string }) {
  const { data: averageData } = usePropertyAverageRating(propertyId);
  const { data: reviewsData, isLoading: isLoadingReviews } = useReviews({
    SearchTerm: propertyName,
    PageSize: 10,
    SortBy: "createdAtUtc",
    IsDescending: true,
  });

  const reviews = reviewsData?.items ?? [];
  const average = averageData?.averageRating ?? 0;
  const totalReviews = averageData?.totalReviews ?? reviews.length;

  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const score = Math.min(5, Math.max(1, Math.round(r.rate)));
    counts[score] = (counts[score] || 0) + 1;
  });

  const ratingBars = [5, 4, 3, 2, 1].map((score) => {
    const count = counts[score] || 0;
    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { score, pct: `${pct.toFixed(0)}%`, count };
  });

  return (
    <section className="mt-9 lg:mt-12">
      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_4px_20px_rgba(31,77,61,0.04)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-bold text-[#183c2f] sm:text-[26px]">Guest Reviews & Ratings</h2>
          <a
            href="#add-review-section"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1F4D3D] px-6 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#183c2f] hover:shadow sm:w-auto"
          >
            <span>★</span>
            <span>Write a Review</span>
          </a>
        </div>
        
        <div className="mt-6 grid gap-6 border-b border-[#edf2ef] pb-8 lg:grid-cols-[minmax(12rem,0.35fr)_minmax(16rem,0.65fr)] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3">
              <span className="text-[52px] font-bold leading-none text-[#183c2f] lg:text-[68px]">
                {totalReviews > 0 ? average.toFixed(1) : "New"}
              </span>
              <span className="text-[34px] leading-none text-[#cfb072]">★</span>
            </div>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f4f7f5] px-5 py-2 text-[13px] font-medium text-[#40544c]">
              {totalReviews > 0
                ? `${totalReviews} verified ${totalReviews === 1 ? "review" : "reviews"}`
                : "No reviews yet"}
            </p>
          </div>

          <div className="grid gap-2.5">
            {ratingBars.map((bar) => (
              <div key={bar.score} className="grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3 text-[12px] text-[#656566]">
                <span className="font-medium">{bar.score} ★</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#eef2f0]">
                  <span
                    className="block h-full rounded-full bg-[#cfb072] transition-all duration-500"
                    style={{ width: bar.pct }}
                  />
                </span>
                <span className="text-right text-[11px] text-[#8a9a94]">{bar.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-8">
          {isLoadingReviews ? (
            <div className="flex h-32 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-[#183c2f] border-t-transparent" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-xl bg-[#f8faf9] p-8 text-center">
              <p className="text-[15px] font-medium text-[#183c2f]">
                No reviews yet for this vacation home
              </p>
              <p className="mt-1 text-[13px] text-[#667c74]">
                Be the first guest to share your feedback after completing your stay!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col justify-between rounded-xl border border-[#dfe8e4] bg-[#fbfdfc] p-5 shadow-sm transition hover:border-[#cfb072]/60 hover:shadow"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#183c2f]">
                          {review.customerName || "Verified Guest"}
                        </h3>
                        <p className="text-[12px] text-[#8a9a94]">
                          {new Date(review.createdAtUtc).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fef9ec] px-2.5 py-1 text-[13px] font-bold text-[#cfb072]">
                        ★ {review.rate}
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#40544c] whitespace-pre-wrap">
                      {review.comment}
                    </p>
                  </div>
                  {review.bookingNumber && (
                    <p className="mt-4 border-t border-[#edf2ef] pt-2.5 text-[11px] font-medium text-[#8a9a94]">
                      Stay verified • Booking {review.bookingNumber}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddReviewForm propertyName={propertyName} />
    </section>
  );
}

function AddReviewForm({ propertyName }: { propertyName: string }) {
  const [bookingNumber, setBookingNumber] = useState("");
  const [rate, setRate] = useState(5);
  const [hoverRate, setHoverRate] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate: submitReview, isPending } = useCreateReview();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedBooking = bookingNumber.trim();
    if (!trimmedBooking) {
      setErrorMessage("Please enter your booking confirmation number.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Please write a short comment about your stay.");
      return;
    }

    submitReview(
      {
        bookingNumber: trimmedBooking,
        rate,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          setSuccessMessage("Thank you! Your review has been submitted successfully.");
          toast.success("Review submitted successfully!");
          setBookingNumber("");
          setComment("");
          setRate(5);
        },
        onError: (err: unknown) => {
          const errorData = err as { response?: { data?: { errors?: string[]; message?: string } } };
          const rawError =
            errorData?.response?.data?.errors?.[0] ||
            errorData?.response?.data?.message ||
            "";

          let friendlyError =
            "Unable to submit review. Please verify your booking number and ensure your stay has concluded.";

          if (rawError.toLowerCase().includes("completed")) {
            friendlyError =
              "Reviews can only be created for completed bookings. Please leave your review on or after your checkout date once your stay has concluded. We look forward to hearing your thoughts then!";
          } else if (rawError.toLowerCase().includes("already") || rawError.toLowerCase().includes("unique")) {
            friendlyError =
              "A review has already been submitted for this booking number. Thank you for sharing your experience!";
          } else if (rawError.toLowerCase().includes("not found")) {
            friendlyError =
              "We couldn't find a booking matching this confirmation number. Please check your booking confirmation email.";
          } else if (rawError) {
            friendlyError = rawError;
          }

          setErrorMessage(friendlyError);
          toast.error(friendlyError);
        },
      }
    );
  }

  const ratingDescriptions: Record<number, string> = {
    5: "5 Stars - Excellent stay",
    4: "4 Stars - Very good",
    3: "3 Stars - Average",
    2: "2 Stars - Poor",
    1: "1 Star - Terrible",
  };

  return (
    <section id="add-review-section" className="mt-8 scroll-mt-24 rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-[22px] font-semibold leading-snug text-[#183c2f]">Leave a Review</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-[#656566]">
        Completed your stay at <span className="font-semibold text-[#183c2f]">{propertyName}</span>? We&apos;d love to hear how your trip went! Please enter your booking confirmation number below. Reviews can only be submitted on or after your checkout date once your booking is completed. Your verified name and stay details will be automatically linked — no profile photo or sign-up needed.
      </p>

      {errorMessage && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-[14px] text-amber-900">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 size-5 shrink-0 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="font-semibold">Review Notice</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-amber-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-[14px] text-green-800">
          <p className="font-semibold">Review Received</p>
          <p className="mt-0.5 text-[13px]">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        <div>
          <label className="block text-[14px] font-medium text-[#183c2f]">
            Booking Confirmation Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            placeholder="e.g. BK-XXXXXX"
            required
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:max-w-md"
          />
          <p className="mt-1 text-[12px] text-[#8a9a94]">
            Found in your confirmation email. Reviews can only be submitted on or after your checkout date once your booking is completed.
          </p>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-[#183c2f]">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRate(star)}
                  onMouseEnter={() => setHoverRate(star)}
                  onMouseLeave={() => setHoverRate(null)}
                  className="p-1 text-[26px] leading-none transition hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <span
                    className={
                      star <= (hoverRate ?? rate) ? "text-[#cfb072]" : "text-[#d1dcd6]"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[13px] font-medium text-[#656566]">
              {ratingDescriptions[hoverRate ?? rate]}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-[#183c2f]">
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share details about the cleanliness, location, check-in process, and comfort..."
            required
            rows={4}
            className="mt-2 w-full rounded-xl border border-[#dfe8e4] bg-white p-3.5 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10"
          />
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1F4D3D] px-8 text-[15px] font-semibold text-white shadow-md transition hover:bg-[#183c2f] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
          >
            {isPending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[20px] font-semibold leading-7 text-[#101d28]">{children}</h2>;
}
