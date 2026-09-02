import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CreatePaypalOrderRequest {
  bookingId: string;
  bookingExtensionId: string | null;
}

export interface CreatePaypalOrderResponse {
  orderId: string;
  approvalUrl: string;
}

export interface CapturePaymentData {
  bookingId?: string;
  bookingExtensionId?: string | null;
  bookingNumber: string;
  bookingType?: string;
  bookingCategory?: string;
  type?: string | number;
  paymentType?: string | number;
  paymentTypeName?: string;
  paymentStatus: number;
  paymentStatusName: string;
  amount: number;
  currency: string;
  transactionId: string;
  message: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  pickupDate?: string;
  pickupTime?: string;
  passengers?: number;
  buyingId?: string;
  propertyBuyingName?: string;
}

export interface PaymentApiResponse<T = CapturePaymentData> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

export interface BookingPayment {
  id: string;
  bookingId: string;
  bookingExtensionId: string | null;
  amount: number;
  currency: string;
  provider: number;
  providerName: string;
  paymentType: number;
  paymentTypeName: string;
  payPalOrderId: string | null;
  payPalCaptureId: string | null;
  transactionId: string | null;
  payerEmail: string | null;
  status: number;
  statusName: string;
  failureReason: string | null;
  createdAtUtc: string;
  paidAt: string | null;
  refundedAt: string | null;
}

// ── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Step 1b: After booking is created, create a PayPal order.
 * Returns { orderId, approvalUrl } — redirect user to approvalUrl.
 */
export function useCreatePaypalOrder() {
  return useMutation({
    mutationFn: async (payload: CreatePaypalOrderRequest) => {
      const { data } = await axiosInstance.post<{ orderId: string; approvalUrl: string }>(
        "/api/payments/paypal/create-order",
        payload
      );
      return data;
    },
  });
}

export function useBookingPayments(bookingId: string) {
  return useQuery({
    queryKey: ["payments", "booking", bookingId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaymentApiResponse<BookingPayment[]>>(
        `/api/payments/booking/${bookingId}`
      );
      return data.data || [];
    },
    enabled: !!bookingId,
    staleTime: 30 * 1000,
  });
}

/**
 * Step 2: After PayPal redirects to /payment/success?token=ORDER_ID,
 * call this with the token to capture the payment.
 */
export function useCapturePaypalPayment() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await axiosInstance.post<PaymentApiResponse>(
        "/api/payments/paypal/capture",
        "",
        {
          params: { orderId },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return data;
    },
  });
}

/**
 * Fallback: If capture fails or user cancels, call this to notify the backend.
 */
export function useCancelPayment() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await axiosInstance.post("/api/payments/cancel", { orderId });
      return data;
    },
  });
}
