"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import PropertyImageGallery from "./PropertyImageGallery";
import ScrollAnimation from "./ScrollAnimation";
import ContactForm from "./ContactForm";
import { usePublicPropertyBuyingById } from "@/lib/hooks/usePropertyBuying";
import { API_BASE_URL } from "@/lib/api/config";
import type { PropertyBuying, PropertyBuyingSection } from "@/lib/types/propertyBuying";


type QuickFact = {
  label: string;
  icon: string;
};

type DetailRow = [string, string];

export default function SingleBuyPropertyPageContent({ id }: { id: string }) {
  const { data: property, isLoading } = usePublicPropertyBuyingById(id);

  if (isLoading) return <div className="p-20 text-center">Loading Property...</div>;
  if (!property) return <div className="p-20 text-center">Property not found</div>;

  const galleryImages = (property.images || []).sort((a,b)=>a.displayOrder - b.displayOrder).map((img, i) => ({ src: `${API_BASE_URL}/${img.imageUrl}`, alt: property.title, className: i === 0 ? "col-span-2 row-span-2" : (i === 3 ? "col-span-2" : "") }));
  if (galleryImages.length === 0) galleryImages.push({ src: "/rent/property-card.png", alt: "Placeholder", className: "col-span-2 row-span-2" });
  
  const quickFacts = [
    { label: `${property.area || 0} m²`, icon: "/homepage/properties/icons/size.svg" },
    { label: `${property.bedrooms || 0} Bedrooms`, icon: "/homepage/properties/icons/bed.svg" },
    { label: `${property.bathrooms || 0} Bathrooms`, icon: "/homepage/properties/icons/bath.svg" },
  ];

  const priceDetails: DetailRow[] = [
    ["Price:", `${property.price.toLocaleString()} ${property.currency}`],
    ["Status:", property.status === 1 ? "Available" : property.status === 2 ? "Reserved" : "Sold"],
  ];

  const locationDetails: DetailRow[] = [
    ["City:", property.address?.city || "Unknown"],
    ["Area:", property.address?.area || "Unknown"],
    ["Street:", property.address?.street || "Unknown"],
  ];

  return (
    <main className="overflow-hidden bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <section className="px-5 pb-12 pt-6 lg:px-20 lg:pb-4 lg:pt-14">
        <div className="mx-auto w-full max-w-[1282px]">
          <ScrollAnimation delay={0}>
            <PropertyHeader property={property} />
          </ScrollAnimation>

          <div className="mt-5 min-w-0 lg:mt-[22px]">
            <ScrollAnimation delay={0} className="min-w-0">
              <PropertyImageGallery images={galleryImages} />
              <QuickFacts facts={quickFacts} />
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.1}>
            <DescriptionSection text={property.description} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <DetailsCards prices={priceDetails} location={locationDetails} />
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.1}>
            <AmenitiesSection sections={property.sections || []} />
          </ScrollAnimation>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="bg-[#f7f9f8] px-5 py-12 sm:px-8 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-10 text-center">
            <h2 className="text-[28px] font-semibold text-[#183c2f] sm:text-[32px]">Interested in this Property?</h2>
            <p className="mt-4 text-[#667c74]">Send us a message and our sales team will get back to you shortly.</p>
          </div>
          <ContactForm defaultSubject={`Inquiry for: ${property.title} (${property.propertyNumber})`} />
        </div>
      </section>
    </main>
  );
}

function PropertyHeader({ property }: { property: PropertyBuying }) {
  return (
    <header>
      <nav className="flex items-center gap-1 text-[14px] leading-6 text-[#b3b3b3] lg:text-[20px] lg:leading-[30px]">
        <span className="relative grid size-5 place-items-center lg:size-6">
          <Image src="/single-property/icon-home.svg" alt="" fill sizes="24px" className="object-contain" />
        </span>
        <span>Home&gt;Buy Properties &gt;</span>
        <span className="text-[#292d32]">Property Details</span>
      </nav>

      <div className="mt-4 lg:mt-6">
        <h1 className="text-[16px] font-semibold leading-6 text-[#183c2f] lg:text-[36px] lg:font-medium lg:leading-[49px]">
          {property.title}
        </h1>
        <p className="mt-2 flex items-center gap-1 text-[12px] leading-6 text-[#b3b3b3] lg:text-[16px]">
          <Image src="/homepage/properties/icons/location.svg" alt="" width={24} height={24} className="size-6" />
          <span className="truncate">{[property.address?.street, property.address?.area, property.address?.city, property.address?.country].filter(Boolean).join(", ")}</span>
        </p>
      </div>
    </header>
  );
}

function QuickFacts({ facts }: { facts: QuickFact[] }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] leading-4 text-[#656566] lg:text-[14px]">
      {facts.map((fact) => (
        <span key={fact.label} className="inline-flex items-center gap-2">
          <Image src={fact.icon} alt="" width={16} height={16} className="size-4" />
          {fact.label}
        </span>
      ))}
    </div>
  );
}

function DescriptionSection({ text }: { text: string }) {
  return (
    <section className="mt-8 lg:mt-10">
      <SectionTitle>Description</SectionTitle>
      <p className="mt-[15px] max-w-[954px] text-[14px] leading-[1.9] text-[#656566] lg:text-[16px] lg:leading-[23px]">
        {text || "No description provided."}
      </p>
    </section>
  );
}

function DetailsCards({ prices, location }: { prices: DetailRow[]; location: DetailRow[] }) {
  return (
    <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.05fr)]">
      <InfoCard title="PRICE DETAILS" icon="/billing/icons/cash.svg" rows={prices} />
      <InfoCard title="Location" icon="/billing/icons/location.svg" rows={location} />
    </section>
  );
}

function InfoCard({ title, icon, rows }: { title: string; icon: string; rows: string[][] }) {
  return (
    <article className="rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase leading-4 tracking-[0.05em] text-[#183c2f]">
        <Image src={icon} alt="" width={22} height={20} className="max-h-5 w-5 object-contain" />
        {title}
      </h2>
      <dl className="mt-4 grid gap-3 text-[14px] leading-[22px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <dt className="text-[#183c2f]">{label}</dt>
            <dd className="whitespace-nowrap font-medium text-[#101d28]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function AmenitiesSection({ sections }: { sections: PropertyBuyingSection[] }) {
  return (
    <section className="mt-7 rounded-lg border border-[#dfe8e4] bg-white p-[25px] shadow-[0_4px_10px_rgba(175,132,255,0.03)]">
      <div className="flex items-center gap-2">
        <Image src="/icons/amenities/amenities-title.svg" alt="" width={20} height={20} className="object-contain" />
        <SectionTitle>Amenities & Features</SectionTitle>
      </div>
      <div className="mt-6 grid gap-8 lg:gap-10">
        {sections?.map((section) => (
          <div key={section.categoryId}>
            <h3 className="inline-flex min-h-10 items-center rounded bg-[#f5f7f6] px-3 text-[14px] font-medium leading-6 text-[#183c2f] lg:text-[16px]">
              {section.categoryName}
            </h3>
            <ul className="mt-4 grid gap-x-4 gap-y-4 text-[14px] leading-5 text-[#656566] lg:grid-cols-4">
              {section.items?.map((item) => (
                <li key={item.itemId} className="flex items-center gap-3">
                  <span className="size-2.5 shrink-0 rounded-full bg-[#cfb072]" />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[20px] font-semibold leading-7 text-[#101d28]">{children}</h2>;
}
