"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";

const benefits = [
  "verified",
  "locations",
  "hosts",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
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
  const { t, href } = useI18n();

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
              <motion.div variants={itemVariants} className="flex max-w-[34rem] flex-col gap-4">
                <h3 className="text-[16px] font-medium leading-normal tracking-[-0.02em] text-[#183c2f] lg:text-[24px]">
                  {t("home.who.trustedTitle")}
                </h3>
                <p className="text-[12px] leading-[1.6] tracking-[-0.02em] text-[#656566] lg:text-[16px]">
                  {t("home.who.body")}
                </p>
              </motion.div>

              <div className="flex flex-col gap-4">
                <motion.h4 variants={itemVariants} className="text-[16px] font-medium capitalize tracking-[-0.02em] text-[#183c2f] lg:text-[18px]">
                  {t("home.who.why")}
                </motion.h4>

                <div className="flex flex-col gap-2">
                  {benefits.map((benefit) => (
                    <BenefitItem key={benefit} benefitKey={benefit} />
                  ))}
                </div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="w-full lg:w-auto">
              <Link
                href={href("/about")}
                className="flex h-10 w-full items-center justify-center rounded-full border border-[#2e6f57] bg-white px-8 text-[16px] capitalize tracking-[-0.05em] text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white lg:w-[162px]"
              >
                {t("home.who.readMore")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  const { t } = useI18n();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto flex max-w-[730px] flex-col items-center gap-2 text-center lg:gap-4"
    >
      <p className="text-[14px] font-medium uppercase leading-normal tracking-[0.36em] text-[#d59e52] lg:text-[18px]">
        {t("home.who.eyebrow")}
      </p>
      <h2 className="max-w-[820px] text-[20px] font-medium leading-normal tracking-[-0.02em] text-[#2e6f57] lg:text-[36px]">
        {t("home.who.title")}
      </h2>
      <div className="h-[7px] w-[130px] rounded-[3px] bg-[#cfb072] lg:w-[170px]" />
    </motion.div>
  );
}

function VideoPreview() {
  const { t } = useI18n();

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
        alt={t("home.who.videoAlt")}
        fill
        sizes="(min-width: 1024px) 522px, 100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        aria-label={t("home.who.playVideo")}
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

function BenefitItem({ benefitKey }: { benefitKey: string }) {
  const { t } = useI18n();

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
          {t(`home.who.benefits.${benefitKey}.title`)}
        </h5>
        <p className="text-[12px] leading-normal tracking-[-0.02em] text-[#737373] lg:text-[16px]">
          {t(`home.who.benefits.${benefitKey}.description`)}
        </p>
      </div>
    </motion.div>
  );
}
