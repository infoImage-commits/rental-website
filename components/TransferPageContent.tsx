"use client";

import Image from "next/image";
import Link from "next/link";
import { useJourneys } from "@/lib/hooks/useJourney";
import { slugify } from "@/lib/utils/slugify";
import { API_BASE_URL } from "@/lib/api/config";

function resolveImageUrl(url: string): string {
  if (!url || url.trim() === "") return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http")) return trimmed;
  return `${API_BASE_URL}/${trimmed.replace(/^\//, "")}`;
}

export default function TransferPageContent() {
  const { data, isLoading, isError } = useJourneys({ pageSize: 100, isActive: true });
  const journeys = data?.items || [];

  return (
    <main className="overflow-hidden bg-white font-[var(--font-poppins)] text-[#183c2f]">
      <TransferHero />
      
      <section className="px-5 pt-5 text-center lg:px-20 lg:pt-[47px]">
        <p className="text-[14px] font-medium leading-6 text-[#656566] lg:text-[20px] lg:leading-9">
          Home &gt; Transfer Journeys
        </p>
        <h1 className="mt-2 text-[16px] font-semibold leading-7 text-[#183c2f] lg:mt-4 lg:text-[36px] lg:leading-[60px]">
          Available Transfers
        </h1>
      </section>

      <section className="px-5 pb-12 pt-5 lg:px-20 lg:pb-20 lg:pt-[50px]">
        <div className="mx-auto max-w-[335px] lg:max-w-[1280px]">
          {isLoading && <p className="text-center text-gray-500">Loading transfers...</p>}
          {isError && <p className="text-center text-red-500">Failed to load transfers.</p>}
          {!isLoading && !isError && journeys.length === 0 && (
            <p className="text-center text-gray-500">No transfers currently available.</p>
          )}

          {!isLoading && !isError && journeys.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {journeys.map((journey) => (
                <article
                  key={journey.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full bg-[#f8fafc]">
                    {journey.imageUrl && journey.imageUrl.trim() !== "" ? (
                      <Image
                        src={resolveImageUrl(journey.imageUrl)}
                        alt={journey.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#f5f7f6] text-[#183c2f]/50">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                      <span className="flex items-center justify-center rounded-lg bg-[#d59e52] px-3 py-1 text-[12px] font-semibold text-white">
                        $ {journey.basePrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col p-5">
                    <h2 className="text-[18px] font-semibold text-[#183c2f]">
                      {journey.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-[14px] text-[#656566]">
                      {journey.description}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 text-[14px] font-medium text-[#183c2f]">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">From:</span>
                        <span>{journey.fromLocationName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">To:</span>
                        <span>{journey.toLocationName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Duration:</span>
                        <span>{journey.estimatedDurationMinutes} mins</span>
                      </div>
                    </div>

                    <Link
                      href={`/transfer/${slugify(journey.name) || journey.id}`}
                      className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#2e6f57] text-[16px] font-semibold text-white transition hover:bg-[#255f49]"
                    >
                      Book Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function TransferHero() {
  return (
    <section className="relative w-full h-[280px] lg:h-[420px] overflow-hidden">
      <Image
        src="/transfer/heroTransfer.png"
        alt="Transfer Hero"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[3px] text-white/70 lg:text-[14px]">
          Airport · City · Port Transfers
        </p>
        <h1 className="max-w-[600px] text-[32px] font-bold leading-tight text-white lg:text-[58px] lg:leading-[1.1]">
          Seamless Airport Transfers
        </h1>
        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-white/80 lg:text-[18px]">
          Book your private, comfortable, and reliable transfer across our destinations. Get from A to B with ease.
        </p>
      </div>
    </section>
  );
}
