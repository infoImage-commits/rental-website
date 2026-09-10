"use client";

import { usePublicRentProperties } from "@/lib/hooks/useProperties";
import { PropertyType, type PropertyListItem } from "@/lib/types/property";
import { slugify } from "@/lib/utils/slugify";
import { API_BASE_URL } from "@/lib/api/config";
import { useCategories } from "@/lib/hooks/useCategory";
import { formatUsd } from "@/lib/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInHouseBookings } from "@/lib/hooks/useBooking";

type RentGridItem = PropertyListItem & {
  size?: number | null;
  areaName?: string | null;
};

type NormalizedPropertyCard = {
  id: string;
  title: string;
  location: string;
  beds: string;
  baths: string;
  size: string;
  price: number;
  image: string;
  url: string;
  isFeatured: boolean;
};

export default function PropertiesPageContent() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e6f57] border-t-transparent" /></div>}>
      <PropertiesPageInner />
    </Suspense>
  );
}

function PropertiesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();
  const paramsObj = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileFiltersOpen]);

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newParams = new URLSearchParams();

    const city = formData.get("city") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    const propertyType = formData.get("propertyType") as string;
    const from = (formData.get("from") as string)?.trim();
    const to = (formData.get("to") as string)?.trim();

    if (from && to) {
      newParams.append("from", from);
      newParams.append("to", to);
    } else if (from && !to) {
      const d = new Date(from);
      d.setDate(d.getDate() + 1);
      newParams.append("from", from);
      newParams.append("to", d.toISOString().split("T")[0]);
    }

    if (city) newParams.append("CategoryId", city);
    if (propertyType) newParams.append("PropertyType", propertyType);
    if (minPrice) newParams.append("MinPrice", minPrice);
    if (maxPrice) newParams.append("MaxPrice", maxPrice);

    const minCapacity = formData.get("minCapacity") as string;
    if (minCapacity) newParams.append("MinCapacity", minCapacity);

    const isAvailable = formData.get("isAvailable") === "on";
    if (isAvailable) newParams.append("IsAvailable", "true");

    const views = ["SeaView", "PoolView", "GardenView", "MountainView", "CityView"];
    views.forEach(v => {
      if (formData.get(`has${v}`) === "on") newParams.append(`Has${v}`, "true");
    });

    router.push(`/rent?${newParams.toString()}`);
    setMobileFiltersOpen(false);
  };

  return (
    <main className="bg-[#fafafa] font-[var(--font-poppins)] text-[#183c2f]">
      <PropertiesHero />

      {/* Mobile filter toggle bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e8e8e8] bg-white px-4 py-3 shadow-sm lg:hidden">
        <p className="text-[14px] font-semibold text-[#183c2f]">Rental Properties</p>
        <button
          id="open-filters-btn"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#2e6f57] px-4 py-2 text-[13px] font-semibold text-white shadow transition active:scale-95"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
            <path d="M0 1h14M2 6h10M4 11h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
          Filters
        </button>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile filter drawer slides from right */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-[90] flex w-full max-w-[340px] flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
              <h2 className="text-[18px] font-bold text-[#183c2f]">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="grid size-8 place-items-center rounded-full text-[#656566] transition hover:bg-[#f5f5f5]"
                aria-label="Close filters"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FilterForm key={`mobile-${paramsKey}`} paramsObj={paramsObj} onSubmit={handleFilterSubmit} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="mx-auto max-w-[1536px] px-4 pb-20 sm:px-6 lg:px-10">
        <ListingHeading />
        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-start lg:gap-8">
          {/* Desktop sidebar always visible, sticky */}
          <aside className="hidden lg:sticky lg:top-8 lg:block lg:w-[280px] lg:shrink-0">
            <FilterForm key={`desktop-${paramsKey}`} paramsObj={paramsObj} onSubmit={handleFilterSubmit} />
          </aside>
          {/* Property grid */}
          <div className="min-w-0 flex-1">
            <PropertyGrid key={`grid-${paramsKey}`} paramsObj={paramsObj} />
          </div>
        </div>
      </div>

      <RentCta />
    </main>
  );
}

