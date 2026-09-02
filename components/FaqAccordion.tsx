"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types/faq";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(
    items.length > 0 ? items[0].id : null
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col"
    >
      {items.map((faq, index) => {
        const isOpen = openId === faq.id;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <motion.article
            variants={itemVariants}
            key={faq.id}
            className={`bg-white shadow-[2px_1px_2.5px_rgba(0,0,0,0.1)] ${
              isFirst ? "rounded-t-2xl" : ""
            } ${isLast ? "rounded-b-2xl" : ""} ${
              index !== 0 ? "border-t border-[#f0f0f0]" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors sm:px-6 ${
                isOpen ? "pb-2 pt-5" : "py-[18px]"
              }`}
            >
              <h3
                className={`font-medium leading-[1.6] text-[#183c2f] transition-all ${
                  isOpen ? "text-[14px] lg:text-[20px]" : "text-[14px] lg:text-[20px]"
                }`}
              >
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  isOpen ? "bg-[#2e6f57]" : "bg-[#f5f7f6]"
                }`}
              >
                <svg
                  className={`size-3.5 transition-colors ${isOpen ? "text-white" : "text-[#2e6f57]"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-5 text-[12px] leading-[1.7] text-[#737373] sm:px-6 lg:text-[17px]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
