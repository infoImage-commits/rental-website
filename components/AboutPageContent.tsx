"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

const summaryPoints = ["Verified Properties", "Expert Local Knowledge", "Dedicated Support"];

const stats = [
  { value: "10+", label: "Years Experience", icon: "/about/icons/experience.svg", iconClassName: "h-7 w-[21px]" },
  { value: "2,500+", label: "Happy Clients", icon: "/about/icons/clients.svg", iconClassName: "h-[21px] w-[29px]" },
  { value: "1,200+", label: "Properties", icon: "/about/icons/properties.svg", iconClassName: "size-6" },
  { value: "20+", label: "Expert Agents", icon: "/about/icons/agents.svg", iconClassName: "h-6 w-[27px]" },
];

const reasons = [
  {
    title: "Wide Range of Properties",
    description: "Apartments, villas, studios, and short-stay homes selected for different plans and budgets.",
    icon: "/about/icons/wide-range.svg",
    iconClassName: "size-7",
  },
  {
    title: "Prime Locations",
    description: "We focus on places that make daily life, travel, and investment decisions easier.",
    icon: "/about/icons/prime-location.svg",
    iconClassName: "h-[27px] w-[21px]",
  },
  {
    title: "Transparent Process",
    description: "Clear details, reliable information, and booking steps that are easy to follow.",
    icon: "/about/icons/transparent.svg",
    iconClassName: "h-[27px] w-[29px]",
  },
  {
    title: "Customer Support",
    description: "A responsive team that helps before, during, and after your property search.",
    icon: "/about/icons/agents.svg",
    iconClassName: "h-6 w-[27px]",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

type MotionProps = {
  shouldReduceMotion: boolean | null;
  viewport: { once: boolean; amount: number };
};

export default function AboutPageContent() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };

  return (
    <main className="bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-8 sm:px-8 lg:px-20 lg:pb-24 lg:pt-[98px]">
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <PageHeader />
        </motion.div>

        <section className="mt-6 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <AboutCopy shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
          <AboutImage shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
        </section>

        <StatsSection shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
        <WhyChooseUs shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
      </div>

      <AboutCta shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
    </main>
  );
}

function PageHeader() {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-start gap-2">
      <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[14px] leading-5 lg:text-[16px]">
        <Link href="/" className="font-semibold text-[#414847] transition hover:text-[#2e6f57]">
          Home
        </Link>
        <span className="text-[#8a9a94]">/</span>
        <span className="text-[#183c2f]">About Us</span>
      </nav>

      <h1 className="text-[28px] font-semibold leading-tight text-[#2e6f57] lg:text-[42px]">
        About Us
      </h1>
    </motion.div>
  );
}

