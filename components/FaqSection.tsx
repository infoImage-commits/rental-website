"use client";

import Link from "next/link";
import { useFaqs } from "@/lib/hooks/useFaq";
import FaqAccordion from "./FaqAccordion";
import { motion } from "framer-motion";

export default function FaqSection() {
  const { data, isLoading, isError } = useFaqs({
    IsPublished: true,
    PageNumber: 1,
    PageSize: 5,
    SortBy: "displayOrder",
    IsDescending: false,
  });

  const faqs = data?.items ?? [];

  return (
    <section className="bg-white px-5 py-14 font-[var(--font-poppins)] sm:px-8 sm:py-20 lg:bg-[#f7f5f2] lg:px-20 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto flex max-w-[730px] flex-col items-center gap-2 text-center lg:gap-[21px]"
        >
          <p className="text-[14px] font-medium uppercase tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
            Frequently Asked Questions
          </p>
          <h2 className="max-w-[540px] text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] lg:max-w-none lg:text-[36px]">
            Have Questions? We&apos;re Here to Help.
          </h2>
          <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
        </motion.div>

        {/* Content */}
        <div className="mt-12 lg:mt-[52px]">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[60px] animate-pulse rounded-2xl bg-white shadow-[2px_1px_2.5px_rgba(0,0,0,0.08)]"
                />
              ))}
            </div>
          ) : isError || faqs.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-[14px] text-[#8a9a94]">
              {isError ? "Failed to load FAQs." : "No FAQs available at the moment."}
            </div>
          ) : (
            <FaqAccordion items={faqs} />
          )}
        </div>

        {/* CTA */}
        {faqs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/faq"
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#2e6f57] px-6 text-[14px] font-semibold text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white lg:text-[16px]"
            >
              View All FAQs
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
