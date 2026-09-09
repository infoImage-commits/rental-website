"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useCategories } from "@/lib/hooks/useCategory";
import { API_BASE_URL } from "@/lib/api/config";
import { CategoryItem } from "@/lib/types/category";

export default function BestLocationsSection() {
  const { data: rawViews = [], isLoading } = useCategories();
  const views = rawViews.slice(0, 8);
  const viewsScrollerRef = useRef<HTMLDivElement>(null);
  const hasMultipleViews = views.length > 1;

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  function scrollViews(direction: -1 | 1) {
    const scroller = viewsScrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>("[data-view-card]");
    const scrollDistance = (card?.offsetWidth ?? 340) + 24;

    scroller.scrollBy({
      left: direction * scrollDistance,
      behavior: "smooth",
    });
  }

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only primary mouse button (left-click)
    if (e.button !== 0) return;
    const scroller = viewsScrollerRef.current;
    if (!scroller) return;

    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scroller.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDownRef.current) return;
      const dx = moveEvent.pageX - startXRef.current;

      if (Math.abs(dx) > 6) {
        if (!hasDraggedRef.current) {
          hasDraggedRef.current = true;
          setIsDragging(true);
          scroller.style.scrollBehavior = "auto";
        }
        scroller.scrollLeft = scrollLeftRef.current - dx;
      }
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setIsDragging(false);
      if (scroller) {
        scroller.style.scrollBehavior = "";
      }

      // Small delay so that synthetic click events on Link are blocked after dragging
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 80);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1f4d3d] px-5 py-14 font-[var(--font-poppins)] sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[730px] flex-col items-center gap-4 text-center"
        >
          <p className="text-[14px] font-medium uppercase tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
            Featured Views
          </p>
          <h2 className="text-[26px] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[32px] lg:text-[36px]">
            Explore Vacation Homes by View
          </h2>
          <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
        </motion.div>

        <div className="relative mt-10 min-h-[440px] lg:mt-12">
          <div
            ref={viewsScrollerRef}
            onMouseDown={handleMouseDown}
            className={`overflow-x-auto pb-4 pt-1 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {isLoading ? (
              <div className="flex h-[440px] w-full items-center justify-center">
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
                className="flex w-max gap-5 xl:gap-6 px-2 mx-auto select-none"
              >
                {views.map((view) => (
                  <ViewCard key={view.id} view={view} onCardClick={handleCardClick} />
                ))}
              </motion.div>
            )}
          </div>

          {hasMultipleViews && !isLoading && (
            <>
              <ViewArrowButton direction="left" onClick={() => scrollViews(-1)} />
              <ViewArrowButton direction="right" onClick={() => scrollViews(1)} />
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/rent"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-white px-10 text-[16px] font-medium text-[#1f4d3d] transition hover:border-[#cfb072] hover:bg-[#f7f4eb] hover:text-[#2e6f57]"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}

function ViewCard({
  view,
  onCardClick,
}: {
  view: CategoryItem;
  onCardClick: (e: React.MouseEvent) => void;
}) {
  const imageUrl = view.imageUrl ? `${API_BASE_URL}/${view.imageUrl}` : "/homepage/locations/el-gouna.png";
  const rentHref = `/rent?CategoryId=${encodeURIComponent(view.id)}&LocationName=${encodeURIComponent(view.name)}`;

  return (
    <motion.article 
      data-view-card
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className="select-none"
    >
      <Link 
        href={rentHref}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onClick={onCardClick}
        className="group relative flex aspect-[355/440] w-[min(355px,calc(100vw-48px))] shrink-0 overflow-hidden rounded-3xl bg-[#1f4d3d] select-none [-webkit-user-drag:none] sm:w-[355px] lg:w-[330px] xl:w-[355px]"
      >
        <Image
          src={imageUrl}
          alt={`${view.name} rental view`}
          fill
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          sizes="(min-width: 1280px) 355px, (min-width: 1024px) 330px, 355px"
          className="pointer-events-none object-cover object-center select-none [-webkit-user-drag:none] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 select-none transition-opacity duration-500 group-hover:opacity-80" />
        <div className="pointer-events-none absolute inset-x-0 top-6 text-center z-10 select-none">
          <h3 className="select-none text-[24px] font-medium leading-normal tracking-[-0.02em] text-white transition-transform duration-500 group-hover:-translate-y-1">{view.name}</h3>
          <p className="select-none mt-1 text-[16px] font-medium leading-[1.5] tracking-[-0.02em] text-white/90 transition-transform duration-500 group-hover:-translate-y-1">
            {view.propertiesCount} {view.propertiesCount === 1 ? 'Property' : 'Properties'}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

function ViewArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      aria-label={isLeft ? "Previous view" : "Next view"}
      onClick={onClick}
      className={`absolute top-1/2 z-20 grid size-11 sm:size-12 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/95 text-[#1f4d3d] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:bg-[#f7f4eb] hover:scale-105 active:scale-95 ${
        isLeft ? "-left-2 sm:-left-3 lg:-left-5" : "-right-2 sm:-right-3 lg:-right-5"
      }`}
    >
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isLeft ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