function AboutCopy({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      className="flex flex-col items-start gap-7"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <p className="text-[13px] font-semibold uppercase text-[#cfb072]">Who we are</p>
        <h2 className="max-w-[670px] text-[28px] font-semibold leading-[1.18] text-[#183c2f] sm:text-[34px] lg:text-[48px]">
          A simpler way to find a place that feels right.
        </h2>
        <p className="max-w-[614px] text-[14px] leading-7 text-[#5d6965] lg:text-[18px] lg:leading-8">
          We help people rent, buy, and plan stays across Egypt with clear property details, local knowledge, and a team that keeps the process calm from search to confirmation.
        </p>
      </motion.div>

      <motion.ul variants={container} className="grid gap-3 sm:grid-cols-3">
        {summaryPoints.map((point) => (
          <motion.li
            key={point}
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            className="flex min-h-12 items-center gap-3 rounded-lg border border-[#dfe8e4] bg-[#fbfdfc] px-4 text-[13px] font-semibold text-[#414847] shadow-[0_6px_18px_rgba(31,77,61,0.04)]"
          >
            <Image src="/about/icons/check-circle.svg" alt="" width={17} height={17} className="size-[17px] shrink-0" />
            {point}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={container} className="grid gap-5">
        <TextBlock
          title="Our Mission"
          body="To guide every client with honesty, useful information, and reliable service so choosing a property feels less stressful and more confident."
        />
        <TextBlock
          title="What We Help With"
          body="From modern apartments and villas to investment opportunities and transfer planning, our team brings the details together so you can make decisions faster."
        />
      </motion.div>
    </motion.div>
  );
}

function TextBlock({ title, body }: { title: string; body: string }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-2 rounded-lg border-l-4 border-[#cfb072] bg-[#fbfdfc] py-1 pl-4">
      <h2 className="text-[18px] font-semibold leading-7 text-[#2e6f57] lg:text-[24px]">{title}</h2>
      <p className="max-w-[720px] text-[13px] leading-7 text-[#5d6965] lg:text-[16px] lg:leading-8">
        {body}
      </p>
    </motion.div>
  );
}

function AboutImage({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      className="relative min-h-[290px] overflow-hidden rounded-2xl bg-[#f4f1ec] shadow-[0_22px_50px_rgba(31,77,61,0.12)] sm:min-h-[420px] lg:min-h-[548px] lg:rounded-[28px]"
    >
      <Image
        src="/about/living-room.png"
        alt="Bright rental living room with large windows"
        fill
        priority
        sizes="(min-width: 1024px) 623px, 100vw"
        className="object-cover object-center transition duration-700 lg:scale-[1.35]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#183c2f]/70 to-transparent p-5 text-white lg:p-8">
        <p className="max-w-sm text-[18px] font-semibold leading-7 lg:text-[24px]">
          Thoughtfully selected homes, explained clearly.
        </p>
      </div>
    </motion.div>
  );
}

function StatsSection({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      className="mt-10 rounded-2xl border border-[#dfe8e4] bg-[#f8faf9] px-5 py-8 lg:mt-16 lg:px-12 lg:py-14"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            className="flex min-h-[132px] min-w-0 flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 text-center shadow-[0_6px_18px_rgba(31,77,61,0.04)]"
          >
            <div className="flex items-center justify-center gap-2">
              <Image src={stat.icon} alt="" width={30} height={30} className={stat.iconClassName} />
              <div className="text-[28px] font-semibold leading-tight text-[#292d32] lg:text-[38px]">
                {stat.value}
              </div>
            </div>
            <div className="text-[11px] font-semibold uppercase leading-4 text-[#5d6965] lg:text-[14px]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function WhyChooseUs({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      className="mt-10 lg:mt-16"
    >
      <motion.div variants={fadeUp} className="max-w-2xl">
        <p className="text-[13px] font-semibold uppercase text-[#cfb072]">Why people trust us</p>
        <h2 className="mt-2 text-[26px] font-semibold leading-tight text-[#2e6f57] lg:text-[36px]">
          Practical help at every step.
        </h2>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
        {reasons.map((reason) => (
          <motion.article
            key={reason.title}
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            className="flex min-h-[220px] flex-col rounded-lg border border-[#dfe8e4] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(31,77,61,0.05)]"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
              className="grid size-14 place-items-center rounded-full bg-[#f5f7f6]"
            >
              <Image src={reason.icon} alt="" width={29} height={29} className={reason.iconClassName} />
            </motion.div>
            <h3 className="mt-5 text-[16px] font-semibold leading-6 text-[#183c2f]">{reason.title}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#5d6965] lg:text-[14px]">{reason.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function AboutCta({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.section
      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.6 }}
      className="relative min-h-[280px] overflow-hidden bg-[#1f4d3d] lg:min-h-[460px]"
    >
      <Image
        src="/about/cta-map-pin.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#1f4d3d]/55" />

      <motion.div
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={viewport}
        className="relative mx-auto flex max-w-[1440px] px-5 py-14 sm:px-8 lg:px-20 lg:py-[122px]"
      >
        <div className="flex max-w-[760px] flex-col items-start gap-4">
          <motion.h2 variants={fadeUp} className="max-w-[680px] text-[32px] font-semibold leading-tight text-white lg:text-[56px]">
            Ready to start your next property move?
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-[560px] text-[14px] leading-7 text-white/90 lg:text-[18px] lg:leading-8">
            Tell us what you are looking for and our team will help you compare options, understand the details, and take the next step with confidence.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/contact"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-[#2e6f57] shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition hover:bg-[#f5f7f6]"
            >
              Talk to our team
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
