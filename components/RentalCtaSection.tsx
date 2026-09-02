"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RentalCtaSection() {
  return (
    <section className="h-[161px] overflow-hidden bg-gradient-to-r from-[#1f4d3d] from-[62.019%] to-[#193b2f] lg:h-[361px]">
      <div className="relative h-full w-full overflow-hidden">
        {/* House Image with custom mask */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="rent-cta-mask pointer-events-none absolute right-[-3px] top-[-13.8px] z-0 size-[152.128px] lg:right-[-48px] lg:top-[-38px] lg:size-[419px]"
        >
          <Image
            src="/rent/cta-house.png"
            alt="Modern rental home at night"
            fill
            sizes="(min-width: 1024px) 419px, 152px"
            className="scale-x-[-1] object-cover"
          />
        </motion.div>

        {/* Gradient Overlay using transparent fades on both ends to prevent any hard lines against the background */}
        <div className="pointer-events-none absolute right-[88px] top-0 z-[1] h-full w-[105px] bg-gradient-to-r from-transparent via-[#1f4d3d] to-transparent lg:right-[274px] lg:w-[345px]" />

        {/* Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } }
          }}
          className="absolute left-[17px] top-[23px] z-10 max-w-[206px] lg:left-[80px] lg:top-16 lg:max-w-[730px]"
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            className="font-[var(--font-rakkas)] max-w-[188px] text-[14px] font-normal leading-[1.6] text-white lg:max-w-none lg:text-[40px]"
          >
            Ready to Find Your Next Rental Home?
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            className="mt-[5.8px] text-[8px] leading-[1.6] text-white lg:mt-4 lg:text-[20px]"
          >
            Browse verified rental properties in prime locations and discover a place that perfectly fits your lifestyle
            and budget.
          </motion.p>
          <motion.div 
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} 
            className="mt-[5.8px] h-[2.542px] w-[61.722px] origin-left rounded bg-[#cfb072] lg:mt-4 lg:h-[7px] lg:w-[170px]" 
          />
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Link
              href="/rent"
              className="mt-[8.7px] inline-flex h-5 w-[91px] items-center justify-center rounded-full bg-white text-[6px] font-medium text-[#2e6f57] transition hover:bg-[#f8f5f0] lg:mt-6 lg:h-14 lg:w-[251px] lg:text-[20px] transition-transform hover:scale-105"
            >
              Explore Rentals
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
