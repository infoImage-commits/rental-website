"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "./I18nProvider";

export default function RentalCtaSection() {
  const { t, href } = useI18n();

  return (
    <section className="min-h-[220px] overflow-hidden bg-[#1f4d3d] lg:min-h-[361px]">
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[52%] opacity-75 sm:w-[46%] lg:w-[44%] lg:opacity-95"
        >
          <Image
            src="/homepage/vacation/resort-night-view.jpeg"
            alt={t("home.cta.alt")}
            fill
            sizes="(min-width: 1024px) 44vw, 52vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#1f4d3d] via-[#1f4d3d]/95 to-[#1f4d3d]/25" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } }
          }}
          className="relative z-10 flex min-h-[220px] max-w-[680px] flex-col justify-center px-5 py-8 sm:px-8 lg:min-h-[361px] lg:px-20 lg:py-14"
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            className="max-w-[420px] text-[26px] font-semibold leading-[1.2] text-white sm:text-[32px] lg:max-w-none lg:text-[40px]"
          >
            {t("home.cta.title")}
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            className="mt-4 max-w-[560px] text-[14px] font-medium leading-[1.6] text-white sm:text-[16px] lg:text-[20px]"
          >
            {t("home.cta.body")}
          </motion.p>
          <motion.div 
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} 
            className="mt-4 h-[5px] w-[120px] origin-left rounded bg-[#cfb072] lg:h-[7px] lg:w-[170px]" 
          />
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Link
              href={href("/rent")}
              className="mt-6 inline-flex h-12 min-w-[210px] items-center justify-center rounded-full bg-white px-7 text-[16px] font-medium text-[#2e6f57] transition hover:scale-105 hover:bg-[#f8f5f0] lg:h-14 lg:min-w-[251px] lg:text-[20px]"
            >
              {t("home.cta.action")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
