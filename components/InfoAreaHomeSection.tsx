"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLandmarks } from "@/lib/hooks/useAttributeGroupItem";
import type { AttributeGroupItem } from "@/lib/types/attributeGroupItem";

const INITIAL_DISPLAY_COUNT = 10;

function LandmarkRow({ item, index }: { item: AttributeGroupItem; index: number }) {
  return (
    <div className="group flex items-center justify-between gap-3.5 rounded-xl border border-[#edf2ef] bg-[#fbfcfb] px-4 py-3.5 transition-all duration-200 hover:border-[#cfb072]/60 hover:bg-[#f4f8f6] hover:shadow-xs">
      {/* Left: Index badge + Full Name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#e1e9e4] bg-white font-mono text-[11px] font-bold text-[#2e6f57] shadow-2xs group-hover:border-[#cfb072] group-hover:text-[#cfb072] transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[14px] sm:text-[15px] font-semibold text-[#183c2f] leading-snug break-words group-hover:text-[#2e6f57] transition-colors">
          {item.key}
        </span>
      </div>

      {/* Right: Distance / Detail Badge */}
      {item.value && (
        <span className="shrink-0 rounded-full border border-[#d6e4dd] bg-white px-3 py-1 text-[12px] font-semibold text-[#2e6f57] shadow-2xs group-hover:border-[#183c2f] group-hover:bg-[#183c2f] group-hover:text-white transition-all">
          {item.value}
        </span>
      )}
    </div>
  );
}

export default function InfoAreaHomeSection() {
  const { data: landmarks = [], isLoading, isError } = useLandmarks();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // If we are not loading, and there are no info areas or an error occurred, don't render the section.
  if (!isLoading && (isError || landmarks.length === 0)) {
    return null;
  }

  // Sort by displayOrder then by name
  const sortedLandmarks = [...landmarks].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || a.key.localeCompare(b.key)
  );

  const initialLandmarks = sortedLandmarks.slice(0, INITIAL_DISPLAY_COUNT);
  const extraLandmarks = sortedLandmarks.slice(INITIAL_DISPLAY_COUNT);
  const hasMore = extraLandmarks.length > 0;

  function handleToggle() {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsExpanded((prev) => !prev);
  }

  return (
    <section className="relative z-20 bg-gradient-to-b from-[#fbfcfb] via-[#f6f9f7] to-[#fbfcfb] px-5 py-12 font-[var(--font-poppins)] sm:px-8 sm:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-[#d59e52] sm:text-[14px]">
            Info Area &amp; Nearby Highlights
          </p>
          <h2 className="mt-2 text-[26px] font-bold leading-tight text-[#183c2f] sm:text-[32px] lg:text-[38px]">
            Everything You Need, Right Next Door
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#cfb072]" />
          <p className="mt-3 text-[14px] leading-relaxed text-[#667c74] sm:text-[15px]">
            Our properties are centrally located in Hurghada, placing top beaches, dining, shopping,
            and essential services just moments from your stay.
          </p>
        </motion.div>

        {/* Directory Card */}
        <div
          ref={cardRef}
          className="mt-10 sm:mt-12 rounded-[28px] border border-[#e2eae5] bg-white p-5 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(24,60,47,0.05)]"
        >
          {/* Card Sub-header */}
          <div className="flex flex-col gap-2 border-b border-[#edf2ef] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[17px] font-bold text-[#183c2f] sm:text-[19px]">
                Nearby Destinations &amp; Distances
              </h3>
              <p className="text-[13px] text-[#6e847c]">
                Calculated from our central Hurghada properties
              </p>
            </div>
            {!isLoading && (
              <div className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-[#d6e8de] bg-[#f2f8f5] px-3.5 py-1.5 text-[12px] font-semibold text-[#2e6f57]">
                <span className="size-2 rounded-full bg-[#2e6f57]" />
                <span>{landmarks.length} Verified Locations</span>
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[62px] rounded-xl border border-[#edf2ef] bg-[#f9faf9] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              {/* Primary Static Grid (Zero layout shift, always stable) */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {initialLandmarks.map((item, index) => (
                  <LandmarkRow key={item.id} item={item} index={index} />
                ))}
              </div>

              {/* Extra Items Animated Container */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="extra-landmarks"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
                      {extraLandmarks.map((item, index) => (
                        <LandmarkRow
                          key={item.id}
                          item={item}
                          index={INITIAL_DISPLAY_COUNT + index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Toggle Button for More Items */}
          {hasMore && !isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center border-t border-[#edf2ef] pt-6">
              <button
                type="button"
                onClick={handleToggle}
                className="group inline-flex items-center gap-2 rounded-full border border-[#cfb072] bg-white px-6 py-2.5 text-[14px] font-semibold text-[#183c2f] shadow-xs transition-all duration-200 hover:bg-[#183c2f] hover:text-white hover:shadow-md active:scale-[0.98]"
              >
                <span>
                  {isExpanded
                    ? "Show Fewer Locations"
                    : `View All ${sortedLandmarks.length} Nearby Locations`}
                </span>
                <svg
                  className={`size-4 text-[#cfb072] transition-transform duration-300 group-hover:text-white ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <p className="mt-2.5 text-[12px] text-[#7a9187]">
                {isExpanded
                  ? `Displaying all ${sortedLandmarks.length} nearby destinations`
                  : `Showing ${INITIAL_DISPLAY_COUNT} of ${sortedLandmarks.length} top nearby destinations`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