function PropertiesHero() {
  return (
    <section className="relative flex h-[200px] w-full items-center overflow-hidden bg-[#2e6f57] lg:h-[280px]">
      <Image
        src="/rent/hero-texture.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-20 mix-blend-plus-lighter"
      />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute bottom-0 right-[6%] z-0 h-[76%] w-[38%] opacity-45 sm:right-[8%] sm:h-[82%] sm:w-[34%] lg:right-[5%] lg:h-[92%] lg:w-[28%] lg:opacity-100 xl:right-[9%] xl:w-[24%]"
      >
        <Image
          src="/rent/beach-lounge-chair-clean.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 28vw, 38vw"
          className="object-contain object-center"
        />
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-[1536px] px-5 lg:px-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[280px] sm:max-w-xl lg:max-w-xl"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[24px] font-bold leading-[1.2] text-white sm:text-3xl lg:text-[44px]"
          >
            Find Your Next Vacation Rental Home
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-[12px] leading-[1.6] text-white/90 sm:text-sm lg:mt-4 lg:text-[16px]"
          >
            Discover comfortable holiday apartments, beachside chalets, and studios for rent in Hurghada. Enjoy verified amenities, prime coastal locations, and a relaxing stay.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

const inputCls = "h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10";

function FilterForm({
  paramsObj,
  onSubmit,
}: {
  paramsObj: Record<string, string>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const { data: categories } = useCategories();

  const categoryIdParam = paramsObj.CategoryId || paramsObj.categoryId || "";
  const cityVal = categoryIdParam;
  const propertyTypeVal = paramsObj.PropertyType || paramsObj.propertyType || "";
  const minPriceVal = paramsObj.MinPrice || "";
  const maxPriceVal = paramsObj.MaxPrice || "";
  const minCapacityVal = paramsObj.MinCapacity || "";
  const isAvailableVal = paramsObj.IsAvailable === "true";
  const hasSeaViewVal = paramsObj.HasSeaView === "true";
  const hasPoolViewVal = paramsObj.HasPoolView === "true";
  const hasGardenViewVal = paramsObj.HasGardenView === "true";
  const hasMountainViewVal = paramsObj.HasMountainView === "true";
  const hasCityViewVal = paramsObj.HasCityView === "true";

  const fromVal = paramsObj.from || "";
  const toVal = paramsObj.to || "";
  const [fromDate, setFromDate] = useState(fromVal);
  const [toDate, setToDate] = useState(toVal);
  const [prevFrom, setPrevFrom] = useState(fromVal);
  const [prevTo, setPrevTo] = useState(toVal);

  if (prevFrom !== fromVal || prevTo !== toVal) {
    setPrevFrom(fromVal);
    setPrevTo(toVal);
    setFromDate(fromVal);
    setToDate(toVal);
  }

  const todayString = new Date().toISOString().split("T")[0];
  const minCheckOutDate = fromDate
    ? (() => {
        const next = new Date(fromDate);
        next.setDate(next.getDate() + 1);
        return next.toISOString().split("T")[0];
      })()
    : todayString;

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFromDate(val);
    if (val && toDate && toDate <= val) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      setToDate(next.toISOString().split("T")[0]);
    }
  };

  const handleClearFormDates = () => {
    setFromDate("");
    setToDate("");
  };

  const checkboxes = [
    { name: "isAvailable", label: "Available Now", defaultChecked: isAvailableVal },
    { name: "hasSeaView", label: "Sea View", defaultChecked: hasSeaViewVal },
    { name: "hasPoolView", label: "Pool View", defaultChecked: hasPoolViewVal },
    { name: "hasGardenView", label: "Garden View", defaultChecked: hasGardenViewVal },
    { name: "hasMountainView", label: "Mountain View", defaultChecked: hasMountainViewVal },
    { name: "hasCityView", label: "City View", defaultChecked: hasCityViewVal },
  ];

  return (
    <form onSubmit={onSubmit} className="rounded-[20px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] lg:p-6">
      <h3 className="mb-4 text-[15px] font-bold text-[#183c2f]">Filter Properties</h3>
      <div className="flex flex-col gap-4">
        {/* Check-in & Check-out Dates */}
        <div className="rounded-xl border border-[#e6ece9] bg-[#f8faf9] p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#2e6f57]">
              Dates of Stay
            </span>
            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={handleClearFormDates}
                className="text-[11px] font-medium text-[#c94a4a] hover:underline"
              >
                Clear Dates
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-[#656566]">Check-in Date</span>
              <input
                type="date"
                name="from"
                value={fromDate}
                min={todayString}
                onChange={handleFromChange}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-[#656566]">Check-out Date</span>
              <input
                type="date"
                name="to"
                value={toDate}
                min={minCheckOutDate}
                onChange={(e) => setToDate(e.target.value)}
                className={inputCls}
              />
            </label>
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Location</span>
          <select name="city" defaultValue={cityVal} className={inputCls}>
            <option value="">Any Location</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Property Type</span>
          <select name="propertyType" defaultValue={propertyTypeVal} className={inputCls}>
            <option value="">All</option>
            <option value={PropertyType.Studio}>Studio</option>
            <option value={PropertyType.oneBedroom}>1 Bedroom</option>
            <option value={PropertyType.twoBedroom}>2 Bedroom</option>
          </select>
        </label>
        <div>
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Price / Night (USD)</span>
          <div className="flex items-center gap-2">
            <input type="number" name="minPrice" defaultValue={minPriceVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
            <span className="shrink-0 text-[#bbb]">-</span>
            <input type="number" name="maxPrice" defaultValue={maxPriceVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">No Adults</span>
          <input type="number" name="minCapacity" defaultValue={minCapacityVal} placeholder="Any" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
        </label>
        <div className="flex flex-col gap-2.5 border-t border-[#f0f0f0] pt-4">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Amenities and Views</span>
          {checkboxes.map(({ name, label, defaultChecked }) => (
            <label key={name} className="flex cursor-pointer items-center gap-2.5 text-[14px] text-[#414847]">
              <input
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                className="size-4 rounded border-[#d0d0d0] accent-[#2e6f57]"
              />
              {label}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2e6f57] text-[15px] font-bold text-white transition hover:bg-[#255f49] active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}

function ListingHeading() {
  return (
    <section className="pt-6 lg:pt-8">
      <p className="text-[13px] font-medium leading-6 text-[#656566] lg:text-[15px]">
        Home &gt; Vacation Rentals
      </p>
      <h2 className="mt-1 text-[22px] font-semibold text-[#183c2f] lg:mt-2 lg:text-[32px]">
        Hurghada Vacation Homes & Holiday Rentals
      </h2>
    </section>
  );
}

function PropertyGrid({ paramsObj }: { paramsObj: Record<string, string> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = Number(paramsObj.page) || 1;
  const pageSize = 50;
  const { data, isLoading } = usePublicRentProperties({ ...paramsObj, pageNumber, pageSize });

  const hasDateFilter = Boolean(paramsObj.from && paramsObj.to);
  const {
    data: inHouseData,
    isLoading: inHouseLoading,
  } = useInHouseBookings(
    hasDateFilter ? { from: paramsObj.from, to: paramsObj.to } : {}
  );

  const items = data?.items;
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.pageNumber || pageNumber;

  const handleClearDates = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("from");
    newParams.delete("to");
    router.push(`/rent?${newParams.toString()}`);
  };

  // Filter items by inHouseData if date filter is active
  const filteredRawItems = useMemo(() => {
    const rawItems = items || [];
    if (!hasDateFilter) return rawItems;
    if (!inHouseData?.units) return [];

    const availableUnitIds = new Set(
      inHouseData.units
        .filter((u) => u.status?.toLowerCase() === "available")
        .map((u) => u.unitId.toLowerCase())
    );
    const availableUnitNumbers = new Set(
      inHouseData.units
        .filter((u) => u.status?.toLowerCase() === "available")
        .map((u) => (u.unitNumber || "").toLowerCase())
        .filter(Boolean)
    );

    const unavailableUnitIds = new Set(
      inHouseData.units
        .filter((u) => u.status?.toLowerCase() !== "available")
        .map((u) => u.unitId.toLowerCase())
    );
    const unavailableUnitNumbers = new Set(
      inHouseData.units
        .filter((u) => u.status?.toLowerCase() !== "available")
        .map((u) => (u.unitNumber || "").toLowerCase())
        .filter(Boolean)
    );

    return rawItems.filter((item) => {
      const idLower = item.id.toLowerCase();
      const propNumLower = (item.propertyNumber || "").toLowerCase();

      // Rule: If unit has InHouse or Booked or anything other than Available, do not show it
      if (
        unavailableUnitIds.has(idLower) ||
        (propNumLower && unavailableUnitNumbers.has(propNumLower))
      ) {
        return false;
      }

      // Unit must be explicitly marked Available
      const isAvailable =
        availableUnitIds.has(idLower) ||
        (propNumLower && availableUnitNumbers.has(propNumLower));

      return isAvailable;
    });
  }, [hasDateFilter, inHouseData, items]);

  // Sort properties so featured properties appear first
  const sortedRawItems = useMemo(() => {
    return [...filteredRawItems].sort((a, b) => {
      const aFeatured = a.isFeatured ? 1 : 0;
      const bFeatured = b.isFeatured ? 1 : 0;
      return bFeatured - aFeatured;
    });
  }, [filteredRawItems]);

  const properties: NormalizedPropertyCard[] = sortedRawItems.map((item) => {
    const rentItem = item as RentGridItem;
    const url = hasDateFilter
      ? `/rent/${slugify(rentItem.name)}?checkIn=${encodeURIComponent(paramsObj.from)}&checkOut=${encodeURIComponent(paramsObj.to)}`
      : `/rent/${slugify(rentItem.name)}`;

    return {
      id: rentItem.id,
      title: rentItem.name,
      location: rentItem.city || rentItem.areaName || "Location not specified",
      beds: `${rentItem.bedroomNo} Bedroom`,
      baths: `${rentItem.bathroomNo} Bathroom`,
      size: `${rentItem.size || rentItem.capacity || 0} sqm`,
      price: rentItem.basePrice,
      image: rentItem.coverImageUrl ? `${API_BASE_URL}/${rentItem.coverImageUrl}` : "/rent/property-card.png",
      url,
      isFeatured: Boolean(rentItem.isFeatured),
    };
  });

  const isGridLoading = isLoading || (hasDateFilter && inHouseLoading);

  return (
    <>
      <section id="properties" className="w-full">
        {/* Active Dates Filter Banner */}
        {hasDateFilter && !isGridLoading && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#2e6f57]/20 bg-[#2e6f57]/5 px-4 py-3 text-[14px] text-[#183c2f]">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2e6f57]">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>
                Showing available vacation homes for <strong>{paramsObj.from}</strong> to <strong>{paramsObj.to}</strong> ({properties.length} available)
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearDates}
              className="text-[13px] font-semibold text-[#2e6f57] underline hover:text-[#183c2f]"
            >
              Clear dates
            </button>
          </div>
        )}

        {isGridLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e6f57] border-t-transparent" />
            {hasDateFilter && inHouseLoading && (
              <p className="text-[14px] text-[#656566]">
                Checking availability for {paramsObj.from} to {paramsObj.to}...
              </p>
            )}
          </div>
        ) : (
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {properties.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-[18px] font-semibold text-[#183c2f]">No vacation rentals available</p>
                <p className="mt-2 text-[14px] text-[#656566]">
                  {hasDateFilter
                    ? `None of our vacation homes are available from ${paramsObj.from} to ${paramsObj.to}. Try selecting different dates or clear your date filter.`
                    : "No vacation rentals found matching your criteria. Try adjusting your filters."}
                </p>
                {hasDateFilter && (
                  <button
                    type="button"
                    onClick={handleClearDates}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#245b46]"
                  >
                    View All Available Homes
                  </button>
                )}
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </motion.div>
        )}
      </section>
      {!isGridLoading && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} paramsObj={paramsObj} />
      )}
    </>
  );
}

function PropertyCard({ property }: { property: NormalizedPropertyCard }) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)]"
    >
      <Link href={property.url} className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-[#f5f7f6]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {property.isFeatured ? (
          <span className="absolute left-3 top-3 flex h-7 items-center gap-1 rounded-full border border-[#d59e52]/40 bg-[#d59e52] px-3 text-[12px] font-semibold text-white shadow-md backdrop-blur-sm">
            ★ Featured
          </span>
        ) : (
          <span className="absolute left-3 top-3 flex h-7 items-center rounded-full border border-white/20 bg-black/40 px-3 text-[12px] font-medium text-white backdrop-blur-sm">
            Holiday Rental
          </span>
        )}
        <span className="absolute bottom-3 left-3 flex h-9 items-center gap-1.5 rounded-lg bg-[#cfb072] px-3 text-white shadow-lg">
          <span className="text-[14px] font-bold lg:text-[17px]">{formatUsd(property.price)}<span className="text-[11px] font-normal">/night</span></span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="border-b border-[#f0f0f0] pb-3">
          <Link href={property.url} className="hover:underline">
            <h3 className="line-clamp-1 text-[15px] font-bold text-[#183c2f] lg:text-[17px]">{property.title}</h3>
          </Link>
          <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#656566] lg:text-[13px]">
            <Image src="/homepage/properties/icons/location.svg" alt="" width={13} height={13} className="shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px] text-[#656566] lg:text-[13px]">
          <PropertyMeta icon="/homepage/properties/icons/bed.svg" label={property.beds} />
          <PropertyMeta icon="/homepage/properties/icons/bath.svg" label={property.baths} />
          <PropertyMeta icon="/homepage/properties/icons/size.svg" label={property.size} />
        </div>
        <Link
          href={property.url}
          className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-[#2e6f57] text-[13px] font-semibold text-white transition hover:bg-[#255f49] lg:h-11 lg:text-[14px]"
        >
          Book Now
        </Link>
      </div>
    </motion.article>
  );
}

function PropertyMeta({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap">
      <Image src={icon} alt="" width={13} height={13} className="shrink-0" />
      <span>{label}</span>
    </span>
  );
}

function Pagination({ currentPage, totalPages, paramsObj }: { currentPage: number; totalPages: number; paramsObj: Record<string, string> }) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newParams = new URLSearchParams(paramsObj);
    newParams.set("page", page.toString());
    router.push(`/rent?${newParams.toString()}`);
  };

  const generatePages = (): Array<number | "..."> => {
    const pages: Array<number | "..."> = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return pages.filter((val, idx, arr) => val !== "..." || arr[idx - 1] !== "...");
  };

  return (
    <nav className="mt-10 flex justify-center pb-4" aria-label="Properties pagination">
      <div className="flex items-center gap-2">
        <PageArrow src="/rent/icons/page-prev.svg" disabled={currentPage <= 1} label="Previous page" onClick={() => handlePageChange(currentPage - 1)} />
        {generatePages().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-[16px] text-[#667c74]">...</span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page as number)}
              className={`grid size-10 place-items-center rounded-full border text-[14px] font-semibold transition hover:border-[#2e6f57] hover:bg-[#2e6f57] hover:text-white ${
                page === currentPage
                  ? "border-[#2e6f57] bg-[#2e6f57] text-white"
                  : "border-[#e6e6e6] bg-white text-[#414847]"
              }`}
            >
              {page}
            </button>
          )
        )}
        <PageArrow src="/rent/icons/page-next.svg" disabled={currentPage >= totalPages} label="Next page" onClick={() => handlePageChange(currentPage + 1)} />
      </div>
    </nav>
  );
}

