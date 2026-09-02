import Image from "next/image";
import Link from "next/link";

export default function AdminLoginContent() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="w-full max-w-[430px] rounded-3xl border border-[#dfe8e4] bg-white p-6 shadow-[0_24px_70px_rgba(31,77,61,0.12)] lg:p-8">
        <div className="flex justify-center">
          <Image src="/logo-green.png" alt="Hurghada Vacation Homes" width={140} height={80} className="h-20 w-auto lg:h-[100px] object-contain" priority unoptimized />
        </div>

        <div className="mt-8 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Admin Portal</p>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight text-[#183c2f]">Sign in to Dashboard</h1>
          <p className="mt-3 text-[14px] leading-6 text-[#667c74]">
            Use your admin credentials to manage rentals, bookings, payments, and content.
          </p>
        </div>

        <form className="mt-8 grid gap-4">
          <label className="block">
            <span className="text-[14px] font-medium leading-5 text-[#183c2f]">Email Address</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57]"
            />
          </label>

          <label className="block">
            <span className="text-[14px] font-medium leading-5 text-[#183c2f]">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57]"
            />
          </label>

          <Link
            href="/admin/dashboard"
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#2e6f57] text-[16px] font-semibold text-white transition hover:bg-[#255f49]"
          >
            Login
          </Link>
        </form>
      </section>
    </main>
  );
}
