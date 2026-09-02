"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { PropertyType } from "@/lib/types/property";
import { buildRentPropertyTypeHref, HOUSE_RENT_PROPERTY_TYPES } from "@/lib/utils/propertyUtils";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Rent", href: "/rent" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQ", href: "/faq" },
  { label: "House Rules", href: "/house-rules" },
];

const propertyTypes = [
  { label: "Apartments", href: buildRentPropertyTypeHref(PropertyType.Apartment) },
  { label: "Villas", href: buildRentPropertyTypeHref(PropertyType.Villa) },
  { label: "Studios", href: buildRentPropertyTypeHref(PropertyType.Studio) },
  { label: "Homes", href: buildRentPropertyTypeHref(HOUSE_RENT_PROPERTY_TYPES) },
];

const socialLinks = [
  { label: "WhatsApp", href: siteConfig.whatsappUrl, icon: "/footer/icons/whatsapp.svg" },
];

const contactItems = [
  { label: siteConfig.displayPhone, href: siteConfig.whatsappUrl, icon: "/footer/icons/phone.svg", external: true },
  { label: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: "/contact/icons/email.svg" },
  {
    label: siteConfig.address.label,
    href: "https://www.google.com/maps/search/?api=1&query=Hurghada%20El%20Kawther",
    icon: "/footer/icons/location.svg",
    external: true,
  },
];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const footerMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};
const footerGridMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};
const footerColumnMotion: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: smoothEase,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};
const footerItemMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: smoothEase },
  },
};

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? false : "hidden";

  return (
    <motion.footer
      variants={footerMotion}
      initial={initialState}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="mt-auto bg-[#1f4d3d] px-5 py-6 font-[var(--font-poppins)] text-white sm:px-8 lg:px-20 lg:pb-9 lg:pt-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={footerGridMotion}
          className="grid gap-8 lg:grid-cols-[305px_197px_196px_371px] lg:gap-5"
        >
          <BrandColumn shouldReduceMotion={!!shouldReduceMotion} />
          <FooterLinkColumn title="Quick action" links={quickLinks} shouldReduceMotion={!!shouldReduceMotion} />
          <FooterLinkColumn title="Properties Type" links={propertyTypes} shouldReduceMotion={!!shouldReduceMotion} />
          <ContactColumn shouldReduceMotion={!!shouldReduceMotion} />
        </motion.div>

        <motion.p
          variants={footerItemMotion}
          className="mt-8 text-center text-[10px] font-light leading-normal lg:mt-12 lg:text-[12px]"
        >
          Powered By{" "}
          <motion.a
            href="https://tech-gear.net/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            className="inline-block hover:underline"
          >
            Tech Gear Solutions
          </motion.a>
          &nbsp; &copy; 2026 All Rights Reserved
        </motion.p>
      </div>
    </motion.footer>
  );
}

function BrandColumn({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <motion.div variants={footerColumnMotion} className="flex flex-col items-start gap-[17px]">
      <motion.div variants={footerItemMotion} whileHover={shouldReduceMotion ? undefined : { y: -2 }}>
        <Image
          src="/logo-white.png"
          alt="Logo"
          width={219}
          height={100}
          unoptimized
          className="h-20 w-auto object-contain lg:h-[100px]"
        />
      </motion.div>
      <motion.p
        variants={footerItemMotion}
        className="max-w-[325px] text-[12px] leading-[1.6] lg:max-w-[284px] lg:text-[14px]"
      >
        Every journey is a chance to find your perfect home, enjoy comfort, and create lasting memories guided by care,
        quality, and local expertise.
      </motion.p>
      <motion.div variants={footerItemMotion} className="flex items-center gap-6">
        {socialLinks.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="grid size-6 place-items-center"
          >
            <Image src={item.icon} alt="" width={24} height={24} className="size-6" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function FooterLinkColumn({
  title,
  links,
  shouldReduceMotion,
}: {
  title: string;
  links: typeof quickLinks;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div variants={footerColumnMotion} className="flex flex-col items-start gap-2.5">
      <FooterHeading>{title}</FooterHeading>
      <ul className="flex flex-col gap-[11px]">
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={footerItemMotion}
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
          >
            <Link href={link.href} className="group flex items-center gap-1 text-[12px] leading-[1.6] lg:text-[18px]">
              <Chevron />
              <span className="transition group-hover:text-[#cfb072]">{link.label}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ContactColumn({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <motion.div variants={footerColumnMotion} className="flex flex-col items-start gap-4">
      <FooterHeading>contact Us</FooterHeading>
      <ul className="flex flex-col gap-3.5">
        {contactItems.map((item) => (
          <motion.li
            key={item.label}
            variants={footerItemMotion}
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
          >
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex min-w-0 items-center gap-2.5 text-[12px] leading-[1.6] transition hover:text-[#cfb072] lg:text-[16px]"
            >
              <span className="grid size-5 shrink-0 place-items-center lg:size-[22px]">
                <Image src={item.icon} alt="" width={20} height={20} className="max-h-[18px] w-[18px] object-contain [filter:brightness(0)_invert(1)] lg:max-h-5 lg:w-5" />
              </span>
              <span className="min-w-0 break-words">{item.label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <motion.h2 variants={footerItemMotion} className="text-[14px] font-semibold leading-[1.6] text-[#cfb072] lg:text-[18px]">
      {children}
    </motion.h2>
  );
}

function Chevron() {
  return (
    <Image
      src="/footer/icons/chevron.svg"
      alt=""
      width={12}
      height={12}
      className="size-3 shrink-0"
    />
  );
}