function PageArrow({ src, label, disabled = false, onClick }: { src: string; label: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-10 place-items-center rounded-full border border-[#e6e6e6] bg-white transition hover:bg-gray-50 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <Image src={src} alt="" width={7.4} height={12} className="h-3 w-auto" />
    </button>
  );
}

function RentCta() {
  return (
    <section
      data-rent-cta
      className="mt-10 min-h-[220px] bg-[#1f4d3d] lg:mt-16 lg:min-h-[361px]"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[52%] opacity-75 sm:w-[46%] lg:w-[44%] lg:opacity-95">
          <Image src="/homepage/vacation/coastal-vacation-home.jpeg" alt="" fill sizes="(min-width: 1024px) 44vw, 52vw" className="object-cover object-center" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#1f4d3d] via-[#1f4d3d]/95 to-[#1f4d3d]/25" />
        <div className="relative z-10 flex min-h-[220px] max-w-[720px] flex-col justify-center px-5 py-8 sm:px-8 lg:min-h-[361px] lg:px-20 lg:py-14">
          <h2 className="max-w-[520px] text-[26px] font-semibold leading-[1.2] text-white sm:text-[34px] lg:max-w-none lg:text-[40px]">
            Ready to Find Your Next Vacation Rental Home?
          </h2>
          <p className="mt-4 max-w-[620px] text-[14px] font-medium leading-[1.6] text-white sm:text-[16px] lg:text-[20px]">
            Browse verified vacation homes in Hurghada&apos;s top coastal spots and discover a relaxing stay that fits your holiday plans.
          </p>
          <div className="mt-4 h-[5px] w-[120px] rounded bg-[#cfb072] lg:h-[7px] lg:w-[170px]" />
          <Link
            href="#properties"
            className="mt-6 inline-flex h-12 min-w-[190px] items-center justify-center rounded-full bg-white px-7 text-[16px] font-medium text-[#2e6f57] transition hover:bg-[#f8f5f0] lg:h-14 lg:min-w-[251px] lg:text-[20px]"
          >
            Explore Rentals
          </Link>
        </div>
      </div>
    </section>
  );
}
