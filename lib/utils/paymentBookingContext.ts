export type PaymentBookingKind = "rent" | "transfer" | "buy";

export interface PaymentBookingContext {
  kind: PaymentBookingKind;
  bookingId?: string;
  bookingNumber?: string;
  title?: string;
  propertyId?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  journeyId?: string;
  journeyName?: string;
  pickupDate?: string;
  pickupTime?: string;
  passengers?: number;
  buyingId?: string;
}

export const PAYMENT_BOOKING_CONTEXT_KEY = "payment_booking_context";

export function savePaymentBookingContext(context: PaymentBookingContext) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAYMENT_BOOKING_CONTEXT_KEY, JSON.stringify(context));
}

export function readPaymentBookingContext(): PaymentBookingContext | null {
  if (typeof window === "undefined") return null;

  const rawContext = localStorage.getItem(PAYMENT_BOOKING_CONTEXT_KEY);
  if (!rawContext) return null;

  try {
    const parsed = JSON.parse(rawContext) as PaymentBookingContext;
    if (parsed.kind === "rent" || parsed.kind === "transfer" || parsed.kind === "buy") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function clearPaymentBookingContext() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PAYMENT_BOOKING_CONTEXT_KEY);
}
