"use client";

import { motion } from "framer-motion";

interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const facilities: FacilityItem[] = [
  {
    id: "wifi",
    title: "Free High-Speed Wi-Fi",
    subtitle: "Fast coverage in all rooms",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 8.5C7.5 3 16.5 3 22 8.5" />
        <path d="M5 12C9 8 15 8 19 12" />
        <path d="M8.5 15.5C10.5 13.5 13.5 13.5 15.5 15.5" />
        <circle cx="12" cy="19.25" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "security",
    title: "24/7 Security & Support",
    subtitle: "Round-the-clock peace of mind",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L4 5.5v6.2c0 5.4 3.4 10.4 8 11.8 4.6-1.4 8-6.4 8-11.8V5.5L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "ac",
    title: "Air Conditioning",
    subtitle: "Climate control in every unit",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="9" rx="2" />
        <line x1="2" y1="9.5" x2="22" y2="9.5" />
        <line x1="16.5" y1="6.5" x2="19" y2="6.5" />
        <path d="M6 16.5c.8.8 1.6.8 2.4 0s1.6-.8 2.4 0" />
        <path d="M11 18.5c.8.8 1.6.8 2.4 0s1.6-.8 2.4 0" />
        <path d="M16 16.5c.8.8 1.6.8 2.4 0s1.6-.8 2.4 0" />
      </svg>
    ),
  },
  {
    id: "beach",
    title: "Private Beach Access",
    subtitle: "Direct Red Sea coastline",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="19" cy="5" r="2.5" />
        <path d="M4 11a8 8 0 0 1 16 0H4z" />
        <path d="M12 3v8" />
        <path d="M12 11v7a2 2 0 0 0 2 2" />
        <path d="M2 20.5c2 1 4 1 6 0s4-1 6 0 4 1 6 0" />
      </svg>
    ),
  },
  {
    id: "pool",
    title: "Swimming Pool",
    subtitle: "Crystal clean resort pools",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 3v10" />
        <path d="M11 3v10" />
        <line x1="7" y1="6.5" x2="11" y2="6.5" />
        <line x1="7" y1="10" x2="11" y2="10" />
        <path d="M5 5a2 2 0 0 1 2-2" />
        <path d="M9 5a2 2 0 0 1 2-2" />
        <path d="M2 17c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 4.5 1 5 0" />
        <path d="M2 21c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 4.5 1 5 0" />
      </svg>
    ),
  },
  {
    id: "parking",
    title: "Free On-Site Parking",
    subtitle: "Dedicated vehicle parking",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M9 17V7h4.5a3 3 0 0 1 0 6H9" />
      </svg>
    ),
  },
  {
    id: "shuttle",
    title: "Airport Shuttle Available",
    subtitle: "Private airport transfers",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 14V8a2 2 0 0 1 2-2h11l4 4v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <circle cx="7.5" cy="16.5" r="2" />
        <circle cx="16.5" cy="16.5" r="2" />
        <path d="M13 6v5h6" />
        <line x1="3" y1="11" x2="13" y2="11" />
        <path d="M8 3.5l1.8 1.8L8 7.1" />
      </svg>
    ),
  },
  {
    id: "kitchen",
    title: "Fully Equipped Kitchen",
    subtitle: "Cookware, fridge & stove",
    icon: ({ className = "size-6" }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 3v6a2 2 0 0 0 2 2v10" />
        <path d="M3 3v4" />
        <path d="M7 3v4" />
        <path d="M17 3v18M17 3a4 4 0 0 1 4 4v4a2 2 0 0 1-2 2h-2" />
      </svg>
    ),
  },
];

export default function FacilitiesSection() {
  return (
    <section className="relative z-20 bg-white px-5 py-12 font-[var(--font-poppins)] sm:px-8 sm:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-[#d59e52] sm:text-[14px]">
            Every Stay Includes
          </p>
          <h2 className="mt-2 text-[26px] font-bold leading-tight text-[#183c2f] sm:text-[32px] lg:text-[38px]">
            Standard Facilities &amp; Amenities
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#cfb072]" />
          <p className="mt-3 text-[14px] leading-relaxed text-[#667c74] sm:text-[15px]">
            All our vacation homes and holiday apartments are furnished with top-tier comforts so you can unwind and enjoy Hurghada worry-free.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 lg:gap-6"
        >
          {facilities.map((facility) => {
            const IconComponent = facility.icon;

            return (
              <motion.div
                key={facility.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative flex items-start gap-4 rounded-2xl border border-[#e6ece9] bg-[#fbfdfc] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#cfb072]/60 hover:bg-white hover:shadow-md"
              >
                {/* Icon Badge */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eff8f3] text-[#2e6f57] border border-[#2e6f57]/15 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2e6f57] group-hover:text-white group-hover:border-[#2e6f57]">
                  <IconComponent className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-bold text-[#183c2f] transition-colors duration-200 group-hover:text-[#2e6f57]">
                    {facility.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-snug text-[#667c74]">
                    {facility.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
