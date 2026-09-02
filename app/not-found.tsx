import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-white px-5 py-16 font-[var(--font-poppins)]">
      <section className="max-w-[620px] text-center">
        <p className="text-[14px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">404</p>
        <h1 className="mt-4 text-[36px] font-semibold leading-tight text-[#183c2f] lg:text-[52px]">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-7 text-[#667c74]">
          The page you are looking for may have moved, or the address may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#2e6f57] px-8 text-[16px] font-semibold text-white transition hover:bg-[#255f49]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
