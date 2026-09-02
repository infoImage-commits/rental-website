"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForgotPassword } from "@/lib/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { mutate: sendOtp, isPending, isSuccess, isError, error, reset } =
    useForgotPassword();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset();
    sendOtp({ email });
  }

  function getErrorMessage(): string {
    if (!error) return "";
    const axiosError = error as {
      response?: { data?: { message?: string } };
    };
    return (
      axiosError.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }

  return (
    <div className="grid min-h-screen place-items-center px-5 py-10 font-[var(--font-poppins)]">
      <div className="w-full max-w-[430px] rounded-3xl border border-[#dfe8e4] bg-white p-6 shadow-[0_24px_70px_rgba(31,77,61,0.12)] lg:p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo-green.png"
            alt="Hurghada Vacation Homes"
            width={140}
            height={80}
            className="h-20 w-auto lg:h-[100px] object-contain"
            priority
            unoptimized
          />
        </div>

        {!isSuccess ? (
          <>
            {/* Heading */}
            <div className="mt-8 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
                Admin Portal
              </p>
              <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#183c2f]">
                Forgot Password?
              </h1>
              <p className="mt-3 text-[14px] leading-6 text-[#667c74]">
                Enter your email and we&apos;ll send you an OTP code to reset your password.
              </p>
            </div>

            {/* Error */}
            {isError && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#dc2626]">
                <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getErrorMessage()}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
              <label className="block">
                <span className="text-[14px] font-medium text-[#183c2f]">
                  Email address
                </span>
                <input
                  id="fp-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={isPending}
                  className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 disabled:opacity-50"
                />
              </label>

              <button
                id="fp-submit-btn"
                type="submit"
                disabled={isPending || !email}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(31,77,61,0.18)] transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP Code"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#667c74]">
              Remembered it?{" "}
              <Link
                href="/admin/login"
                className="font-medium text-[#2e6f57] transition hover:text-[#255f49] hover:underline"
              >
                Back to login
              </Link>
            </p>
          </>
        ) : (
          /* ── Success state ── */
          <div className="mt-8 text-center">
            {/* Green check circle */}
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f5f7f6] ring-8 ring-[#f5f7f6]">
              <svg className="size-7 text-[#2e6f57]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="mt-5 text-[22px] font-semibold text-[#183c2f]">
              Check your email
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-[#667c74]">
              If <span className="font-medium text-[#183c2f]">{email}</span> is registered, an OTP code has been sent. Check your inbox and proceed below.
            </p>

            <button
              id="fp-go-reset-btn"
              type="button"
              onClick={() =>
                router.push(
                  `/admin/reset-password?email=${encodeURIComponent(email)}`
                )
              }
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(31,77,61,0.18)] transition hover:bg-[#255f49]"
            >
              Enter OTP &amp; Reset Password
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setEmail("");
              }}
              className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-[#dfe8e4] text-[14px] font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57]"
            >
              Try a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
