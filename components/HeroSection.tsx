"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCategories } from "@/lib/hooks/useCategory";
import { motion } from "framer-motion";

export default function HeroSection() {
  const router = useRouter();
  const listingType = "rent";
  const { data: categories } = useCategories();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchParams = new URLSearchParams();

    const city = formData.get("city") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    const from = (formData.get("from") as string)?.trim();
    const to = (formData.get("to") as string)?.trim();

    if (city) searchParams.append("city", city);
    
    if (minPrice) searchParams.append("MinPrice", minPrice);
    if (maxPrice) searchParams.append("MaxPrice", maxPrice);
    
    if (from && to) {
      searchParams.append("from", from);
      searchParams.append("to", to);
    } else if (from && !to) {
      const d = new Date(from);
      d.setDate(d.getDate() + 1);
      searchParams.append("from", from);
      searchParams.append("to", d.toISOString().split("T")[0]);
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
              src="/homepage/vacation/resort-pool-day.jpeg"
              alt="Hurghada vacation resort pool with holiday apartments"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
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
            From Home To <span className="text-[#CFB072]">Home</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto mt-4 max-w-[342px] text-[12px] font-medium leading-[1.4] text-white sm:mt-6 sm:max-w-[720px] sm:text-[20px] lg:text-[24px]"
          >
            Handpicked vacation homes and relaxing holiday stays in Hurghada.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href={`/${listingType}`}
              className="mt-4 inline-flex h-[34px] min-w-[146px] items-center justify-center rounded-full bg-[#d9ba72] px-6 text-[12px] font-semibold text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] transition hover:bg-[#caa557] sm:mt-8 sm:h-[52px] sm:min-w-[251px] sm:text-[20px]"
            >
              Explore Vacation Homes
            </Link>
          </motion.div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="relative z-30 mx-auto -mt-[136px] w-[calc(100%-26px)] max-w-[1280px] rounded-[16px] bg-white p-4 shadow-[0_12px_30px_rgba(31,77,61,0.14)] sm:-mt-[188px] sm:rounded-[24px] sm:p-6 lg:w-[calc(100%-48px)] xl:-mt-[400px] xl:w-[calc(100%-64px)] xl:max-w-[1360px] 2xl:max-w-[1400px] xl:rounded-[28px] xl:p-7"
        >
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-[minmax(160px,1fr)_minmax(180px,1.1fr)_minmax(300px,1.5fr)_auto] xl:gap-3.5 2xl:gap-4">
            
            {/* Location (Categories) */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1.5 block text-[13px] font-medium leading-none text-[#1F4D3D] sm:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                Location
              </span>
              <select
                name="city"
                defaultValue=""
                className="h-10 w-full cursor-pointer rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#8b9a95] outline-none transition hover:border-[#cfb072] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:h-[48px] xl:text-[14px]"
              >
                <option value="">Any Location</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Price Range */}
            <label className="block min-w-0 text-[#1F4D3D]">
              <span className="mb-1.5 block text-[13px] font-medium leading-none text-[#1F4D3D] sm:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                Price / Night (USD)
              </span>
              <div className="grid grid-cols-2 items-center gap-1.5 sm:gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  min="0"
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="h-10 w-full min-w-0 rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] hover:border-[#cfb072] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:h-[48px] xl:text-[14px]"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  min="0"
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  className="h-10 w-full min-w-0 rounded-lg border border-[#e6ece9] bg-white px-3 text-[13px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] hover:border-[#cfb072] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl xl:h-[48px] xl:text-[14px]"
                />
              </div>
            </label>

            {/* Check-in & Check-out Dates */}
            <div className="min-w-0 text-[#1F4D3D] sm:col-span-2 xl:col-span-1">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <label className="block min-w-0">
                  <span className="mb-1.5 block truncate text-[13px] font-medium leading-none text-[#1F4D3D] sm:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                    Check-in Date
                  </span>
                  <input
                    type="date"
                    name="from"
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Check-in Date"
                    title="Check-in Date"
                    className="h-10 w-full min-w-0 cursor-pointer rounded-lg border border-[#e6ece9] bg-white px-2 sm:px-2.5 text-[12px] font-medium text-[#1F4D3D] outline-none transition hover:border-[#cfb072] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl sm:text-[13px] xl:h-[48px] xl:text-[13px] 2xl:text-[14px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                  />
                </label>

                <label className="block min-w-0">
                  <span className="mb-1.5 block truncate text-[13px] font-medium leading-none text-[#1F4D3D] sm:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                    Check-out Date
                  </span>
                  <input
                    type="date"
                    name="to"
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Check-out Date"
                    title="Check-out Date"
                    className="h-10 w-full min-w-0 cursor-pointer rounded-lg border border-[#e6ece9] bg-white px-2 sm:px-2.5 text-[12px] font-medium text-[#1F4D3D] outline-none transition hover:border-[#cfb072] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10 sm:rounded-xl sm:text-[13px] xl:h-[48px] xl:text-[13px] 2xl:text-[14px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#1F4D3D] px-6 text-[14px] font-semibold text-white shadow-md transition hover:bg-[#173a2e] hover:shadow-lg sm:col-span-2 sm:mt-4 sm:h-11 sm:text-[15px] xl:col-span-1 xl:mt-0 xl:h-[48px] xl:w-auto xl:px-8 xl:text-[16px]"
              aria-label="Search vacation homes"
            >
              <span>Search</span>
              <svg 
                className="size-4 shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
