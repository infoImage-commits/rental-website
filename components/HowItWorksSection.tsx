"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Search",
    description: "Use our smart search filters to browse properties by location, property type, budget, and amenities.",
    icon: "/homepage/how-it-works/icons/search.svg",
  },
  {
    title: "Explore",
    description: "View detailed property information, browse high-quality photos, compare listings, and save your favourites.",
    icon: "/homepage/how-it-works/icons/building.svg",
  },
  {
    title: "Schedule",
    description: "Book a property tour at a time that works for you and experience the property in person.",
    icon: "/homepage/how-it-works/icons/calendar.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  },
};

export default function HowItWorksSection() {
  return (
    <section className="bg-[#1f4d3d] px-5 py-9 font-[var(--font-poppins)] sm:px-8 sm:py-16 lg:px-20 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid gap-6 md:grid-cols-3 lg:mt-10 lg:gap-[59px]"
        >
          {steps.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex max-w-[730px] flex-col items-center gap-4 text-center"
    >
      <p className="text-[14px] font-medium uppercase tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
        How It Works
      </p>
      <h2 className="max-w-[500px] text-[20px] font-medium leading-normal tracking-[-0.02em] text-white lg:text-[36px]">
        Find Your Perfect Property in 3 Simple Steps
      </h2>
      <div className="h-[7px] w-[170px] rounded-[3px] bg-[#cfb072]" />
    </motion.div>
  );
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <motion.article 
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center"
    >
      <div className="relative flex aspect-[210/203] w-[168px] items-center justify-center lg:w-[210px] group">
        <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full border-b-[3.2px] border-[#d59e52] transition-colors duration-300 group-hover:border-[#cfb072] lg:border-b-4" />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Image src={step.icon} alt="" width={67} height={67} className="relative size-[53px] lg:size-[67px]" />
        </motion.div>
      </div>

      <div className="-mt-1 flex min-h-[176px] w-full max-w-[305px] flex-col items-center justify-center rounded-[34px] bg-white px-5 text-center sm:max-w-none lg:min-h-[224px] lg:rounded-[42px] lg:px-7 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 className="text-[16px] font-semibold leading-normal tracking-[-0.02em] text-[#d59e52] lg:text-[20px]">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[16px] leading-normal tracking-[-0.02em] text-[#183c2f] lg:mt-2 lg:text-[20px]">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}
