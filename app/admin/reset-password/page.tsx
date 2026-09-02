"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useResetPassword } from "@/lib/hooks/useAuth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(() => searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientError, setClientError] = useState("");

  const { mutate: resetPassword, isPending, isError, error, reset } =
    useResetPassword();

  function getErrorMessage(): string {
    if (!error) return "";
    const axiosError = error as {
      response?: { data?: { message?: string; errors?: string[] } };
    };
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.errors?.join(", ") ||
      "Something went wrong. Please try again."
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setClientError("");
    reset();

    if (newPassword !== confirmPassword) {
      setClientError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setClientError("Password must be at least 6 characters.");
      return;
    }

    resetPassword({ email, code, newPassword, confirmPassword });
  }

  const displayError = clientError || (isError ? getErrorMessage() : "");

  return (
    <div className="grid min-h-screen place-items-center px-5 py-10 font-[var(--font-poppins)]">
      <div className="w-full max-w-[460px] rounded-3xl border border-[#dfe8e4] bg-white p-6 shadow-[0_24px_70px_rgba(31,77,61,0.12)] lg:p-8">
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

        {/* Heading */}
        <div className="mt-8 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Admin Portal
          </p>
          <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#183c2f]">
            Reset Password
          </h1>
          <p className="mt-3 text-[14px] leading-6 text-[#667c74]">
            Enter the OTP sent to your email and choose a new password.
          </p>
        </div>

        {/* Error */}
        {displayError && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#dc2626]">
            <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {displayError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
          {/* Email */}
          <label className="block">
            <span className="text-[14px] font-medium text-[#183c2f]">
              Email address
            </span>
            <input
              id="rp-email"
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

          {/* OTP */}
          <label className="block">
            <span className="text-[14px] font-medium text-[#183c2f]">
              OTP Code
            </span>
            <input
              id="rp-otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              placeholder="e.g. 596129"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              autoComplete="one-time-code"
              required
              disabled={isPending}
              className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[15px] font-semibold tracking-[0.12em] text-[#183c2f] outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 disabled:opacity-50"
            />
          </label>

          {/* New password */}
          <label className="block">
            <span className="text-[14px] font-medium text-[#183c2f]">
              New Password
            </span>
            <div className="relative mt-2">
              <input
                id="rp-new-pw"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
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

          {/* Confirm password */}
          <label className="block">
            <span className="text-[14px] font-medium text-[#183c2f]">
              Confirm New Password
            </span>
            <input
              id="rp-confirm-pw"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              disabled={isPending}
              className="mt-2 h-12 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 disabled:opacity-50"
            />
          </label>

          {/* Passwords-match hint */}
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="-mt-1 text-[12px] text-[#dc2626]">
              Passwords do not match
            </p>
          )}

          {/* Submit */}
          <button
            id="rp-submit-btn"
            type="submit"
            disabled={
              isPending ||
              !email ||
              !code ||
              !newPassword ||
              !confirmPassword
            }
            className="mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-[#2e6f57] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(31,77,61,0.18)] transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[13px] text-[#667c74]">
          <Link
            href="/admin/forgot-password"
            className="font-medium text-[#2e6f57] transition hover:text-[#255f49] hover:underline"
          >
            Resend OTP
          </Link>
          <span className="h-3.5 w-px bg-[#dfe8e4]" />
          <Link
            href="/admin/login"
            className="font-medium text-[#2e6f57] transition hover:text-[#255f49] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
