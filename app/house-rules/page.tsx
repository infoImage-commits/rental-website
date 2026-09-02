import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type Rule = {
  title: string;
  body: string;
  icon: string;
};

const rules: Rule[] = [
  {
    title: "Check-in and Check-out",
    body: "Check-in starts from 2:00 PM. Check-out is before 12:00 PM noon.",
    icon: "/billing/icons/calendar.svg",
  },
  {
    title: "Visitors, Parties, and Events",
    body: "Visitors are not permitted. Parties and events are not allowed.",
    icon: "/about/icons/check-circle.svg",
  },
  {
    title: "Pets",
    body: "Pets are not allowed inside the apartment.",
    icon: "/icons/amenities/pets-allowed.svg",
  },
  {
    title: "Bed Linen Care",
    body: "Please do not decorate the bed linen with flowers, as this may cause permanent stains.",
    icon: "/icons/amenities/bed-linens.svg",
  },
  {
    title: "Smoking",
    body: "Smoking is permitted only in designated areas. Please dispose of cigarette butts responsibly.",
    icon: "/icons/amenities/non-smoking.svg",
  },
  {
    title: "Quiet Hours",
    body: "Please respect your neighbours by keeping noise to a minimum, especially during the evening and night.",
    icon: "/icons/amenities/essentials.svg",
  },
  {
    title: "Apartment and Resort Care",
    body: "Treat the apartment and resort with the same care and respect as you would your own home.",
    icon: "/icons/amenities/essentials.svg",
  },
  {
    title: "Air Conditioning",
    body: "Please switch off the air conditioning whenever you leave the apartment.",
    icon: "/icons/amenities/air-conditioner.svg",
  },
  {
    title: "Damage or Breakages",
    body: "If anything is damaged or broken during your stay, please inform us immediately so we can arrange repairs.",
    icon: "/billing/icons/info.svg",
  },
  {
    title: "Clean Floors",
    body: "Please do not throw food on the floor.",
    icon: "/icons/amenities/cooking-basics.svg",
  },
  {
    title: "Rubbish Disposal",
    body: "For rubbish disposal, please use the garbage collection tube located on the wall behind the elevator.",
    icon: "/icons/amenities/elevator.svg",
  },
  {
    title: "Children",
    body: "Children must be supervised by their parents or guardians at all times.",
    icon: "/icons/amenities/family-kid-friendly.svg",
  },
  {
    title: "Conserve Utilities",
    body: "Please help us conserve water and electricity.",
    icon: "/billing/icons/shield.svg",
  },
  {
    title: "Bathroom Use",
    body: "Do not flush toilet paper or other items down the toilet. Please use the waste bin provided.",
    icon: "/icons/amenities/essentials.svg",
  },
];

const paidServices = [
  "Laundry service is available for an additional charge.",
  "Apartment cleaning, including fresh bed linen and towels, is available for an additional charge.",
];

export const metadata: Metadata = {
  title: "House Rules",
  description:
    "Review the house rules for Hurghada Vacation Homes, including check-in times, visitor policy, apartment care, cleaning, laundry, and safety guidance.",
  alternates: {
    canonical: "/house-rules",
  },
  openGraph: {
    title: `House Rules | ${siteConfig.name}`,
    description: "Important stay guidance for Hurghada Vacation Homes guests.",
    url: "/house-rules",
  },
};

export default function HouseRulesPage() {
  return (
    <main className="bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <section className="relative overflow-hidden bg-[#f5f7f6] px-5 py-10 sm:px-8 lg:px-20 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#667c74] lg:text-[15px]">
              <Link href="/" className="font-medium transition hover:text-[#2e6f57]">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#183c2f]">House Rules</span>
            </nav>

            <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#cfb072]">
              Guest Information
            </p>
            <h1 className="mt-3 max-w-[720px] text-[34px] font-semibold leading-[1.12] text-[#183c2f] sm:text-[44px] lg:text-[58px]">
              House Rules
            </h1>
            <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-[#5d6965] lg:text-[18px] lg:leading-8">
              Welcome. We hope you have a comfortable and enjoyable stay. Please note that these are self-catering apartments,
              so hotel services are not provided.
            </p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#dfe8e4] shadow-[0_22px_50px_rgba(31,77,61,0.12)] sm:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/rent/hero-house.png"
              alt="Comfortable holiday rental home"
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
            {rules.map((rule) => (
              <article
                key={rule.title}
                className="flex min-h-[160px] gap-4 rounded-lg border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.04)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#f5f7f6]">
                  <Image src={rule.icon} alt="" width={22} height={22} className="max-h-6 w-6 object-contain" />
                </span>
                <div>
                  <h2 className="text-[16px] font-semibold leading-6 text-[#183c2f]">{rule.title}</h2>
                  <p className="mt-2 text-[13px] leading-6 text-[#5d6965] lg:text-[14px]">{rule.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)]">
            <section className="rounded-lg border border-[#dfe8e4] bg-[#f8faf9] p-6">
              <h2 className="text-[20px] font-semibold text-[#183c2f]">Additional Services</h2>
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
              <h2 className="text-[18px] font-semibold text-[#183c2f]">Service Contact</h2>
              <p className="mt-3 text-[14px] leading-6 text-[#5d6965]">
                For laundry or apartment cleaning requests, contact our team.
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
              Thank you for respecting these house rules. We appreciate your cooperation and wish you a pleasant stay.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
