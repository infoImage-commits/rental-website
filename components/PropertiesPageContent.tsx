"use client";

import { usePublicRentProperties } from "@/lib/hooks/useProperties";
import { usePublicBuyProperties } from "@/lib/hooks/usePropertyBuying";
import type { PropertyListItem } from "@/lib/types/property";
import type { PropertyBuyingListItem } from "@/lib/types/propertyBuying";
import { slugify } from "@/lib/utils/slugify";
import { API_BASE_URL } from "@/lib/api/config";
import { useCategories } from "@/lib/hooks/useCategory";
import { HOUSE_RENT_PROPERTY_TYPES } from "@/lib/utils/propertyUtils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";

type RentGridItem = PropertyListItem & {
  size?: number | null;
  areaName?: string | null;
};

type BuyGridItem = PropertyBuyingListItem & {
  city?: string | null;
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
  tag: string;
  priceSuffix: string;
};

export default function PropertiesPageContent({ type }: { type: 'rent' | 'buy' }) {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading properties...</div>}>
      <PropertiesPageInner type={type} />
    </Suspense>
  );
}

function PropertiesPageInner({ type }: { type: 'rent' | 'buy' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newParams = new URLSearchParams();

    // Common fields
    const city = formData.get("city") as string;
    const propertyType = formData.get("propertyType") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;

    if (city) newParams.append(type === "rent" ? "CategoryId" : "city", city);
    if (propertyType) {
      if (type === "rent" && propertyType === "house-group") {
        newParams.append("PropertyTypeGroup", "houses");
        newParams.append("PropertyTypes", HOUSE_RENT_PROPERTY_TYPES.join(","));
      } else {
        newParams.append(type === "rent" ? "PropertyType" : "propertyType", propertyType);
      }
    }
    if (minPrice) newParams.append(type === "rent" ? "MinPrice" : "minPrice", minPrice);
    if (maxPrice) newParams.append(type === "rent" ? "MaxPrice" : "maxPrice", maxPrice);

    if (type === "rent") {
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
    } else {
      const search = formData.get("search") as string;
      if (search) newParams.append("search", search);

      const bedrooms = formData.get("bedrooms") as string;
      if (bedrooms) newParams.append("bedrooms", bedrooms);

      const bathrooms = formData.get("bathrooms") as string;
      if (bathrooms) newParams.append("bathrooms", bathrooms);
    }

    router.push(`/${type}?${newParams.toString()}`);
  };

  return (
    <main className="overflow-hidden bg-[#fafafa] font-[var(--font-poppins)] text-[#183c2f]">
      <PropertiesHero type={type} />
      
      <div className="mx-auto max-w-[1280px] px-5 lg:px-20 pb-20">
        <ListingHeading />
        
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <aside className="w-full lg:sticky lg:top-8 lg:w-[280px] lg:shrink-0">
            <SidebarFilter type={type} paramsObj={paramsObj} onSubmit={handleFilterSubmit} />
          </aside>
          
          <div className="min-w-0 flex-1">
            <PropertyGrid type={type} paramsObj={paramsObj} />
          </div>
        </div>
      </div>

      <RentCta />
    </main>
  );
}

