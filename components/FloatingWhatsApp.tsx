import { siteConfig } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${siteConfig.displayPhone}`}
      className="fixed bottom-7 right-7 z-[70] inline-flex items-center gap-[15px] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#25d366]/25"
    >
      <span className="inline-flex h-[50px] items-center justify-center whitespace-nowrap rounded-[10px] bg-white px-[18px] text-[14px] font-bold leading-none text-[#05385b] shadow-[0_8px_24px_rgba(17,35,52,0.16)]">
        {siteConfig.displayPhone}
      </span>
      <span className="grid size-16 place-items-center rounded-full bg-[#25d366] shadow-[0_10px_28px_rgba(37,211,102,0.28)]">
        <svg
          className="size-[38px]"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M24 8.4c-8.62 0-15.6 6.75-15.6 15.08 0 2.86.83 5.54 2.27 7.82L8.7 39.6l8.55-1.94A16 16 0 0 0 24 39.16c8.62 0 15.6-6.75 15.6-15.08S32.62 8.4 24 8.4Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3 17.15c-.35.78-.72 2.1-.18 3.95.78 2.66 3.15 5.58 5.95 7.3 2.18 1.34 4.1 1.68 5.42 1.45.93-.16 1.55-.72 1.88-1.3l.63-1.1c.24-.43.1-.98-.32-1.22l-3-1.74c-.4-.24-.92-.16-1.23.2l-.96 1.1c-.25.28-.66.35-.99.17-1.6-.85-2.86-2.04-3.76-3.53-.2-.33-.15-.76.12-1.02l1.05-1.02c.33-.32.38-.83.13-1.22l-1.84-2.86a.9.9 0 0 0-1.22-.3l-1.18.66c-.22.13-.4.3-.5.52Z"
            fill="white"
          />
        </svg>
      </span>
    </a>
  );
}
