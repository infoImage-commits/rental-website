"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCategories } from "@/lib/hooks/useCategory";
import { API_BASE_URL } from "@/lib/api/config";
import { CategoryItem } from "@/lib/types/category";

export default function BestLocationsSection() {
  const { data: rawLocations = [], isLoading } = useCategories();
  const locations = rawLocations.slice(0, 4);

  return (
    <section className="bg-[#1f4d3d] px-5 py-14 font-[var(--font-poppins)] sm:px-8 sm:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[730px] flex-col items-center gap-4 text-center"
        >
          <p className="text-[14px] font-medium uppercase tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
            Best Locations
          </p>
          <h2 className="text-[26px] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[32px] lg:text-[36px]">
            Best Places to Rent
          </h2>
          <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
        </motion.div>

        <div className="mt-10 flex justify-center sm:justify-end lg:mt-12">
          <button
            type="button"
            className="h-10 rounded-full border border-[#737373]/70 bg-white px-10 text-[16px] text-[#737373]/70 transition hover:border-white hover:text-[#1f4d3d]"
          >
            View More
          </button>
        </div>

        <div className="mt-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-10 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden min-h-[367px]">
          {isLoading ? (
            <div className="flex h-[367px] w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex w-max gap-5 lg:grid lg:w-full lg:grid-cols-4"
            >
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location }: { location: CategoryItem }) {
  const imageUrl = location.imageUrl ? `${API_BASE_URL}/${location.imageUrl}` : "/homepage/locations/el-gouna.png";
  const rentHref = `/rent?CategoryId=${encodeURIComponent(location.id)}&LocationName=${encodeURIComponent(location.name)}`;

  return (
    <motion.article 
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    >
      <Link 
        href={rentHref}
        className="group relative flex aspect-[305/367] w-[min(305px,calc(100vw-72px))] shrink-0 overflow-hidden rounded-3xl bg-transparent sm:w-[305px] lg:w-full"
      >
        <Image
          src={imageUrl}
          alt={`${location.name} rental location`}
          fill
          sizes="(min-width: 1024px) 24vw, 305px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute inset-x-0 top-6 text-center z-10">
          <h3 className="text-[24px] font-medium leading-normal tracking-[-0.02em] text-white transition-transform duration-500 group-hover:-translate-y-1">{location.name}</h3>
          <p className="mt-1 text-[16px] font-medium leading-[1.5] tracking-[-0.02em] text-white/90 transition-transform duration-500 group-hover:-translate-y-1">
            {location.propertiesCount} {location.propertiesCount === 1 ? 'Property' : 'Properties'}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
