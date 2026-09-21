"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHeaderStore } from "../lib/headerStore";
import { localeFlags, localeLabels, locales, localizePath, stripLocale, type Locale } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";

type NavItem = {
  href?: string;
  label: string;
  subItems?: { href: string; label: string }[];
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const headerMotion: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};
const headerInnerMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};
const headerItemMotion: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: smoothEase },
  },
};
const dropdownMotion: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: smoothEase,
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.16, ease: smoothEase },
  },
};
const dropdownItemMotion: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: smoothEase },
  },
};
const mobileMenuMotion: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: smoothEase,
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.16, ease: smoothEase },
  },
};

export default function Header() {
  const { menuOpen, toggleMenu, closeMenu } = useHeaderStore();
  const pathname = usePathname();
  const publicPathname = stripLocale(pathname);
  const { t, href, locale } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const initialState = shouldReduceMotion ? false : "hidden";
  const navItems: NavItem[] = [
    { href: "/", label: t("nav.items.home") },
    { href: "/rent", label: t("nav.items.rent") },
    { href: "/transfer", label: t("nav.items.transfer") },
    { href: "/about", label: t("nav.items.about") },
    { href: "/contact", label: t("nav.items.contact") },
    { href: "/blogs", label: t("nav.items.blogs") },
  ];

  return (
    <motion.header
      variants={headerMotion}
      initial={initialState}
      animate="visible"
      className="sticky top-0 z-[60] w-full bg-white font-[var(--font-poppins)] shadow-[0_2px_2px_rgba(0,0,0,0.15)] lg:shadow-none"
    >
      <motion.div
        variants={headerInnerMotion}
        className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between px-5 sm:px-10 lg:grid lg:h-[104px] lg:grid-cols-[1fr_auto_1fr] lg:px-6 xl:px-0"
      >
        <motion.div variants={headerItemMotion} whileHover={shouldReduceMotion ? undefined : { y: -2 }}>
          <Link href={href("/")} className="flex shrink-0 items-center" aria-label={t("nav.homeAria")}>
            <Image
              src="/logo-green.png"
              alt="Logo"
              width={140}
              height={80}
              priority
              unoptimized
              className="h-14 w-auto object-contain lg:h-[90px]"
            />
          </Link>
        </motion.div>

        <motion.nav
          variants={headerInnerMotion}
          className="hidden items-center gap-[13px] text-[20px] font-medium text-[#12382e] lg:flex"
        >
          {navItems.map((item) => {
            if (item.subItems) {
              const isActive = item.subItems.some(sub => publicPathname === sub.href || publicPathname.startsWith(`${sub.href}/`));
              const isOpen = openDropdown === item.label;

              return (
                <motion.div
                  key={item.label}
                  variants={headerItemMotion}
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="relative flex h-[104px] cursor-pointer items-center"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    className={`relative flex h-full items-center whitespace-nowrap px-[13px] transition-colors hover:text-[#2f7b61] ${
                      isActive ? "text-[#2f7b61]" : ""
                    }`}
                  >
                    {item.label}
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.18 }}
                      className="ml-1.5 size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                    {isActive && (
                      <motion.span
                        layoutId="public-header-active-underline"
                        className="absolute bottom-[29px] left-1/2 h-[3px] w-[88px] -translate-x-1/2 rounded-full bg-[#1F4D3D]"
                        transition={{ duration: 0.28, ease: smoothEase }}
                      />
                    )}
                  </motion.div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={dropdownMotion}
                        initial={initialState}
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 top-[90px] flex w-48 origin-top flex-col overflow-hidden rounded-xl border border-[#1F4D3D]/10 bg-white shadow-[0_12px_24px_rgba(31,77,61,0.08)]"
                      >
                        {item.subItems.map((sub) => (
                          <motion.div key={sub.href} variants={dropdownItemMotion}>
                            <Link
                              href={href(sub.href)}
                              className="block px-5 py-3 text-[16px] text-[#12382e] transition hover:bg-[#f4faf7] hover:text-[#2f7b61]"
                            >
                              {sub.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            const isActive = publicPathname === item.href || (item.href !== "/" && publicPathname.startsWith(`${item.href}/`));

            return (
              <motion.div
                key={item.label}
                variants={headerItemMotion}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              >
                <Link
                  href={href(item.href!)}
                  className={`relative flex h-[104px] items-center whitespace-nowrap px-[13px] transition-colors hover:text-[#2f7b61] ${
                    isActive ? "text-[#2f7b61]" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="public-header-active-underline"
                      className="absolute bottom-[29px] left-1/2 h-[3px] w-[88px] -translate-x-1/2 rounded-full bg-[#1F4D3D]"
                      transition={{ duration: 0.28, ease: smoothEase }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        <motion.div variants={headerItemMotion} className="hidden justify-self-end lg:block">
          <LanguageSwitcher locale={locale} publicPathname={publicPathname} />
        </motion.div>

        <motion.button
          variants={headerItemMotion}
          type="button"
          aria-label={t("common.toggleNavigation")}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          whileTap={{ scale: 0.92 }}
          className="flex h-8 w-8 items-center justify-end text-[#1F4D3D] transition hover:text-[#2f7b61] lg:hidden"
        >
          <span className="relative block h-[14px] w-[14px]" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-[14px] rounded-full bg-current transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-[14px] rounded-full bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-[14px] rounded-full bg-current transition ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuMotion}
            initial={initialState}
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full w-full border-t border-[#1F4D3D]/10 bg-white shadow-[0_20px_40px_rgba(31,77,61,0.12)] lg:hidden"
          >
            <nav className="mx-auto grid max-w-[1280px] gap-1 px-6 py-5 sm:px-10" onClick={closeMenu}>
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <motion.div key={item.label} variants={dropdownItemMotion} className="flex flex-col">
                      <div className="px-2 py-3 text-base font-semibold text-[#1F4D3D]">
                        {item.label}
                      </div>
                      <div className="ml-4 flex flex-col border-l-2 border-[#1F4D3D]/10 pl-2">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={href(sub.href)}
                            className="rounded-md px-2 py-2 text-[15px] font-medium text-[#1F4D3D] transition hover:bg-[#f4faf7]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={item.label} variants={dropdownItemMotion} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={href(item.href!)}
                      className="block rounded-md px-2 py-3 text-base font-semibold text-[#1F4D3D] transition hover:bg-[#f4faf7]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={dropdownItemMotion} className="mt-4 border-t border-[#1F4D3D]/10 pt-4">
                <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a9a94]">
                  {t("common.language")}
                </p>
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={localizePath(publicPathname, item)}
                    className={`flex items-center gap-3 rounded-lg px-2 py-2.5 text-[14px] font-semibold transition ${
                      item === locale
                        ? "bg-[#f0f7f4] text-[#1F4D3D]"
                        : "text-[#5d6965] hover:bg-[#f5f7f6] hover:text-[#1F4D3D]"
                    }`}
                    aria-current={item === locale ? "true" : undefined}
                  >
                    <Image
                      src={localeFlags[item].src}
                      alt={localeFlags[item].alt}
                      width={22}
                      height={16}
                      className="h-4 w-[22px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(31,77,61,0.12)]"
                    />
                    <span>{localeLabels[item]}</span>
                    {item === locale && <Check className="ml-auto size-4 text-[#2e6f57]" aria-hidden="true" />}
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LanguageSwitcher({ locale, publicPathname }: { locale: Locale; publicPathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const selectedLabel = localeLabels[locale];

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={switcherRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 min-w-[156px] items-center justify-between gap-3 rounded-full border border-[#dfe8e4] bg-white px-3 text-[14px] font-semibold text-[#1F4D3D] shadow-[0_6px_16px_rgba(31,77,61,0.05)] transition hover:border-[#2e6f57]/35 hover:bg-[#f8faf9]"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Image
            src={localeFlags[locale].src}
            alt={localeFlags[locale].alt}
            width={22}
            height={16}
            className="h-4 w-[22px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(31,77,61,0.12)]"
          />
          <span className="truncate">{selectedLabel}</span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-[#667c74] transition ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
            className="absolute right-0 top-[calc(100%+10px)] z-[80] w-56 origin-top-right overflow-hidden rounded-xl border border-[#dfe8e4] bg-white p-1.5 shadow-[0_18px_42px_rgba(31,77,61,0.16)]"
          >
            {locales.map((item) => {
              const isSelected = item === locale;

              return (
                <motion.div key={item} variants={dropdownItemMotion}>
                  <Link
                    href={localizePath(publicPathname, item)}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold transition ${
                      isSelected
                        ? "bg-[#f0f7f4] text-[#1F4D3D]"
                        : "text-[#5d6965] hover:bg-[#f8faf9] hover:text-[#1F4D3D]"
                    }`}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <Image
                      src={localeFlags[item].src}
                      alt={localeFlags[item].alt}
                      width={24}
                      height={18}
                      className="h-[18px] w-6 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(31,77,61,0.12)]"
                    />
                    <span className="min-w-0 flex-1 truncate">{localeLabels[item]}</span>
                    {isSelected && <Check className="size-4 text-[#2e6f57]" aria-hidden="true" />}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
