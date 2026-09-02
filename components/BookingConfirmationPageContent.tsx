import Link from "next/link";

const bookingDetails = [
  { label: "Booking ID", value: "RB-2026-1045" },
  { label: "Move-in Date", value: "15 September 2026", strong: true },
  {
    label: "Property",
    value: "Luxury Apartment 2 Bedrooms",
    helper: "New Cairo, 5th Settlement",
    smallMobile: true,
  },
  { label: "Lease Duration", value: "12 Months" },
];

export default function BookingConfirmationPageContent() {
  return (
    <main className="bg-white font-[var(--font-poppins)] text-[#404944]">
      <section className="px-5 pb-[42px] pt-[58px] lg:px-0 lg:pb-[37px] lg:pt-0">
        <div className="mx-auto flex w-full max-w-[335px] flex-col items-center lg:max-w-[700px]">
          <SuccessIcon />

          <h1 className="mt-[19.125px] text-center text-[24px] font-bold leading-[44px] tracking-[-0.03em] text-[#183c2f] lg:mt-6 lg:text-[36px]">
            Booking Confirmed!
          </h1>

          <div className="flex h-[87px] items-center justify-center lg:mt-2 lg:h-6">
            <p className="max-w-[228px] text-center text-[12px] leading-6 lg:max-w-none lg:text-[16px]">
              Your rental booking has been successfully completed.
            </p>
          </div>

          <DetailsCard />

          <Link
            href="/"
            className="mt-4 flex h-12 items-center justify-center rounded-lg border border-[#1F4D3D] px-[33px] text-center text-[14px] font-bold leading-5 text-[#183c2f] transition hover:bg-[#f5f7f6] lg:mt-12"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function DetailsCard() {
  return (
    <section className="mt-4 flex min-h-[442px] w-full flex-col gap-[25px] rounded-xl border border-[#bfc9c3] bg-white px-[17px] pb-[34px] pt-[49px] lg:mt-12 lg:min-h-[451px] lg:gap-8 lg:p-[49px]">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:gap-y-12">
        {bookingDetails.map((detail) => (
          <div key={detail.label} className="min-w-0">
            <dt className="text-[12px] font-medium leading-4 tracking-[0.02em] text-[#404944]">{detail.label}</dt>
            <dd
              className={`mt-2 break-words leading-6 ${
                detail.strong
                  ? "text-[12px] font-bold text-[#0b1c30] lg:text-[18px]"
                  : detail.smallMobile
                    ? "text-[12px] font-medium text-[#414847] lg:text-[18px]"
                  : "text-[14px] font-medium text-[#414847] lg:text-[18px]"
              }`}
            >
              {detail.value}
            </dd>
            {detail.helper && (
              <dd className="mt-2 whitespace-nowrap text-[10px] leading-5 text-[#404944] lg:whitespace-normal lg:text-[14px]">{detail.helper}</dd>
            )}
          </div>
        ))}
      </dl>

      <div className="h-px w-full bg-[#bfc9c3] opacity-50" />

      <div className="flex w-full items-start gap-4 rounded-lg bg-[#f5f7f6] p-6 lg:gap-6">
        <InfoIcon />
        <div className="min-w-0">
          <h2 className="text-[14px] font-bold leading-5 text-[#0b1c30]">What&apos;s Next?</h2>
          <p className="mt-2 text-[12px] leading-5 text-[#404944] lg:text-[14px]">
            Our agent will contact you within 24 hours to confirm your booking and provide further details.
          </p>
        </div>
      </div>
    </section>
  );
}

function SuccessIcon() {
  return (
    <div className="relative grid size-[153px] shrink-0 place-items-center lg:size-48" aria-hidden="true">
      <ConfettiPiece className="left-[29.13%] top-[19.13%] bg-[#ea9e93]" />
      <ConfettiPiece className="left-[59.13%] top-[14.14%] bg-[#6cf8bb]" />
      <ConfettiPiece className="left-[24.14%] top-[69.13%] bg-[#2e6f57]" />
      <ConfettiPiece className="left-[74.14%] top-[59.13%] bg-[#80bea6]" />
      <ConfettiPiece className="left-[79.13%] top-[29.14%] bg-[#d59e52]" />
      <ConfettiPiece className="left-[59.13%] top-[79.14%] bg-[#cfb072]" />

      <span className="absolute size-[102px] rounded-full bg-[#eff4ff] opacity-50 lg:size-32" />
      <span className="relative grid size-[76.5px] place-items-center rounded-full bg-[#eff4ff] lg:size-24">
        <span className="grid size-[51px] place-items-center rounded-full bg-[#1f4d3d] lg:size-16">
          <svg
            className="h-[12.777px] w-[17.319px] lg:h-[16.033px] lg:w-[21.733px]"
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.77 16.03 0 8.46l2.96-2.89 4.81 4.69L19.04 0 22 2.89 7.77 16.03Z"
              fill="white"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}

function ConfettiPiece({ className }: { className: string }) {
  return (
    <span
      className={`absolute size-[9.016px] rotate-45 opacity-60 lg:size-[11.314px] ${className}`}
    />
  );
}

function InfoIcon() {
  return (
    <svg
      className="mt-1 h-5 w-[17px] shrink-0 text-[#2e6f57]"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.5 0C3.82 0 0 3.58 0 8c0 2.3 1.04 4.38 2.69 5.84L1.7 20l5.09-4.11c.55.07 1.12.11 1.71.11 4.68 0 8.5-3.58 8.5-8s-3.82-8-8.5-8Zm-.9 5.2h1.8V7H7.6V5.2Zm0 3.2h1.8v5H7.6v-5Z"
        fill="currentColor"
      />
    </svg>
  );
}
