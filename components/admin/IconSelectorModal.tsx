"use client";

import { useState } from "react";
import Image from "next/image";

const AVAILABLE_ICONS = [
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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#e6ece9] bg-white px-3 text-[14px] text-[#1F4D3D] outline-none transition placeholder:text-[#aab4b0] focus:border-[#1F4D3D] focus:ring-2 focus:ring-[#1F4D3D]/10"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {filteredIcons.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-gray-500">
              No icons found.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
              {/* Add a default star icon option if they want one */}
              {filteredIcons.map((icon) => (
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
                  <div className="relative size-8 shrink-0">
                    <Image
                      src={`/icons/amenities/${icon}.svg`}
                      alt={icon}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-[11px] font-medium text-[#667c74] break-all">
                    {icon.replace(/-/g, " ")}
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
