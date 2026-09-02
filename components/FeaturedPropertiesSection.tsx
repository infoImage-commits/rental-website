"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePublicRentProperties } from "@/lib/hooks/useProperties";
import { API_BASE_URL } from "@/lib/api/config";
import { PropertyListItem } from "@/lib/types/property";
import { slugify } from "@/lib/utils/slugify";
import { formatUsd } from "@/lib/utils/currency";

const filterTabs = [
  { id: "hot", label: "Hot Deal", icon: "/homepage/properties/icons/hot.svg" },
  { id: "recommended", label: "Recommended for you", icon: "/homepage/properties/icons/recommend.svg" },
  { id: "price", label: "Best Price", icon: "/homepage/properties/icons/price.svg" },
];

export default function FeaturedPropertiesSection() {
  const [activeTab, setActiveTab] = useState("hot");

  const { data: response, isLoading } = usePublicRentProperties({ IsFeatured: true, pageSize: 50 });
  const allProperties: PropertyListItem[] = response?.items || [];

  let properties: PropertyListItem[] = [];
  if (activeTab === "hot") {
    // Newest/default order
    properties = allProperties.slice(0, 6);
  } else if (activeTab === "recommended") {
    // Highest number of beds + baths
    properties = [...allProperties]
      .sort((a, b) => ((b.bedroomNo || 0) + (b.bathroomNo || 0)) - ((a.bedroomNo || 0) + (a.bathroomNo || 0)))
      .slice(0, 6);
  } else if (activeTab === "price") {
    // Lowest price
    properties = [...allProperties]
      .sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0))
      .slice(0, 6);
  }

  return (
    <section className="bg-[#f7f5f2] px-5 py-14 font-[var(--font-poppins)] sm:px-8 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mt-10 flex flex-col gap-6 lg:mt-14 lg:flex-row lg:items-center lg:justify-start"
        >
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
            {filterTabs.map((filter) => (
              <motion.button
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                key={filter.id}
                type="button"
                onClick={() => setActiveTab(filter.id)}
                className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border px-4 text-[12px] font-medium sm:h-10 sm:px-6 sm:text-[16px] transition ${
                  activeTab === filter.id
                    ? "border-[#2e6f57] bg-[#2e6f57] text-white"
                    : "border-[#2e6f57] bg-white text-[#2e6f57] hover:bg-[#2e6f57]/5"
                }`}
              >
                <Image src={filter.icon} alt="" width={16} height={16} className="size-3.5 sm:size-5" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-10 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden min-h-[420px]">
          {isLoading ? (
            <div className="flex h-[420px] w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2e6f57] border-t-transparent"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex h-[420px] w-full items-center justify-center text-[16px] text-[#737373]">
              No properties found matching this criteria.
            </div>
          ) : (
            <motion.div 
              key={activeTab}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex w-max gap-9 lg:grid lg:w-full lg:grid-cols-3 lg:gap-x-5 lg:gap-y-5"
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-10 flex justify-center lg:mt-14">
          <Link
            href="/rent"
            className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-full border-2 border-[#2e6f57] bg-white px-10 text-[16px] font-semibold text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white sm:h-14 sm:max-w-[400px] sm:text-[18px]"
          >
            View More Properties
          </Link>
        </div>

      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex max-w-[740px] flex-col items-center gap-4 text-center lg:gap-[21px]"
    >
      <p className="text-[14px] font-medium uppercase leading-normal tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
        Featured Properties
      </p>
      <h2 className="text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] sm:text-[28px] lg:text-[36px]">
        Featured Rental Properties
      </h2>
      <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
    </motion.div>
  );
}

function PropertyCard({ property }: { property: PropertyListItem }) {
  const imageUrl = property.coverImageUrl ? `${API_BASE_URL}/${property.coverImageUrl}` : "/rent/property-card.png";
  const location = property.city || property.country || "Location not specified";

  return (
    <motion.article 
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className="group flex h-[420px] w-[min(334px,calc(100vw-40px))] shrink-0 flex-col gap-3 overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.16)] transition hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] lg:w-full"
    >
      <div className="relative h-[220px] shrink-0 overflow-hidden rounded-t-2xl bg-[#dbe5e2]">
        <Image
          src={imageUrl}
          alt={property.name}
          fill
          sizes="(min-width: 1024px) 31vw, 334px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-5 top-4 inline-flex h-[27px] min-w-[113px] items-center justify-center rounded-full border-t border-[#d59e52] bg-white px-4 text-[16px] font-semibold text-[#d59e52]">
          For Rent
        </div>

        <div className="absolute left-0 top-[68%] inline-flex h-[37px] items-center gap-2 rounded-r-lg bg-[#d59e52] px-3 text-[16px] font-semibold text-white">
          <span>{formatUsd(property.basePrice)} /Month</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-3">
        <div className="border-b border-[#ead8bc]/50 pb-3">
          <h3 className="line-clamp-1 text-[18px] font-medium text-[#183c2f]">{property.name}</h3>
          <div className="mt-2 flex items-center gap-1 text-[14px] text-[#656566]">
            <Image src="/homepage/properties/icons/location.svg" alt="" width={16} height={16} className="size-4 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 text-[14px] text-[#656566]">
          <PropertyMeta icon="/homepage/properties/icons/bed.svg" label={`${property.bedroomNo || 0} Bed`} />
          <PropertyMeta icon="/homepage/properties/icons/bath.svg" label={`${property.bathroomNo || 0} Bath`} />
          <PropertyMeta icon="/homepage/properties/icons/size.svg" label={property.capacity ? `${property.capacity} m²` : "N/A"} />
        </div>

        <Link href={`/rent/${slugify(property.name)}`} className="mt-auto flex h-12 items-center justify-center rounded-full bg-[#2e6f57] text-[16px] font-semibold text-white transition hover:bg-[#245f49]">
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

function PropertyMeta({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap">
      <Image src={icon} alt="" width={16} height={16} className="size-4 shrink-0" />
      <span>{label}</span>
    </span>
  );
}
