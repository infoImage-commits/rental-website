"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePropertyTypes } from "@/lib/hooks/useProperties";
import { PropertyType } from "@/lib/types/property";
import { buildRentPropertyTypeHref, HOUSE_RENT_PROPERTY_TYPES } from "@/lib/utils/propertyUtils";

const baseCategories = [
  {
    name: "Apartments",
    apiName: "Apartment", // Maps to backend 'Apartment'
    href: buildRentPropertyTypeHref(PropertyType.Apartment),
    image: "/homepage/Categories/Apartments.jpg",
    position: "object-center",
  },
  {
    name: "Houses",
    apiName: ["TwinHouse", "TownHouse", "Duplex", "Chalet"], // Maps to sum of these
    href: buildRentPropertyTypeHref(HOUSE_RENT_PROPERTY_TYPES),
    image: "/homepage/Categories/Houses.png",
    position: "object-center",
  },
  {
    name: "Villas",
    apiName: "Villa", // Maps to backend 'Villa'
    href: buildRentPropertyTypeHref(PropertyType.Villa),
    image: "/homepage/Categories/Villas.jpg",
    position: "object-center",
  },
  {
    name: "Studio",
    apiName: "Studio", // Maps to backend 'Studio'
    href: buildRentPropertyTypeHref(PropertyType.Studio),
    image: "/homepage/Categories/Studio.png",
    position: "object-center",
  },
];

export default function CategoriesSection() {
  const { data: propertyTypes } = usePropertyTypes();

  const getListingsCount = (apiName: string | string[]) => {
    if (!propertyTypes) return 0;
    
    if (Array.isArray(apiName)) {
      return apiName.reduce((sum, name) => {
        const match = propertyTypes.find((pt) => pt.name === name);
        return sum + (match ? match.count : 0);
      }, 0);
    }
    
    const match = propertyTypes.find((pt) => pt.name === apiName);
    return match ? match.count : 0;
  };

  const categories = baseCategories.map(cat => ({
    ...cat,
    listings: `${getListingsCount(cat.apiName)} Listings`
  }));

  return (
    <section className="relative z-20 -mt-[38px] overflow-hidden bg-transparent px-0 pb-14 font-[var(--font-poppins)] sm:-mt-12 sm:pb-16 xl:-mt-[152px] xl:pb-20">
      <div className="relative mx-auto w-full max-w-[1440px] px-0 pb-14 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-[60px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <path
            fill="#ffffff"
            d="M0 170H74C105 170 116 143 123 119L145 39C152 15 174 0 199 0H1241C1266 0 1288 15 1295 39L1317 119C1324 143 1335 170 1366 170H1440V900H0V170Z"
          />
        </svg>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-6xl text-center"
        >
          <p className="text-[14px] font-medium uppercase leading-[1.5] tracking-[0.36em] text-[#d59e52] sm:text-[16px] lg:text-[18px]">
            Featured Listings
          </p>
          <h2 className="mt-[22px] px-6 text-[25px] font-medium leading-[1.25] text-[#2e6f57] sm:text-[32px] lg:mt-[21px] lg:text-[36px] lg:leading-[1.5]">
            Explore Rental Categories
          </h2>
          <div className="mx-auto mt-[13px] h-[7px] w-[170px] rounded-[3px] bg-[#cfb072] lg:mt-[21px]" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="relative z-10 mx-auto mt-[47px] flex w-full max-w-[1440px] snap-x snap-mandatory gap-[15px] overflow-x-auto px-[13px] pb-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-16 sm:gap-[35px] sm:px-16 lg:mt-[78px] lg:grid lg:max-w-[1280px] lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-20 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              className="w-[min(340px,calc(100vw-69px))] shrink-0 snap-center aspect-[340/486] lg:w-full lg:aspect-[305/434] lg:snap-align-none"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  className,
}: {
  category: { name: string; listings: string; image: string; position: string; href: string };
  className: string;
}) {
  return (
    <motion.article 
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className={`group relative shrink-0 overflow-hidden rounded-2xl bg-[#f6f5f5] transition focus-within:ring-4 focus-within:ring-[#cfb072]/40 ${className}`}
    >
      <Link
        href={category.href}
        aria-label={`View ${category.name} rental listings`}
        className="absolute inset-0 z-20"
      />
      <Image
        src={category.image}
        alt={`${category.name} category`}
        fill
        sizes="(min-width: 1280px) 305px, (min-width: 1024px) 22vw, 340px"
        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${category.position}`}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "linear-gradient(178.9deg, rgba(217, 217, 217, 0) 56.96%, rgba(111, 131, 124, 0.437939) 70.29%, rgba(24, 60, 47, 0.8) 99.39%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-9 text-center lg:bottom-7">
        <h3 className="text-[28px] font-medium leading-none tracking-[-0.02em] text-white transition-transform duration-500 group-hover:-translate-y-1">{category.name}</h3>
        <p className="mt-5 text-[20px] font-normal leading-none tracking-[-0.02em] text-[#cfb072] transition-transform duration-500 group-hover:-translate-y-1">
          {category.listings}
        </p>
      </div>
    </motion.article>
  );
}
