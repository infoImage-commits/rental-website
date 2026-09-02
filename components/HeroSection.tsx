"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/lib/hooks/useCategory";
import { motion } from "framer-motion";

export default function HeroSection() {
  const router = useRouter();
  const [listingType, setListingType] = useState<"rent" | "buy">("rent");
  const { data: categories } = useCategories();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchParams = new URLSearchParams();

    const city = formData.get("city") as string;
    const propertyType = formData.get("propertyType") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    const bedrooms = formData.get("bedrooms") as string;

    if (city) searchParams.append("city", city);
    if (propertyType) searchParams.append("propertyType", propertyType);
    
    if (minPrice) searchParams.append(listingType === "rent" ? "MinPrice" : "minPrice", minPrice);
    if (maxPrice) searchParams.append(listingType === "rent" ? "MaxPrice" : "maxPrice", maxPrice);
    
    if (bedrooms) {
      if (listingType === "rent") {
        searchParams.append("MinBedrooms", bedrooms);
        searchParams.append("MaxBedrooms", bedrooms);
      } else {
        searchParams.append("bedrooms", bedrooms);
      }
    }

    router.push(`/${listingType}?${searchParams.toString()}`);
  };

  return (
    <section className="relative flex flex-col bg-white pb-10 font-[var(--font-poppins)] lg:pb-24 xl:pb-[190px]">
      <div className="relative w-full overflow-visible">
        <div className="relative h-[338px] w-full overflow-hidden rounded-b-[30px] sm:h-[560px] sm:rounded-b-[50px] lg:h-[898px] lg:rounded-b-[60px]">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -inset-[20px] origin-center"
          >
            <Image
              src="/homepage/heroSection1/HeroImage.png"
              alt="Modern rental home exterior"
              fill
              sizes="100vw"
              className="object-cover object-top sm:object-center lg:object-top"
              priority
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.15 }}
          className="absolute left-1/2 top-[30px] w-[calc(100%-28px)] max-w-[1120px] -translate-x-1/2 text-center sm:top-[108px] lg:top-[105px]"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto max-w-[350px] text-[25px] font-semibold leading-[1.32] text-white sm:max-w-[820px] sm:text-[44px] lg:max-w-none lg:text-[64px]"
          >
            Discover Your Next <span className="text-[#CFB072]">Home</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto mt-4 max-w-[342px] text-[12px] font-medium leading-[1.4] text-white sm:mt-6 sm:max-w-[720px] sm:text-[20px] lg:text-[24px]"
          >
            Premium homes and smart investments, all in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href={`/${listingType}`}
              className="mt-4 inline-flex h-[34px] min-w-[146px] items-center justify-center rounded-full bg-[#d9ba72] px-6 text-[12px] font-semibold text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] transition hover:bg-[#caa557] sm:mt-8 sm:h-[52px] sm:min-w-[251px] sm:text-[20px]"
            >
              Explore Properties
            </Link>
          </motion.div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="relative z-30 mx-auto -mt-[136px] w-[calc(100%-26px)] max-w-[1280px] rounded-[16px] bg-white p-4 shadow-[0_12px_30px_rgba(31,77,61,0.14)] sm:-mt-[188px] sm:rounded-[24px] sm:p-6 xl:-mt-[400px] xl:w-[calc(100%-160px)] xl:rounded-[30px] xl:px-9 xl:pb-[47px] xl:pt-8"
        >
          <div className="mb-4 flex items-center justify-center gap-[42px] text-[13px] font-medium text-[#1F4D3D] sm:mb-5 sm:gap-24 sm:text-[18px] xl:mb-8 xl:text-[24px]">
            <label className="inline-flex cursor-pointer items-center gap-2 transition hover:opacity-80">
              <input 
                type="radio" 
                name="listingType" 
                value="rent"
                checked={listingType === "rent"}
                onChange={() => setListingType("rent")}
                className="h-[7px] w-[7px] accent-[#2e6f57] sm:h-5 sm:w-5 xl:h-6 xl:w-6" 
              />
              Rent
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 transition hover:opacity-80">
              <input 
                type="radio" 
                name="listingType" 
                value="buy"
                checked={listingType === "buy"}
                onChange={() => setListingType("buy")}
                className="h-[7px] w-[7px] accent-[#2e6f57] sm:h-5 sm:w-5 xl:h-6 xl:w-6" 
              />
              Buy
            </label>
          </div>

          <div className="grid grid-cols-1 items-end gap-2 sm:grid-cols-2 sm:gap-4 xl:grid-cols-[minmax(9rem,1fr)_minmax(11rem,1fr)_minmax(12rem,1.2fr)_minmax(9rem,1fr)_minmax(11rem,1fr)] xl:gap-4">
            
            {/* Location (Categories) */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1 block text-[13px] font-medium leading-none sm:mb-2 sm:text-[15px] xl:text-[20px]">
                Location
              </span>
              <select
                name="city"
                defaultValue=""
                className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#8b9a95] outline-none transition focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:text-[14px]"
              >
                <option value="">Any Location</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Property Type */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1 block text-[13px] font-medium leading-none sm:mb-2 sm:text-[15px] xl:text-[20px]">
                Property Type
              </span>
              <select
                name="propertyType"
                defaultValue=""
                className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#8b9a95] outline-none transition focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:text-[14px]"
              >
                <option value="">Any Type</option>
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

            {/* Price Range */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1 block text-[13px] font-medium leading-none sm:mb-2 sm:text-[15px] xl:text-[20px]">
                Price Range (EGP)
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  min="0"
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:text-[14px]"
                />
                <span className="text-[12px]">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  min="0"
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:text-[14px]"
                />
              </div>
            </label>

            {/* Bedrooms */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1 block text-[13px] font-medium leading-none sm:mb-2 sm:text-[15px] xl:text-[20px]">
                Bedrooms
              </span>
              <input
                type="number"
                name="bedrooms"
                placeholder="Any"
                min="0"
                onWheel={(e) => (e.target as HTMLElement).blur()}
                className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:text-[14px]"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7b61] px-6 text-[14px] font-bold text-white transition hover:bg-[#24684f] sm:col-span-2 sm:mt-6 sm:h-12 sm:w-full sm:text-[15px] xl:col-span-1 xl:mt-0 xl:h-[52px] xl:w-full xl:text-[20px]"
              aria-label="Search properties"
            >
              Search
              <span className="relative h-3 w-3 rounded-full border border-white sm:h-4 sm:w-4 sm:border-2" aria-hidden="true">
                <span className="absolute -bottom-1 -right-1 h-[6px] w-px rotate-[-45deg] rounded-full bg-white sm:h-2 sm:w-0.5" />
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
