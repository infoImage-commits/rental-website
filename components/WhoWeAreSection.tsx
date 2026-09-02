"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Verified Listings",
    description: "Every property is reviewed for accuracy and quality.",
  },
  {
    title: "Prime Locations",
    description: "Homes in the most desirable communities.",
  },
  {
    title: "Expert Guidance",
    description: "Professional support at every step.",
  },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export default function WhoWeAreSection() {
  return (
    <section className="bg-white px-5 py-8 font-[var(--font-poppins)] sm:px-8 sm:py-14 lg:bg-[#f7f5f2] lg:px-20 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading />

        <div className="mt-6 grid items-start gap-5 lg:mt-7 lg:grid-cols-[minmax(0,522px)_minmax(0,595px)] lg:justify-center lg:gap-5">
          <VideoPreview />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-first flex flex-col items-start gap-5 lg:order-none lg:gap-[30px]"
          >
            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex max-w-[34rem] flex-col gap-4 capitalize">
                <h3 className="text-[16px] font-medium leading-normal tracking-[-0.02em] text-[#183c2f] lg:text-[24px]">
                  Your Trusted Partner in Finding the Perfect Rental Home
                </h3>
                <p className="text-[12px] leading-[1.6] tracking-[-0.02em] text-[#656566] lg:text-[16px]">
                  Whether you&apos;re looking for your dream home or your next rental, we help you discover carefully
                  selected properties that match your lifestyle, budget, and future aspirations.
                </p>
              </motion.div>

              <div className="flex flex-col gap-4">
                <motion.h4 variants={itemVariants} className="text-[16px] font-medium capitalize tracking-[-0.02em] text-[#183c2f] lg:text-[18px]">
                  Why Choose Us
                </motion.h4>

                <div className="flex flex-col gap-2">
                  {benefits.map((benefit) => (
                    <BenefitItem key={benefit.title} benefit={benefit} />
                  ))}
                </div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="w-full lg:w-auto">
              <Link
                href="/about"
                className="flex h-10 w-full items-center justify-center rounded-full border border-[#2e6f57] bg-white px-8 text-[16px] capitalize tracking-[-0.05em] text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white lg:w-[162px]"
              >
                Read More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto flex max-w-[730px] flex-col items-center gap-2 text-center lg:gap-4"
    >
      <p className="text-[14px] font-medium uppercase leading-normal tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
        Who We Are
      </p>
      <h2 className="max-w-[820px] text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] lg:text-[36px]">
        Creating Spaces You&apos;ll Love Coming Home To
      </h2>
      <div className="h-[7px] w-[130px] rounded-[3px] bg-[#cfb072] lg:w-[170px]" />
    </motion.div>
  );
}

function VideoPreview() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, x: -30 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[338/234] w-full overflow-hidden rounded-2xl bg-[#d8d1c6] lg:aspect-[522/361] lg:rounded-3xl"
    >
      <Image
        src="/homepage/about/video-still.png"
        alt="Aerial view of a rental resort community"
        fill
        sizes="(min-width: 1024px) 522px, 100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        aria-label="Play video"
        className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1f4d3d]/85 lg:size-[74px]"
      >
        <Image
          src="/homepage/about/icons/play.svg"
          alt=""
          width={40}
          height={40}
          className="ml-0.5 size-6 lg:size-10"
        />
      </motion.button>
    </motion.div>
  );
}

function BenefitItem({ benefit }: { benefit: (typeof benefits)[number] }) {
  return (
    <motion.div variants={itemVariants} className="flex items-start gap-1.5">
      <Image
        src="/homepage/about/icons/check.svg"
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0"
      />
      <div className="min-w-0 capitalize">
        <h5 className="text-[14px] font-medium leading-normal tracking-[-0.02em] text-[#183c2f] lg:text-[18px]">
          {benefit.title}
        </h5>
        <p className="text-[12px] leading-normal tracking-[-0.02em] text-[#737373] lg:text-[16px]">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}
