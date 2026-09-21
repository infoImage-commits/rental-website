"use client";

import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PropertyImageGallery from "./PropertyImageGallery";
import PropertyBookingCard from "./PropertyBookingCard";
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
import type { PropertyCategory, PropertyCategoryItem } from "@/lib/types/propertyCategory";
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

import DynamicAmenityIcon from "./DynamicAmenityIcon";
import { useI18n } from "./I18nProvider";

export default function SinglePropertyPageContent({ id }: { id: string }) {
  const { t, href } = useI18n();
  const { data: property, isLoading } = usePropertyById(id);
  const { data: includeCategories = [] } = usePropertyCategories();
  const { data: includeItems = [] } = usePropertyCategoryItems();
  const { data: landmarkItems = [] } = useLandmarks();
  const { data: averageData } = usePropertyAverageRating(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 animate-spin rounded-full border-3 border-[#183c2f] border-t-transparent" />
          <span className="text-[15px] font-medium text-[#183c2f]">{t("property.loading")}</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-20 text-center">
        <h2 className="text-[20px] font-bold text-[#183c2f]">{t("property.notFoundTitle")}</h2>
        <p className="mt-2 text-[14px] text-[#667c74]">{t("property.notFoundBody")}</p>
        <Link
          href={href("/rent")}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#183c2f] px-6 text-[14px] font-semibold text-white transition hover:bg-[#2e6f57]"
        >
          {t("property.browse")}
        </Link>
      </div>
    );
  }

  return (
    <PropertyDetailView
      property={property}
      includeCategories={includeCategories}
      includeItems={includeItems}
      landmarkItems={landmarkItems}
      averageRating={averageData?.averageRating ?? 0}
      totalReviews={averageData?.totalReviews ?? 0}
    />
  );
}

