"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  className?: string;
}

interface PropertyImageGalleryProps {
  images: GalleryImage[];
}

export default function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, images.length]);

  // Scroll active thumbnail into view in filmstrip
  useEffect(() => {
    if (!filmstripRef.current) return;
    const activeThumb = filmstripRef.current.children[activeIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const scrollFilmstrip = (direction: -1 | 1) => {
    if (!filmstripRef.current) return;
    filmstripRef.current.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  if (!images || images.length === 0) return null;

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="w-full">
      {/* ─── Main Featured Photo (Interactive On-Page Slider) ─── */}
      <div
        className="group relative aspect-[16/10] sm:aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#e8eeec] shadow-sm select-none"
        onClick={() => setIsOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt || "Property image"}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1280px) 850px, (min-width: 1024px) 680px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Subtle gradient overlay for controls legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none" />

        {/* Counter Badge (Top Left) */}
        <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-md">
          <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Fullscreen Expand Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="absolute right-3.5 top-3.5 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-md transition hover:bg-black/80 active:scale-95"
          title="Open fullscreen gallery"
        >
          <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span className="hidden sm:inline">View Fullscreen</span>
        </button>

        {/* Prev Arrow Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/90 text-[#183c2f] shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 sm:size-11 sm:left-4"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Arrow Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/90 text-[#183c2f] shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 sm:size-11 sm:right-4"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Bottom Bar: View All Photos Pill */}
        <div className="absolute bottom-3.5 right-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow backdrop-blur-md transition group-hover:bg-black/85">
            <svg className="size-4 text-[#cfb072]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>All {images.length} Photos</span>
          </span>
        </div>
      </div>

      {/* ─── On-Page Thumbnail Filmstrip ─── */}
      {images.length > 1 && (
        <div className="relative mt-3 flex items-center">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollFilmstrip(-1)}
            aria-label="Scroll thumbnails left"
            className="hidden sm:flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dfe8e4] bg-white text-[#183c2f] shadow-xs transition hover:border-[#2e6f57] hover:bg-[#eff8f3]"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Filmstrip Track */}
          <div
            ref={filmstripRef}
            className="flex flex-1 items-center gap-2.5 overflow-x-auto px-1 py-1.5 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={image.src + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-16 w-22 sm:h-18 sm:w-26 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? "border-[#2e6f57] ring-2 ring-[#cfb072]/60 scale-[1.03] shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-[#d2ded8]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Thumbnail ${idx + 1}`}
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#2e6f57]/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollFilmstrip(1)}
            aria-label="Scroll thumbnails right"
            className="hidden sm:flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dfe8e4] bg-white text-[#183c2f] shadow-xs transition hover:border-[#2e6f57] hover:bg-[#eff8f3]"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ─── Full-Screen Modal Lightbox ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-in fade-in duration-200 select-none">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="text-[14px] font-medium text-white/75">
              Photo {activeIndex + 1} of {images.length}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid size-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Modal Image Area */}
          <div className="relative flex-1 p-4 lg:px-24">
            {/* Modal Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 active:scale-95 lg:left-8"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Modal Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80 active:scale-95 lg:right-8"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Active Modal Image */}
            <div className="relative h-full w-full">
              <Image
                key={images[activeIndex].src}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-contain animate-in fade-in duration-300"
                sizes="100vw"
                quality={90}
                priority
              />
            </div>
          </div>

          {/* Modal Thumbnail Strip */}
          <div className="h-24 px-4 pb-4 lg:px-8 lg:pb-8 flex justify-center">
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, idx) => (
                <button
                  key={image.src + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                    idx === activeIndex
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105"
                      : "opacity-40 hover:opacity-100"
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
    </div>
  );
}
