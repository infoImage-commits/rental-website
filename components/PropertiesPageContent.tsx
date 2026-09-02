"use client";

import { usePublicRentProperties } from "@/lib/hooks/useProperties";
import type { PropertyListItem } from "@/lib/types/property";
import { slugify } from "@/lib/utils/slugify";
import { API_BASE_URL } from "@/lib/api/config";
import { useCategories } from "@/lib/hooks/useCategory";
import { HOUSE_RENT_PROPERTY_TYPES } from "@/lib/utils/propertyUtils";
import { formatUsd } from "@/lib/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const paramsObj = Object.fromEntries(searchParams.entries());
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
    const propertyType = formData.get("propertyType") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;

    if (city) newParams.append("CategoryId", city);
    if (propertyType) {
      if (propertyType === "house-group") {
        newParams.append("PropertyTypeGroup", "houses");
        newParams.append("PropertyTypes", HOUSE_RENT_PROPERTY_TYPES.join(","));
      } else {
        newParams.append("PropertyType", propertyType);
      }
    }
    if (minPrice) newParams.append("MinPrice", minPrice);
    if (maxPrice) newParams.append("MaxPrice", maxPrice);

    const minBeds = formData.get("minBedrooms") as string;
    const maxBeds = formData.get("maxBedrooms") as string;
    if (minBeds) newParams.append("MinBedrooms", minBeds);
    if (maxBeds) newParams.append("MaxBedrooms", maxBeds);

    const minBaths = formData.get("minBathrooms") as string;
    const maxBaths = formData.get("maxBathrooms") as string;
    if (minBaths) newParams.append("MinBathrooms", minBaths);
    if (maxBaths) newParams.append("MaxBathrooms", maxBaths);

    const minRooms = formData.get("minRooms") as string;
    const maxRooms = formData.get("maxRooms") as string;
    if (minRooms) newParams.append("MinRooms", minRooms);
    if (maxRooms) newParams.append("MaxRooms", maxRooms);

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
              <FilterForm paramsObj={paramsObj} onSubmit={handleFilterSubmit} />
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
            <FilterForm paramsObj={paramsObj} onSubmit={handleFilterSubmit} />
          </aside>
          {/* Property grid */}
          <div className="min-w-0 flex-1">
            <PropertyGrid paramsObj={paramsObj} />
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
        className="pointer-events-none absolute bottom-0 right-[-10%] z-0 h-[90%] w-[50%] opacity-40 lg:right-[-10%] lg:h-[110%] lg:w-[40%] lg:opacity-100 xl:right-[-5%]"
      >
        <Image
          src="/rent/hero-house.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 50vw"
          className="scale-x-[-1] object-contain object-right-bottom"
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
            Find a Place That Feels Like Home
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-[12px] leading-[1.6] text-white/90 sm:text-sm lg:mt-4 lg:text-[16px]"
          >
            Discover apartments, villas, and homes for rent across Egypt. Find a property that fits your lifestyle, budget, and plans all in one place.
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
  const isHouseGroupVal =
    paramsObj.PropertyTypeGroup === "houses" ||
    paramsObj.PropertyTypes === HOUSE_RENT_PROPERTY_TYPES.join(",");
  const propertyTypeVal = isHouseGroupVal ? "house-group" : paramsObj.PropertyType || "";
  const minPriceVal = paramsObj.MinPrice || "";
  const maxPriceVal = paramsObj.MaxPrice || "";
  const minBedsVal = paramsObj.MinBedrooms || "";
  const maxBedsVal = paramsObj.MaxBedrooms || "";
  const minBathsVal = paramsObj.MinBathrooms || "";
  const maxBathsVal = paramsObj.MaxBathrooms || "";
  const minRoomsVal = paramsObj.MinRooms || "";
  const maxRoomsVal = paramsObj.MaxRooms || "";
  const minCapacityVal = paramsObj.MinCapacity || "";
  const isAvailableVal = paramsObj.IsAvailable === "true";
  const hasSeaViewVal = paramsObj.HasSeaView === "true";
  const hasPoolViewVal = paramsObj.HasPoolView === "true";
  const hasGardenViewVal = paramsObj.HasGardenView === "true";
  const hasMountainViewVal = paramsObj.HasMountainView === "true";
  const hasCityViewVal = paramsObj.HasCityView === "true";

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
            <option value="">Any Type</option>
            <option value="house-group">House Types</option>
            <option value="1">Apartment</option>
            <option value="2">Villa</option>
            <option value="3">Studio</option>
            <option value="4">Chalet</option>
            <option value="5">TwinHouse</option>
            <option value="6">TownHouse</option>
            <option value="7">Duplex</option>
            <option value="8">Penthouse</option>
            <option value="9">Cabin</option>
            <option value="10">Hotel</option>
          </select>
        </label>
        <div>
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Price Range (USD)</span>
          <div className="flex items-center gap-2">
            <input type="number" name="minPrice" defaultValue={minPriceVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
            <span className="shrink-0 text-[#bbb]">-</span>
            <input type="number" name="maxPrice" defaultValue={maxPriceVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Bedrooms</span>
          <div className="flex items-center gap-2">
            <input type="number" name="minBedrooms" defaultValue={minBedsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
            <span className="shrink-0 text-[#bbb]">-</span>
            <input type="number" name="maxBedrooms" defaultValue={maxBedsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Bathrooms</span>
          <div className="flex items-center gap-2">
            <input type="number" name="minBathrooms" defaultValue={minBathsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
            <span className="shrink-0 text-[#bbb]">-</span>
            <input type="number" name="maxBathrooms" defaultValue={maxBathsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Rooms</span>
          <div className="flex items-center gap-2">
            <input type="number" name="minRooms" defaultValue={minRoomsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
            <span className="shrink-0 text-[#bbb]">-</span>
            <input type="number" name="maxRooms" defaultValue={maxRoomsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className={inputCls} />
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-[#656566]">Min Capacity</span>
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
        Home &gt; Properties List
      </p>
      <h2 className="mt-1 text-[22px] font-semibold text-[#183c2f] lg:mt-2 lg:text-[32px]">
        Properties List
      </h2>
    </section>
  );
}

function PropertyGrid({ paramsObj }: { paramsObj: Record<string, string> }) {
  const pageNumber = Number(paramsObj.page) || 1;
  const pageSize = 50;
  const { data, isLoading } = usePublicRentProperties({ ...paramsObj, pageNumber, pageSize });

  const rawItems = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.pageNumber || pageNumber;

  const properties: NormalizedPropertyCard[] = rawItems.map((item) => {
    const rentItem = item as RentGridItem;
    return {
      id: rentItem.id,
      title: rentItem.name,
      location: rentItem.city || rentItem.areaName || "Location not specified",
      beds: `${rentItem.bedroomNo} Bedroom`,
      baths: `${rentItem.bathroomNo} Bathroom`,
      size: `${rentItem.size || rentItem.capacity || 0} sqm`,
      price: rentItem.basePrice,
      image: rentItem.coverImageUrl ? `${API_BASE_URL}/${rentItem.coverImageUrl}` : "/rent/property-card.png",
      url: `/rent/${slugify(rentItem.name)}`,
    };
  });

  return (
    <>
      <section id="properties" className="w-full">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e6f57] border-t-transparent" />
          </div>
        ) : (
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {properties.length === 0 ? (
              <div className="col-span-full py-20 text-center text-[16px] text-[#656566]">
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </motion.div>
        )}
      </section>
      {!isLoading && totalPages > 1 && (
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
        <span className="absolute left-3 top-3 flex h-7 items-center rounded-full border border-white/20 bg-black/40 px-3 text-[12px] font-medium text-white backdrop-blur-sm">
          For Rent
        </span>
        <span className="absolute bottom-3 left-3 flex h-9 items-center gap-1.5 rounded-lg bg-[#cfb072] px-3 text-white shadow-lg">
          <span className="text-[14px] font-bold lg:text-[17px]">{formatUsd(property.price)}<span className="text-[11px] font-normal">/Mo</span></span>
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
          View Details
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
      className="mt-10 h-[161px] bg-gradient-to-r from-[#1f4d3d] from-[62%] to-[#193b2f] lg:mt-16 lg:h-[361px]"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="rent-cta-mask pointer-events-none absolute right-[-3px] top-[-13.8px] z-0 size-[152px] lg:right-[-48px] lg:top-[-38px] lg:size-[419px]">
          <Image src="/rent/cta-house.png" alt="" fill sizes="(min-width: 1024px) 419px, 152px" className="scale-x-[-1] object-cover" />
        </div>
        <div className="pointer-events-none absolute right-[88px] top-0 z-[1] h-full w-[105px] bg-gradient-to-r from-[#1f4d3d] via-[#1f4d3d]/90 to-transparent lg:right-[274px] lg:w-[345px]" />
        <div className="absolute left-[17px] top-[23px] z-10 max-w-[206px] lg:left-20 lg:top-16 lg:max-w-[730px]">
          <h2 className="max-w-[188px] text-[14px] font-semibold leading-[1.6] text-white lg:max-w-none lg:text-[40px] lg:font-normal">
            Ready to Find Your Next Rental Home?
          </h2>
          <p className="mt-[5.8px] text-[8px] leading-[1.6] text-white lg:mt-4 lg:text-[20px]">
            Browse verified rental properties in prime locations and discover a place that perfectly fits your lifestyle and budget.
          </p>
          <div className="mt-[5.8px] h-[2.5px] w-[62px] rounded bg-[#cfb072] lg:mt-4 lg:h-[7px] lg:w-[170px]" />
          <Link
            href="#properties"
            className="mt-[8.7px] inline-flex h-5 w-[91px] items-center justify-center rounded-full bg-white text-[6px] font-medium text-[#2e6f57] transition hover:bg-[#f8f5f0] lg:mt-6 lg:h-14 lg:w-[251px] lg:text-[20px]"
          >
            Explore Rentals
          </Link>
        </div>
      </div>
    </section>
  );
}
