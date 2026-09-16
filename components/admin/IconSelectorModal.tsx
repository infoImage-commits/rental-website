"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import DynamicAmenityIcon from "@/components/DynamicAmenityIcon";

const SVG_ICONS = [
  "air-conditioner",
  "amenities-title",
  "bar-restaurant",
  "bed-linens",
  "breakfast-included",
  "coffee-maker",
  "cooking-basics",
  "dishwasher",
  "dryer",
  "elevator",
  "essentials",
  "family-kid-friendly",
  "garden",
  "gym",
  "hair-dryer",
  "heating",
  "high-chair",
  "hot-tub",
  "indoor-fireplace",
  "internet",
  "iron",
  "non-smoking",
  "pets-allowed",
  "phone",
  "pool",
  "projector",
  "scanner-printer",
  "shampoo",
  "smoking-allowed",
  "tv",
  "washer",
  "wheelchair-accessible",
  "wireless-internet",
];

// Extract valid Lucide icon components
const LUCIDE_ICON_KEYS = Object.keys(LucideIcons).filter(
  (key) => typeof (LucideIcons as any)[key] === "function" && key !== "createLucideIcon" && key !== "icons" && key !== "useLucideContext"
);
const LUCIDE_ICONS = LUCIDE_ICON_KEYS.map((key) => `lucide:${key}`);

const AVAILABLE_ICONS = [...SVG_ICONS, ...LUCIDE_ICONS];

export default function IconSelectorModal({
  isOpen,
  onClose,
  onSelect,
  currentIcon,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icon: string) => void;
  currentIcon?: string;
}) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredIcons = AVAILABLE_ICONS.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  // Limit to 100 icons for performance, user can search to narrow down
  const visibleIcons = filteredIcons.slice(0, 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[110] flex max-h-[85vh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#183c2f]">
            Select an Icon
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-[#667c74] transition hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Search icons... (e.g. bed, tv, lucide:wifi)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[14px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10"
          />
        </div>

        {filteredIcons.length > 100 && (
          <p className="mb-4 text-xs text-gray-500 text-center">
            Showing 100 of {filteredIcons.length} matching icons. Keep typing to search.
          </p>
        )}

        <div className="flex-1 overflow-y-auto pr-2">
          {visibleIcons.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-gray-500">
              No icons found.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
              {visibleIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => onSelect(icon)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition hover:border-[#2e6f57] hover:bg-[#f4f7f6] ${
                    currentIcon === icon
                      ? "border-[#2e6f57] bg-[#f4f7f6] ring-1 ring-[#2e6f57]"
                      : "border-[#e6ece9]"
                  }`}
                >
                  <div className="relative size-8 shrink-0 flex items-center justify-center text-[#667c74]">
                    <DynamicAmenityIcon icon={icon} width={28} height={28} />
                  </div>
                  <span className="text-center text-[11px] font-medium text-[#667c74] break-all">
                    {icon.replace("lucide:", "").replace(/-/g, " ")}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