function PropertyDetailView({
  property,
  includeCategories,
  includeItems,
  landmarkItems,
  averageRating,
  totalReviews,
}: {
  property: Property;
  includeCategories: PropertyCategory[];
  includeItems: PropertyCategoryItem[];
  landmarkItems: AttributeGroupItem[];
  averageRating: number;
  totalReviews: number;
}) {
  const { t, locale } = useI18n();
  const propertyId = property.id;
  const propertyName = property.name;
  const basePrice = property.basePrice || 0;
  const capacity = property.capacity || 1;

  // ─── Booking State ───
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
        const urlPerson = Number(urlParams.get("person") || urlParams.get("MinCapacity") || urlParams.get("minCapacity"));

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
        if (Number.isFinite(urlPerson) && urlPerson >= 1) {
          setBookingForm((prev) => ({
            ...prev,
            person: Math.min(Math.max(1, urlPerson), capacity),
          }));
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
      setFormError(t("booking.errors.unavailableRange"));
      return;
    }

    setCheckOut(day.date);
  };

  const handleCheckInChange = (newCheckIn: string) => {
    setFormError("");
    setCheckIn(newCheckIn);
    if (checkOut && checkOut <= newCheckIn) {
      setCheckOut("");
    } else if (checkOut && rangeHasBookedDate(newCheckIn, checkOut)) {
      setCheckOut("");
      setFormError(t("booking.errors.unavailableSelected"));
    }
  };

  const handleCheckOutChange = (newCheckOut: string) => {
    setFormError("");
    if (!checkIn) {
      setFormError(t("booking.errors.selectCheckIn"));
      return;
    }
    if (newCheckOut <= checkIn) {
      setFormError(t("booking.errors.checkoutAfter"));
      return;
    }
    if (rangeHasBookedDate(checkIn, newCheckOut)) {
      setFormError(t("booking.errors.unavailableSelected"));
      return;
    }
    setCheckOut(newCheckOut);
  };

  const clearDates = () => {
    setCheckIn("");
    setCheckOut("");
    setFormError("");
  };

  const scrollToCalendar = () => {
    const el = document.getElementById("availability-calendar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          title: monthDate.toLocaleString(locale, { month: "long", year: "numeric" }),
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
      const message = getApiErrorMessage(error, t("booking.errors.priceCheckFailed"));
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
      setFormError(t("booking.errors.contact"));
      return;
    }

    if (!checkIn || !checkOut) {
      setFormError(t("booking.errors.dates"));
      return;
    }

    if (checkOut <= checkIn) {
      setFormError(t("booking.errors.checkoutAfter"));
      return;
    }

    if (bookingForm.person > capacity) {
      setFormError(t("booking.errors.capacity", { count: capacity }));
      return;
    }

    try {
      const latestAvailability = await checkAvailabilityRange({ propertyId, startDate: checkIn, endDate: checkOut });
      const latestBookings = (latestAvailability?.bookingCalendar || []) as BookingCalendarItem[];

      if (rangeHasBookedDate(checkIn, checkOut, latestBookings)) {
        const message = t("booking.errors.unavailableRange");
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
          ? ` ${t("booking.pricingMissing", { dates: latestPriceCheck.missingDates.join(", ") })}`
          : "";
        const message = t("booking.errors.priceUnavailable", { missing });
        setFormError(message);
        toast.error(message);
        return;
      }
    } catch (error) {
      const message = getApiErrorMessage(error, t("booking.errors.verifyFailed"));
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
            const message = res.errors?.[0] || res.message || t("booking.errors.createUnavailable");
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
                const message = getApiErrorMessage(error, t("booking.errors.paymentStartFailed"));
                setFormError(message);
                toast.error(message);
              },
            }
          );
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, t("booking.errors.createFailed"));
          setFormError(message);
          toast.error(message);
        },
      }
    );
  };

  // ─── Image Gallery and Info Setup ───
  const propertyWithOptionalCover = property as Property & { coverImageUrl?: string | null };
  const galleryImages = (property.images || [])
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => ({
      src: resolveApiImageUrl(img.imageUrl),
      alt: property.name,
    }));
  const fallbackImage =
    resolveApiImageUrl(propertyWithOptionalCover.coverImageUrl) ||
    resolveApiImageUrl(property.category?.imageUrl) ||
    "/rent/property-card.png";
  if (galleryImages.length === 0) {
    galleryImages.push({ src: fallbackImage, alt: property.name });
  }

  const categoryNameById = new Map(includeCategories.map((category) => [category.id, category.name]));
  const categoryIconByName = new Map<string, string | null>(
    includeCategories.map((category) => [
      normalizeLookupKey(category.name),
      category.defaultIcon || category.icon || null,
    ])
  );
  const itemIconByName = new Map<string, string | null>();
  const itemIconByCategoryAndName = new Map<string, string | null>();
  includeItems.forEach((item) => {
    itemIconByName.set(normalizeLookupKey(item.name), item.icon ?? null);
    const categoryName = categoryNameById.get(item.propertyCategoryId);
    if (categoryName) {
      itemIconByCategoryAndName.set(`${normalizeLookupKey(categoryName)}::${normalizeLookupKey(item.name)}`, item.icon ?? null);
    }
  });

  const quickFacts = [
    { label: property.propertyTypeName || t("property.quickType"), icon: "/homepage/properties/icons/size.svg" },
    { label: `${property.capacity || 2} ${t("property.guests")}`, icon: "/billing/icons/tenant.svg" },
    { label: `${property.bedroomNo || 1} ${Number(property.bedroomNo || 1) === 1 ? t("property.bedroom") : t("property.bedrooms")}`, icon: "/homepage/properties/icons/bed.svg" },
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
    <main className="bg-white pb-24 font-[var(--font-poppins)] text-[#183c2f] lg:pb-12">
      <section className="px-4 pb-12 pt-5 sm:px-6 lg:px-16 lg:pb-8 lg:pt-10">
        <div className="mx-auto w-full max-w-[1282px]">
          {/* ─── Top Breadcrumbs & Header ─── */}
          <ScrollAnimation delay={0}>
            <PropertyHeader property={property} />
          </ScrollAnimation>

          {/* ─── Desktop 2-Column Grid / Mobile Stacking ─── */}
          <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 xl:gap-12 lg:items-start">
            {/* ─── Left Column: Main Showcase ─── */}
            <div className="min-w-0 space-y-7">
              {/* Photo Gallery & Quick Facts */}
              <ScrollAnimation delay={0} className="min-w-0">
                <PropertyImageGallery images={galleryImages} />
                <QuickFacts facts={quickFacts} />
              </ScrollAnimation>

              {/* Description */}
              <ScrollAnimation delay={0.05}>
                <DescriptionSection text={property.description} />
              </ScrollAnimation>

              {/* Details Cards */}
              <ScrollAnimation delay={0.05}>
                <DetailsCards prices={priceDetails} location={locationDetails} />
              </ScrollAnimation>

              {/* Amenities */}
              <ScrollAnimation delay={0.05}>
                <AmenitiesSection
                  categories={amenityCategories}
                  categoryIconByName={categoryIconByName}
                  itemIconByName={itemIconByName}
                  itemIconByCategoryAndName={itemIconByCategoryAndName}
                />
              </ScrollAnimation>

              {/* Info Area (Landmarks) */}
              {selectedLandmarks.length > 0 && (
                <ScrollAnimation delay={0.05}>
                  <LandmarksSection landmarks={selectedLandmarks} />
                </ScrollAnimation>
              )}

              {/* Interactive Calendar */}
              <ScrollAnimation delay={0.05}>
                <AvailabilityCalendarSection
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onSelectDate={selectDate}
                  onClearDates={clearDates}
                  months={months}
                  monthsToShow={monthsToShow}
                  setMonthsToShow={setMonthsToShow}
                  nights={nights}
                />
              </ScrollAnimation>

              {/* Mobile Booking Section: Placed immediately after Availability & Dates on screens < lg */}
              <div className="mt-7 lg:hidden" id="booking-card-mobile">
                <PropertyBookingCard
                  idPrefix="mobile"
                  propertyId={property.id}
                  propertyName={property.name}
                  basePrice={basePrice}
                  capacity={capacity}
                  rating={averageRating}
                  totalReviews={totalReviews}
                  todayString={todayString}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  nights={nights}
                  onCheckInChange={handleCheckInChange}
                  onCheckOutChange={handleCheckOutChange}
                  onClearDates={clearDates}
                  bookingForm={bookingForm}
                  setBookingForm={setBookingForm}
                  hasAcceptedRules={hasAcceptedRules}
                  setHasAcceptedRules={setHasAcceptedRules}
                  formError={formError}
                  isPending={isPending}
                  isCheckingPrice={isCheckingPrice}
                  isPriceUnavailable={isPriceUnavailable}
                  estimatedTotal={estimatedTotal}
                  missingDates={missingDates}
                  onSubmitBooking={submitBooking}
                  onScrollToCalendar={scrollToCalendar}
                />
              </div>


            </div>

            {/* ─── Right Column: Sticky Booking Sidebar on Desktop (hidden on mobile) ─── */}
            <aside className="hidden lg:block lg:sticky lg:top-20 lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#cfb072_transparent] self-start pr-1">
              <PropertyBookingCard
                idPrefix="desktop"
                propertyId={property.id}
                propertyName={property.name}
                basePrice={basePrice}
                capacity={capacity}
                rating={averageRating}
                totalReviews={totalReviews}
                todayString={todayString}
                checkIn={checkIn}
                checkOut={checkOut}
                nights={nights}
                onCheckInChange={handleCheckInChange}
                onCheckOutChange={handleCheckOutChange}
                onClearDates={clearDates}
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
                hasAcceptedRules={hasAcceptedRules}
                setHasAcceptedRules={setHasAcceptedRules}
                formError={formError}
                isPending={isPending}
                isCheckingPrice={isCheckingPrice}
                isPriceUnavailable={isPriceUnavailable}
                estimatedTotal={estimatedTotal}
                missingDates={missingDates}
                onSubmitBooking={submitBooking}
                onScrollToCalendar={scrollToCalendar}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Reviews & Ratings Section (Full Width) ─── */}
      <section className="bg-[#f8faf9] py-16 sm:py-24">
        <div className="mx-auto max-w-[1282px] px-4 sm:px-6 lg:px-8">
          <ScrollAnimation delay={0.05}>
            <ReviewsSection propertyId={property.id} propertyName={property.name} />
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Mobile Sticky Bottom Bar (Screens < 1024px) ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#dfe8e4] bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-[1282px] items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-bold text-[#183c2f]">{formatUsd(basePrice)}</span>
              <span className="text-[12px] text-[#667c74]">/ night</span>
            </div>
            <p className="text-[11px] font-medium text-[#8a9a94]">
              {checkIn && checkOut
                ? `${checkIn} to ${checkOut} (${nights} ${nights === 1 ? "nt" : "nts"})`
                : t("booking.selectDates")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("booking-card-mobile") || document.getElementById("booking-card");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#2e6f57] px-6 text-[14px] font-semibold text-white shadow-md transition hover:bg-[#255f49] active:scale-95"
          >
            {t("common.bookNow")}
          </button>
        </div>
      </div>
    </main>
  );
}

