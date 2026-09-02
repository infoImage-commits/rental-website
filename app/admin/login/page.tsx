"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "@/lib/hooks/useAuth";

function LoginForm() {
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const { mutate: login, isPending, isError, error, reset } = useLogin();
  const successMessage =
    searchParams.get("reset") === "success"
      ? "Password reset successfully. You can now log in."
      : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset();
    login({ emailOrUserName, password });
  }

  function getErrorMessage(): string {
    if (!error) return "";
    const axiosError = error as {
      response?: { data?: { message?: string; errors?: string[] } };
    };
    const apiMsg = axiosError.response?.data?.message;
    const apiErrors = axiosError.response?.data?.errors;
    if (apiMsg) return apiMsg;
    if (apiErrors?.length) return apiErrors.join(", ");
    return "Invalid credentials. Please try again.";
  }

  return (
    <div className="flex min-h-screen font-[var(--font-poppins)]">
      {/* ── Left panel — property image ───────────────────────────── */}
      <div className="relative hidden flex-col lg:flex lg:w-[52%]">
        {/* Property photo */}
        <Image
          src="/about/living-room.png"
          alt="Premium rental property"
          fill
          sizes="52vw"
          className="object-cover object-center"
          priority
        />

        {/* Dark green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f4d3d]/80 via-[#1b634f]/60 to-[#1b634f]/40" />

        {/* Content on top of overlay */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-10">
          {/* White logo */}
          <Link href="/" className="inline-flex">
            <Image
              src="/logo-white.png"
              alt="Hurghada Vacation Homes"
              width={140}
              height={80}
              className="h-20 w-auto lg:h-[90px] object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Bottom quote */}
          <div>
            <blockquote className="max-w-sm">
              <p className="text-[22px] font-semibold leading-[1.4] text-white">
                Manage Hurghada Vacation Homes bookings, listings, transfers, and content from one focused workspace.
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#d9a441]" />
                <cite className="text-[13px] font-medium not-italic text-white/70">
                  Made by <a href="https://tech-gear.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tech Gear Solutions</a>
                </cite>
              </footer>
            </blockquote>

          </div>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#f5f7f6] px-6 py-12 lg:px-14">
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
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

        <div className="w-full max-w-[420px]">
          {/* Desktop logo */}
          <div className="mb-8 hidden lg:block">
            <Image
              src="/logo-green.png"
              alt="Hurghada Vacation Homes"
              width={140}
              height={80}
              className="h-20 w-auto lg:h-[100px] object-contain"
              unoptimized
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d9a441]">
              Admin Portal
            </p>
            <h1 className="mt-2 text-[28px] font-semibold leading-tight text-[#183c2f]">
              Sign in to Dashboard
            </h1>
            <p className="mt-2 text-[14px] leading-6 text-[#667c74]">
              Use your admin credentials to manage rentals, bookings, and content.
            </p>
          </div>

          {/* Success banner */}
          {successMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#c0c8c6] bg-[#f5f7f6] px-4 py-3 text-[13px] text-[#255f49]">
              <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Error banner */}
          {isError && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#dc2626]">
              <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getErrorMessage()}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
            {/* Email / Username */}
            <label className="block">
              <span className="text-[14px] font-medium text-[#183c2f]">
                Email or Username
              </span>
              <input
                id="login-email"
                type="text"
                placeholder="Email or username"
                value={emailOrUserName}
                onChange={(e) => setEmailOrUserName(e.target.value)}
                autoComplete="username"
                required
                disabled={isPending}
                className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 disabled:opacity-50"
              />
            </label>

            {/* Password */}
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#183c2f]">
                  Password
                </span>
                <Link
                  href="/admin/forgot-password"
                  className="text-[13px] text-[#2e6f57] transition hover:text-[#255f49] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-2">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={isPending}
                  className="h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 pr-12 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 disabled:opacity-50"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9a94] transition hover:text-[#183c2f]"
                >
                  {showPassword ? (
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isPending || !emailOrUserName || !password}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(31,77,61,0.18)] transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
