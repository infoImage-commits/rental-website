"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCancelPayment } from "@/lib/hooks/usePayment";
import { clearPaymentBookingContext, readPaymentBookingContext } from "@/lib/utils/paymentBookingContext";
import Link from "next/link";

const retryHrefByKind = {
  rent: "/rent",
  transfer: "/transfer",
  buy: "/buy",
};

function getSavedRetryHref() {
  const savedContext = readPaymentBookingContext();
  return savedContext ? retryHrefByKind[savedContext.kind] : "/";
}

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate: cancelPayment } = useCancelPayment();
  const [notified, setNotified] = useState(!token);
  const [retryHref] = useState(getSavedRetryHref);

  useEffect(() => {
    if (token) {
      cancelPayment(token, {
        onSuccess: () => setNotified(true),
        onError: () => setNotified(true),
      });
    }

    localStorage.removeItem("paypal_order_id");
    clearPaymentBookingContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7f6] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#dfe8e4] bg-white p-8 shadow-[0_8px_32px_rgba(31,77,61,0.06)]">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-[#fef3c7]">
          <svg className="size-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        <h1 className="text-center text-[22px] font-bold text-[#183c2f]">Payment Cancelled</h1>
        <p className="mt-2 text-center text-[14px] text-[#667c74]">
          You cancelled the payment process. No charges have been made to your account.
        </p>

        {!notified && (
          <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#8a9a94]">
            <span className="size-3.5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#8a9a94]" />
            Notifying server…
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={retryHref}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#2e6f57] text-[14px] font-semibold text-white transition hover:bg-[#255f49]"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-full border border-[#dfe8e4] text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <PaymentCancelContent />
    </Suspense>
  );
}