function PropertyHeader({ property }: { property: Property }) {
  const { t, href } = useI18n();

  return (
    <header>
      <nav className="flex items-center gap-1.5 text-[13px] leading-6 text-[#8a9a94] lg:text-[14px]">
        <Link href={href("/")} className="hover:text-[#183c2f] transition flex items-center gap-1">
          <span className="relative grid size-4 place-items-center">
            <Image src="/single-property/icon-home.svg" alt="" fill sizes="16px" className="object-contain" />
          </span>
          <span>{t("common.home")}</span>
        </Link>
        <span>&gt;</span>
        <Link href={href("/rent")} className="hover:text-[#183c2f] transition">
          {t("property.vacationHomes")}
        </Link>
        <span>&gt;</span>
        <span className="truncate font-medium text-[#183c2f] max-w-[180px] sm:max-w-none">
          {property.name}
        </span>
      </nav>

      <div className="mt-3 lg:mt-4">
        <h1 className="text-[22px] font-bold leading-tight text-[#183c2f] sm:text-[28px] lg:text-[34px]">
          {property.name}
        </h1>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] leading-6 text-[#667c74] lg:text-[15px]">
          <Image src="/homepage/properties/icons/location.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
          <span className="truncate">
            {[property.address?.street, property.address?.area, property.address?.city, property.address?.country]
              .filter(Boolean)
              .join(", ") || "Hurghada, Egypt"}
          </span>
        </p>
      </div>
    </header>
  );
}

