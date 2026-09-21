import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";

type Rule = {
  icon: string;
};

const rules: Rule[] = [
  {
    icon: "/billing/icons/calendar.svg",
  },
  {
    icon: "/about/icons/check-circle.svg",
  },
  {
    icon: "/icons/amenities/pets-allowed.svg",
  },
  {
    icon: "/icons/amenities/bed-linens.svg",
  },
  {
    icon: "/icons/amenities/non-smoking.svg",
  },
  {
    icon: "/icons/amenities/essentials.svg",
  },
  {
    icon: "/icons/amenities/essentials.svg",
  },
  {
    icon: "/icons/amenities/air-conditioner.svg",
  },
  {
    icon: "/billing/icons/info.svg",
  },
  {
    icon: "/icons/amenities/cooking-basics.svg",
  },
  {
    icon: "/icons/amenities/elevator.svg",
  },
  {
    icon: "/icons/amenities/family-kid-friendly.svg",
  },
  {
    icon: "/billing/icons/shield.svg",
  },
  {
    icon: "/icons/amenities/essentials.svg",
  },
];

export async function generateMetadata({ params }: PageProps<"/[locale]/house-rules">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);

  return {
    title: messages.houseRules.metadataTitle,
    description: messages.houseRules.metadataDescription,
    alternates: {
      canonical: `/${locale}/house-rules`,
    },
    openGraph: {
      title: `${messages.houseRules.metadataTitle} | ${siteConfig.name}`,
      description: messages.houseRules.metadataDescription,
      url: `/${locale}/house-rules`,
    },
  };
}

export default async function HouseRulesPage({ params }: PageProps<"/[locale]/house-rules">) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);
  const paidServices = messages.houseRules.paidServices;

  return (
    <main className="bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <section className="relative overflow-hidden bg-[#f5f7f6] px-5 py-10 sm:px-8 lg:px-20 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#667c74] lg:text-[15px]">
              <Link href={`/${locale}`} className="font-medium transition hover:text-[#2e6f57]">
                {messages.common.home}
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#183c2f]">{messages.common.houseRules}</span>
            </nav>

            <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#cfb072]">
              {messages.houseRules.eyebrow}
            </p>
            <h1 className="mt-3 max-w-[720px] text-[34px] font-semibold leading-[1.12] text-[#183c2f] sm:text-[44px] lg:text-[58px]">
              {messages.common.houseRules}
            </h1>
            <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-[#5d6965] lg:text-[18px] lg:leading-8">
              {messages.houseRules.intro}
            </p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#dfe8e4] shadow-[0_22px_50px_rgba(31,77,61,0.12)] sm:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/rent/hero-house.png"
              alt={messages.houseRules.heroAlt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rules.map((rule, index) => (
              <article
                key={messages.houseRules.rules[index][0]}
                className="flex min-h-[160px] gap-4 rounded-lg border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.04)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#f5f7f6]">
                  <Image src={rule.icon} alt="" width={22} height={22} className="max-h-6 w-6 object-contain" />
                </span>
                <div>
                  <h2 className="text-[16px] font-semibold leading-6 text-[#183c2f]">{messages.houseRules.rules[index][0]}</h2>
                  <p className="mt-2 text-[13px] leading-6 text-[#5d6965] lg:text-[14px]">{messages.houseRules.rules[index][1]}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)]">
            <section className="rounded-lg border border-[#dfe8e4] bg-[#f8faf9] p-6">
              <h2 className="text-[20px] font-semibold text-[#183c2f]">{messages.houseRules.additionalServices}</h2>
              <ul className="mt-5 grid gap-3">
                {paidServices.map((service) => (
                  <li key={service} className="flex gap-3 text-[14px] leading-6 text-[#5d6965]">
                    <Image src="/about/icons/check-circle.svg" alt="" width={18} height={18} className="mt-1 size-[18px] shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="rounded-lg border border-[#d8bf82] bg-[#fffaf0] p-6">
              <h2 className="text-[18px] font-semibold text-[#183c2f]">{messages.houseRules.serviceContact}</h2>
              <p className="mt-3 text-[14px] leading-6 text-[#5d6965]">
                {messages.houseRules.serviceBody}
              </p>
              <a
                href="tel:+201273613935"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#2e6f57] px-6 text-[14px] font-semibold text-white transition hover:bg-[#255f49]"
              >
                +20 127 361 3935
              </a>
            </aside>
          </div>

          <section className="mt-8 rounded-lg border border-[#dfe8e4] bg-white p-6 text-center shadow-[0_8px_24px_rgba(31,77,61,0.04)]">
            <p className="mx-auto max-w-[820px] text-[15px] leading-7 text-[#5d6965] lg:text-[17px]">
              {messages.houseRules.thankYou}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