function PropertiesHero({ type }: { type: 'rent' | 'buy' }) {
  return (
    <section className="relative flex w-full h-[200px] lg:h-[280px] items-center overflow-hidden bg-[#2e6f57]">
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
        className="pointer-events-none absolute bottom-0 right-[-10%] z-0 h-[90%] w-[50%] opacity-40 lg:right-[-10%] xl:right-[-5%] lg:h-[110%] lg:w-[40%] lg:opacity-100"
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

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 lg:px-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
          className="max-w-[280px] sm:max-w-xl lg:max-w-xl"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[24px] font-bold leading-[1.2] text-white sm:text-3xl lg:text-[44px]"
          >
            {type === 'rent' ? "Find a Place That Feels Like Home" : "Find Your Dream Home to Buy"}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-[12px] leading-[1.6] text-white/90 sm:text-sm lg:mt-4 lg:text-[16px]"
          >
            {type === 'rent' 
              ? "Discover apartments, villas, and homes for rent across Egypt. Find a property that fits your lifestyle, budget, and plans all in one place."
              : "Browse properties for sale across Egypt. Invest in your future and find a property that perfectly fits your lifestyle and budget."
            }
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function SidebarFilter({ type, paramsObj, onSubmit }: { type: 'rent' | 'buy'; paramsObj: Record<string, string>; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  const { data: categories } = useCategories();
  
  // Common
  const cityParam = paramsObj.city || paramsObj.City || "";
  const categoryIdParam = paramsObj.CategoryId || paramsObj.categoryId || "";
  const cityVal =
    type === "rent"
      ? categoryIdParam || categories?.find((category) => category.name === cityParam)?.id || ""
      : cityParam;
  const isHouseGroupVal =
    type === "rent" &&
    (paramsObj.PropertyTypeGroup === "houses" ||
      paramsObj.propertyTypeGroup === "houses" ||
      paramsObj.PropertyTypes === HOUSE_RENT_PROPERTY_TYPES.join(",") ||
      paramsObj.propertyTypes === HOUSE_RENT_PROPERTY_TYPES.join(","));
  const propertyTypeVal = isHouseGroupVal ? "house-group" : paramsObj.propertyType || paramsObj.PropertyType || "";
  const minPriceVal = paramsObj.minPrice || paramsObj.MinPrice || "";
  const maxPriceVal = paramsObj.maxPrice || paramsObj.MaxPrice || "";

  // Buy
  const searchVal = paramsObj.search || "";
  const bedroomsVal = paramsObj.bedrooms || "";
  const bathroomsVal = paramsObj.bathrooms || "";

  // Rent
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

  return (
    <motion.form
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={onSubmit}
      className="rounded-[24px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:p-8"
    >
      <div className="flex flex-col gap-5">
        {type === 'buy' && (
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Search by title or description</span>
            <input
              type="text"
              name="search"
              defaultValue={searchVal}
              placeholder="e.g. modern villa with pool"
              className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Location</span>
          <select
            name="city"
            defaultValue={cityVal}
            className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
          >
            <option value="">Any Location</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={type === "rent" ? cat.id : cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Property Type</span>
          <select
            name="propertyType"
            defaultValue={propertyTypeVal}
            className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
          >
            <option value="">Any Type</option>
            {type === "rent" && <option value="house-group">House Types</option>}
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

        <div className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Price Range (EGP)</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              defaultValue={minPriceVal}
              placeholder="Min"
              min="0"
              onWheel={(e) => (e.target as HTMLElement).blur()}
              className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
            />
            <span className="text-[#8d8d8d]">-</span>
            <input
              type="number"
              name="maxPrice"
              defaultValue={maxPriceVal}
              placeholder="Max"
              min="0"
              onWheel={(e) => (e.target as HTMLElement).blur()}
              className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
            />
          </div>
        </div>

        {type === 'buy' ? (
          <>
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Bedrooms</span>
              <input type="number" name="bedrooms" defaultValue={bedroomsVal} placeholder="e.g. 2" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Bathrooms</span>
              <input type="number" name="bathrooms" defaultValue={bathroomsVal} placeholder="e.g. 2" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
            </label>
          </>
        ) : (
          <>
            <div className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Bedrooms (Min - Max)</span>
              <div className="flex items-center gap-2">
                <input type="number" name="minBedrooms" defaultValue={minBedsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
                <span className="text-[#8d8d8d]">-</span>
                <input type="number" name="maxBedrooms" defaultValue={maxBedsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
              </div>
            </div>
            <div className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Bathrooms (Min - Max)</span>
              <div className="flex items-center gap-2">
                <input type="number" name="minBathrooms" defaultValue={minBathsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
                <span className="text-[#8d8d8d]">-</span>
                <input type="number" name="maxBathrooms" defaultValue={maxBathsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
              </div>
            </div>
            <div className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Rooms (Min - Max)</span>
              <div className="flex items-center gap-2">
                <input type="number" name="minRooms" defaultValue={minRoomsVal} placeholder="Min" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
                <span className="text-[#8d8d8d]">-</span>
                <input type="number" name="maxRooms" defaultValue={maxRoomsVal} placeholder="Max" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
              </div>
            </div>
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#183c2f]">Min Capacity</span>
              <input type="number" name="minCapacity" defaultValue={minCapacityVal} placeholder="Any" min="0" onWheel={(e) => (e.target as HTMLElement).blur()} className="h-11 w-full rounded-xl border border-[#e6e6e6] bg-white px-4 text-[14px] text-[#414847] outline-none transition focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10" />
            </label>
          </>
        )}

        <div className="mt-2 flex flex-col gap-3 border-t border-[#f0f0f0] pt-4">
          {type === 'rent' && (
            <>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="isAvailable" defaultChecked={isAvailableVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                Available Now
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="hasSeaView" defaultChecked={hasSeaViewVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                Sea View
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="hasPoolView" defaultChecked={hasPoolViewVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                Pool View
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="hasGardenView" defaultChecked={hasGardenViewVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                Garden View
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="hasMountainView" defaultChecked={hasMountainViewVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                Mountain View
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#414847]">
                <input type="checkbox" name="hasCityView" defaultChecked={hasCityViewVal} className="size-4 rounded border-[#e6e6e6] text-[#2e6f57] focus:ring-[#2e6f57]" />
                City View
              </label>
            </>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2e6f57] text-[15px] font-bold text-white transition hover:bg-[#255f49]"
        >
          Apply Filters
          <Image src="/rent/icons/search.svg" alt="" width={16} height={16} className="size-4" />
        </button>
      </div>
    </motion.form>
  );
}

function ListingHeading() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="pt-8 lg:pt-10"
    >
      <p className="text-[14px] font-medium leading-6 text-[#656566] lg:text-[16px]">
        Home &gt; Properties List
      </p>
      <h2 className="mt-1 text-[24px] font-semibold text-[#183c2f] lg:mt-2 lg:text-[32px]">
        Properties List
      </h2>
    </motion.section>
  );
}

function PropertyGrid({ type, paramsObj }: { type: 'rent' | 'buy'; paramsObj: Record<string, string> }) {
  const pageNumber = Number(paramsObj.page) || 1;
  const pageSize = 50;

  const rentQuery = usePublicRentProperties(type === 'rent' ? { ...paramsObj, pageNumber, pageSize } : {});
  const buyQuery = usePublicBuyProperties(type === 'buy' ? { ...paramsObj, pageNumber, pageSize } : {});

  const isLoading = type === 'rent' ? rentQuery.isLoading : buyQuery.isLoading;
  const data = type === 'rent' ? rentQuery.data : buyQuery.data;
  
  const rawItems = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.pageNumber || pageNumber;

  const normalizedProperties: NormalizedPropertyCard[] = rawItems.map((item) => {
    if (type === 'rent') {
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
        tag: "For Rent",
        priceSuffix: "/Month"
      };
    } else {
      const buyItem = item as BuyGridItem;
      const urlSlug = slugify(buyItem.title) || buyItem.id;
      return {
        id: buyItem.id,
        title: buyItem.title,
        location: buyItem.city || buyItem.areaName || buyItem.address?.city || "Location not specified",
        beds: `${buyItem.bedrooms} Bedroom`,
        baths: `${buyItem.bathrooms} Bathroom`,
        size: `${buyItem.area} sqm`,
        price: buyItem.price,
        image: buyItem.coverImageUrl ? `${API_BASE_URL}/${buyItem.coverImageUrl}` : "/rent/property-card.png",
        url: `/buy/${urlSlug}`,
        tag: "For Buy",
        priceSuffix: ""
      };
    }
  });

  return (
    <>
      <section id="properties" className="w-full">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e6f57] border-t-transparent"></div>
          </div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="visible"
            data-rent-grid
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {normalizedProperties.length === 0 ? (
              <div className="col-span-full py-20 text-center text-[16px] text-[#656566]">
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              normalizedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </motion.div>
        )}
      </section>
      {!isLoading && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} type={type} paramsObj={paramsObj} />
      )}
    </>
  );
}

function PropertyCard({ property, className = "" }: { property: NormalizedPropertyCard; className?: string }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      className={`flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${className}`}
    >
      <Link href={property.url} className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#f5f7f6] block">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 300px, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        <span className="absolute left-4 top-4 flex h-7 items-center justify-center rounded-full border border-white/20 bg-black/40 px-3 text-[12px] font-medium text-white backdrop-blur-sm lg:text-[14px]">
          {property.tag}
        </span>

        <span className="absolute bottom-4 left-4 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#cfb072] px-3 text-white shadow-lg">
          <span className="text-[12px] font-semibold lg:text-[14px]">EGP</span>
          <span className="text-[14px] font-bold lg:text-[18px]">{property.price}{property.priceSuffix}</span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="border-b border-[#f0f0f0] pb-3">
          <Link href={property.url} className="hover:underline">
            <h3 className="line-clamp-1 text-[16px] font-bold text-[#183c2f] lg:text-[18px]">
              {property.title}
            </h3>
          </Link>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#656566] lg:text-[14px]">
            <Image
              src="/homepage/properties/icons/location.svg"
              alt=""
              width={14}
              height={14}
              className="shrink-0"
            />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[13px] text-[#656566] lg:mt-4 lg:text-[14px]">
          <PropertyMeta icon="/homepage/properties/icons/bed.svg" label={property.beds} />
          <PropertyMeta icon="/homepage/properties/icons/bath.svg" label={property.baths} />
          <PropertyMeta icon="/homepage/properties/icons/size.svg" label={property.size} />
        </div>

        <Link
          href={property.url}
          className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-[#2e6f57] text-[14px] font-semibold text-white transition hover:bg-[#255f49] lg:text-[15px]"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

function PropertyMeta({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap">
      <Image src={icon} alt="" width={14} height={14} className="shrink-0" />
      <span>{label}</span>
    </span>
  );
}

function Pagination({ currentPage, totalPages, type, paramsObj }: { currentPage: number; totalPages: number; type: string; paramsObj: Record<string, string> }) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newParams = new URLSearchParams(paramsObj);
    newParams.set("page", page.toString());
    router.push(`/${type}?${newParams.toString()}`);
  };

  const generatePages = () => {
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

  const pages = generatePages();

  return (
    <nav className="mt-12 flex justify-center pb-8" aria-label="Properties pagination">
      <div className="flex items-center gap-2">
        <PageArrow 
          src="/rent/icons/page-prev.svg" 
          disabled={currentPage <= 1} 
          label="Previous page" 
          onClick={() => handlePageChange(currentPage - 1)} 
        />
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-[16px] text-[#667c74]">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page as number)}
              className={`grid size-10 place-items-center rounded-full border text-[14px] font-semibold transition hover:bg-[#2e6f57] hover:text-white hover:border-[#2e6f57] ${
                page === currentPage
                  ? "border-[#2e6f57] bg-[#2e6f57] text-white"
                  : "border-[#e6e6e6] bg-white text-[#414847]"
              }`}
            >
              {page}
            </button>
          ),
        )}
        <PageArrow 
          src="/rent/icons/page-next.svg" 
          disabled={currentPage >= totalPages} 
          label="Next page" 
          onClick={() => handlePageChange(currentPage + 1)} 
        />
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
      className={`grid size-10 place-items-center rounded-full border border-[#e6e6e6] bg-white transition hover:bg-gray-50 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Image src={src} alt="" width={7.4} height={12} className="h-3 w-auto" />
    </button>
  );
}

function RentCta() {
  return (
    <section
      data-rent-cta
      className="mt-10 h-[161px] bg-gradient-to-r from-[#1f4d3d] from-[62.019%] to-[#193b2f] lg:mt-16 lg:h-[361px]"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="rent-cta-mask pointer-events-none absolute right-[-3px] top-[-13.8px] z-0 size-[152.128px] lg:right-[-48px] lg:top-[-38px] lg:size-[419px]"
        >
          <Image
            src="/rent/cta-house.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 419px, 152px"
            className="scale-x-[-1] object-cover"
          />
        </div>

        <div className="pointer-events-none absolute right-[88px] top-0 z-[1] h-full w-[105px] bg-gradient-to-r from-[#1f4d3d] via-[#1f4d3d]/90 to-transparent lg:right-[274px] lg:w-[345px]" />

        <div className="absolute left-[17px] top-[23px] z-10 max-w-[206px] lg:left-20 lg:top-16 lg:max-w-[730px]">
          <h2 className="max-w-[188px] text-[14px] font-semibold leading-[1.6] text-white lg:max-w-none lg:text-[40px] lg:font-normal">
            Ready to Find Your Next Rental Home?
          </h2>
          <p className="mt-[5.8px] text-[8px] leading-[1.6] text-white lg:mt-4 lg:text-[20px]">
            Browse verified rental properties in prime locations and discover a place that perfectly fits your lifestyle
            and budget.
          </p>
          <div className="mt-[5.8px] h-[2.542px] w-[61.722px] rounded bg-[#cfb072] lg:mt-4 lg:h-[7px] lg:w-[170px]" />
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