function QuickFacts({ facts }: { facts: QuickFact[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-x-6 gap-y-2.5 rounded-xl border border-[#dfe8e4] bg-[#fbfdfc] px-4 py-3 text-[13px] text-[#40544c] lg:text-[14px]">
      {facts.map((fact) => (
        <span key={fact.label} className="inline-flex items-center gap-2 font-medium">
          <Image src={fact.icon} alt="" width={18} height={18} className="size-[18px] object-contain" />
          {fact.label}
        </span>
      ))}
    </div>
  );
}

function DescriptionSection({ text }: { text: string }) {
  return (
    <section className="rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
      <SectionTitle>Description</SectionTitle>
      <p className="mt-3.5 text-[14px] leading-[1.8] text-[#556960] sm:text-[15px]">
        {text || "No description provided."}
      </p>
    </section>
  );
}

function DetailsCards({ prices, location }: { prices: DetailRow[]; location: DetailRow[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <InfoCard title="PRICE DETAILS" icon="/billing/icons/cash.svg" rows={prices} />
      <InfoCard title="LOCATION" icon="/billing/icons/location.svg" rows={location} />
    </section>
  );
}

function InfoCard({ title, icon, rows }: { title: string; icon: string; rows: string[][] }) {
  return (
    <article className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
      <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase leading-4 tracking-[0.05em] text-[#183c2f]">
        <Image src={icon} alt="" width={20} height={20} className="size-5 object-contain" />
        {title}
      </h2>
      <dl className="mt-4 grid gap-3 text-[14px] leading-[22px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-[#667c74]">{label}</dt>
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
    <section className="rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
      <div className="flex items-center gap-2">
        <Image src="/icons/amenities/amenities-title.svg" alt="" width={22} height={22} className="object-contain" />
        <SectionTitle>Amenities</SectionTitle>
      </div>
      <div className="mt-5 grid gap-6">
        {categories?.map((cat) => (
          <div key={cat.categoryName}>
            <h3 className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#f5f7f6] px-3 text-[14px] font-semibold text-[#183c2f]">
              <DynamicAmenityIcon
                icon={categoryIconByName.get(normalizeLookupKey(cat.categoryName))}
                width={18}
                height={18}
                className="size-[18px] object-contain"
              />
              {cat.categoryName}
            </h3>
            <ul className="mt-3 grid gap-x-4 gap-y-2.5 text-[14px] leading-5 text-[#556960] sm:grid-cols-2 md:grid-cols-3">
              {cat.items?.map((item) => {
                const categoryKey = normalizeLookupKey(cat.categoryName);
                const itemKey = normalizeLookupKey(item);
                const icon = itemIconByCategoryAndName.get(`${categoryKey}::${itemKey}`) ?? itemIconByName.get(itemKey);

                return (
                  <li key={item} className="flex items-center gap-2.5">
                    <DynamicAmenityIcon
                      icon={icon}
                      width={16}
                      height={16}
                      className="size-4 shrink-0 object-contain"
                    />
                    <span>{item}</span>
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
    <section className="rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
      <div className="flex items-center gap-2">
        <Image src={DEFAULT_LANDMARK_ICON} alt="" width={22} height={22} className="size-[22px] object-contain" />
        <SectionTitle>Info Area</SectionTitle>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {landmarks.map((landmark) => (
          <article key={landmark.id} className="flex min-w-0 items-center gap-3 rounded-xl bg-[#f5f7f6] px-4 py-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#2e6f57]">
              <Image src={DEFAULT_LANDMARK_ICON} alt="" width={16} height={16} className="size-4 object-contain" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-[13px] font-semibold text-[#183c2f]">{landmark.key}</h3>
              <p className="mt-0.5 text-[12px] font-medium text-[#667c74]">{landmark.value}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AvailabilityCalendarSection({
  checkIn,
  checkOut,
  onSelectDate,
  onClearDates,
  months,
  monthsToShow,
  setMonthsToShow,
  nights,
}: {
  checkIn: string;
  checkOut: string;
  onSelectDate: (day: CalendarDay) => void;
  onClearDates: () => void;
  months: Array<{
    title: string;
    startOffset: number;
    days: CalendarDay[];
  }>;
  monthsToShow: number;
  setMonthsToShow: (count: number) => void;
  nights: number;
}) {
  const { t } = useI18n();

  return (
    <section
      id="availability-calendar"
      className="scroll-mt-24 rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(24,60,47,0.03)]"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#edf2ef] pb-4">
        <div>
          <h2 className="flex items-center gap-2 text-[17px] font-bold text-[#183c2f]">
            <span
              aria-hidden="true"
              className="size-[18px] bg-[#d6a85c]"
              style={{
                WebkitMask: "url('/billing/icons/calendar.svg') center / contain no-repeat",
                mask: "url('/billing/icons/calendar.svg') center / contain no-repeat",
              }}
            />
            {t("property.availability")}
          </h2>
          <p className="mt-1 text-[13px] text-[#667c74]">
            {checkIn && checkOut
              ? t("property.selectedRange", { checkIn, checkOut, nights, nightLabel: nights === 1 ? t("common.night") : t("common.nights") })
              : checkIn
                ? t("property.checkInOnly", { checkIn })
                : t("property.selectDatesCalendar")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(checkIn || checkOut) && (
            <button
              type="button"
              onClick={onClearDates}
              className="rounded-full border border-[#dfe8e4] bg-white px-3 py-1 text-[12px] font-medium text-[#667c74] hover:border-[#cfb072] hover:text-[#183c2f]"
            >
              {t("common.clearDates")}
            </button>
          )}

          <div className="inline-flex rounded-full border border-[#dfe8e4] bg-[#f8faf9] p-1">
            {[1, 2].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setMonthsToShow(count)}
                className={`h-8 rounded-full px-3 text-[12px] font-semibold transition ${
                  monthsToShow === count ? "bg-[#2e6f57] text-white" : "text-[#667c74] hover:text-[#183c2f]"
                }`}
              >
                {t("property.oneMonth", { count })}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-6 grid gap-6 ${monthsToShow > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {months.map((month) => (
          <CalendarMonth
            key={month.title}
            {...month}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 border-t border-[#edf2ef] pt-4 text-[11px] leading-4 text-[#6f8793]">
        <Legend label={t("property.past")} className="bg-[#f1f5f8]" />
        <Legend label={t("property.today")} className="border border-[#2e6f57] bg-white" />
        <Legend label={t("property.booked")} className="bg-[#e9eef3]" />
        <Legend label={t("property.selected")} className="bg-[#2e6f57]" />
      </div>
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
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-7 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[18px] font-bold text-[#183c2f] sm:text-[22px]">Guest Reviews & Ratings</h2>
          <a
            href="#add-review-section"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#1F4D3D] px-5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#183c2f] hover:shadow sm:w-auto"
          >
            <span>★</span>
            <span>Write a Review</span>
          </a>
        </div>

        <div className="mt-5 grid gap-6 border-b border-[#edf2ef] pb-6 sm:grid-cols-[minmax(10rem,0.4fr)_1fr] sm:items-center">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2.5">
              <span className="text-[44px] font-bold leading-none text-[#183c2f] sm:text-[54px]">
                {totalReviews > 0 ? average.toFixed(1) : "New"}
              </span>
              <span className="text-[28px] leading-none text-[#cfb072]">★</span>
            </div>
            <p className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#f4f7f5] px-4 py-1.5 text-[12px] font-medium text-[#40544c]">
              {totalReviews > 0
                ? `${totalReviews} verified ${totalReviews === 1 ? "review" : "reviews"}`
                : "No reviews yet"}
            </p>
          </div>

          <div className="grid gap-2">
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
        <div className="mt-6">
          {isLoadingReviews ? (
            <div className="flex h-28 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-[#183c2f] border-t-transparent" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-xl bg-[#f8faf9] p-6 text-center">
              <p className="text-[14px] font-semibold text-[#183c2f]">
                No reviews yet for this vacation home
              </p>
              <p className="mt-1 text-[13px] text-[#667c74]">
                Be the first guest to share your feedback after completing your stay!
              </p>
            </div>
          ) : (
            <div className="grid gap-3.5 sm:grid-cols-2">
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
    <section id="add-review-section" className="scroll-mt-24 rounded-2xl border border-[#dfe8e4] bg-white p-5 sm:p-7 shadow-[0_2px_12px_rgba(24,60,47,0.03)]">
      <h2 className="text-[18px] font-bold leading-snug text-[#183c2f] sm:text-[20px]">Leave a Review</h2>
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
  return <h2 className="text-[18px] font-bold leading-7 text-[#101d28] sm:text-[20px]">{children}</h2>;
}
