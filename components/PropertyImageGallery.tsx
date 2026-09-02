"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  className: string;
}

interface PropertyImageGalleryProps {
  images: GalleryImage[];
}

export default function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid Layout */}
      <div className="grid aspect-[347/164] w-full grid-cols-4 grid-rows-2 gap-[6px] overflow-hidden rounded-[4px] lg:aspect-[847/400] lg:gap-4 lg:rounded-lg">
        {images.map((image, idx) => (
          <button
            key={image.src + idx}
            type="button"
            onClick={() => {
              setSelectedIndex(idx);
              setIsOpen(true);
            }}
            className={`group relative overflow-hidden bg-[#e8eeec] ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 425px, 170px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {/* Full-Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="text-[14px] text-white/70">
              {selectedIndex + 1} / {images.length}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="grid size-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Image Area */}
          <div className="relative flex-1 p-4 lg:px-24">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 lg:left-8"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 lg:right-8"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Active Image */}
            <div className="relative h-full w-full">
              <Image
                key={images[selectedIndex].src} // Forces remount on change for simple fade effect
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain animate-in fade-in duration-300"
                sizes="100vw"
                quality={90}
                priority
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="h-24 px-4 pb-4 lg:px-8 lg:pb-8 flex justify-center">
            <div className="flex items-center gap-2 overflow-x-auto">
              {images.map((image, idx) => (
                <button
                  key={image.src + idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded transition-all duration-200 ${
                    idx === selectedIndex ? "ring-2 ring-white ring-offset-1 ring-offset-black" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}
