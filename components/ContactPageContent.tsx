"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import ContactForm from "./ContactForm";

const contactDetails = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "/contact/icons/email.svg",
    iconSize: "size-[18px]",
  },
  {
    label: "WhatsApp",
    value: siteConfig.displayPhone,
    href: siteConfig.whatsappUrl,
    external: true,
    icon: "/contact/icons/phone.svg",
    iconSize: "size-[18px]",
  },
  {
    label: "Office",
    value: siteConfig.address.label,
    href: "https://www.google.com/maps/search/?api=1&query=Hurghada%20El%20Kawther",
    external: true,
    icon: "/contact/icons/office.svg",
    iconSize: "h-5 w-4",
  },
  {
    label: "Working Hours",
    value: "Sun - Thu: 9:00 AM - 6:00 PM",
    icon: "/contact/icons/clock.svg",
    iconSize: "size-5",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

type MotionProps = {
  shouldReduceMotion: boolean | null;
  viewport: { once: boolean; amount: number };
};

export default function ContactPageContent() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };

  return (
    <main className="bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <motion.div
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="bg-[#f7f9f8] px-5 py-8 sm:px-8 lg:px-20 lg:py-12"
      >
        <div className="mx-auto max-w-[1280px]">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-[13px] text-[#667c74]">
            <Link href="/" className="font-medium transition hover:text-[#2e6f57]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#183c2f]">Contact Us</span>
          </motion.nav>
          <motion.h1 variants={fadeUp} className="text-[30px] font-semibold leading-tight text-[#2e6f57] sm:text-[38px] lg:text-[48px]">
            Contact Us
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 max-w-[620px] text-[14px] leading-7 text-[#667c74] lg:text-[18px] lg:leading-8">
            Have questions, need help choosing a property, or want to talk through your plans? Send us a message and our team will get back to you.
          </motion.p>
        </div>
      </motion.div>

      <section className="px-5 py-10 sm:px-8 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
            <ContactInfoPanel shouldReduceMotion={shouldReduceMotion} viewport={viewport} />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
function ContactInfoPanel({ shouldReduceMotion, viewport }: MotionProps) {
  return (
    <motion.aside
      variants={shouldReduceMotion ? undefined : container}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      className="flex flex-col gap-6"
    >
      <motion.div variants={fadeUp}>
        <p className="text-[13px] font-semibold uppercase text-[#cfb072]">Get in touch</p>
        <h2 className="mt-2 text-[24px] font-semibold leading-tight text-[#2e6f57] lg:text-[30px]">
          We are here to help.
        </h2>
        <p className="mt-3 text-[14px] leading-7 text-[#667c74] lg:text-[16px]">
          Reach us through any channel below, or use the form and we will route your message to the right person.
        </p>
      </motion.div>

      <motion.div variants={container} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {contactDetails.map((detail) => (
          <motion.a
            key={detail.label}
            href={detail.href}
            target={detail.external ? "_blank" : undefined}
            rel={detail.external ? "noopener noreferrer" : undefined}
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            className="flex min-w-0 items-start gap-4 rounded-2xl border border-[#e8f0ec] bg-[#f7f9f8] p-4 shadow-[0_6px_18px_rgba(31,77,61,0.04)] transition hover:border-[#2e6f57]/25"
          >
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e8f0ec]">
              <Image src={detail.icon} alt="" width={20} height={20} className={detail.iconSize} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase text-[#8a9a94]">{detail.label}</p>
              <p className="mt-1 break-words text-[14px] leading-6 text-[#183c2f] lg:text-[15px]">
                {detail.value}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.aside>
  );
}
