import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  TransferBookingRequest,
  BookingApiResponse,
  RentBookingRequest,
  RentBookingApiResponse,
  AdminBookingApiResponse,
  AdminBookingDetails,
  AdminBookingListItem,
  AdminBookingListQuery,
  AdminTransferBooking,
  AdminTransferBookingListQuery,
  BookingExtensionRequest,
  BookingExtensionResponseData,
  PaginatedBookingResponse,
} from "@/lib/types/booking";

const BOOKING_KEY = "bookings";

export function useCreateTransferBooking() {
  return useMutation({
    mutationFn: async (payload: TransferBookingRequest) => {
      const { data } = await axiosInstance.post<BookingApiResponse>(
        "/api/bookings/transfer",
        payload
      );
      return data;
    },
  });
}

export function useCreateRentBooking() {
  return useMutation({
    mutationFn: async (payload: RentBookingRequest) => {
      const { data } = await axiosInstance.post<RentBookingApiResponse>(
        "/api/property-bookings",
        payload
      );
      return data;
    },
  });
}

export function useAdminPropertyBookings(params: AdminBookingListQuery = {}) {
  return useQuery({
    queryKey: [BOOKING_KEY, "admin", "property", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        AdminBookingApiResponse<PaginatedBookingResponse<AdminBookingListItem>>
      >("/api/property-bookings", {
        params: { PageNumber: 1, PageSize: 10, ...params },
      });
      return data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminPropertyBooking(id: string) {
  return useQuery({
    queryKey: [BOOKING_KEY, "admin", "property", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AdminBookingApiResponse<AdminBookingDetails>>(
        `/api/property-bookings/${id}`
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useCreateBookingExtension() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: BookingExtensionRequest;
    }) => {
      const { data } = await axiosInstance.post<AdminBookingApiResponse<BookingExtensionResponseData>>(
        `/api/bookings/${bookingId}/extensions`,
        payload
      );
      return data;
    },
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "admin", "property"] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "admin", "property", bookingId] });
    },
  });
}

export function useAdminTransferBookings(params: AdminTransferBookingListQuery = {}) {
  return useQuery({
    queryKey: [BOOKING_KEY, "admin", "transfer", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        AdminBookingApiResponse<PaginatedBookingResponse<AdminTransferBooking>>
      >("/api/bookings/transfer", {
        params: { pageNumber: 1, pageSize: 10, ...params },
      });
      return data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminTransferBooking(id: string) {
  return useQuery({
    queryKey: [BOOKING_KEY, "admin", "transfer", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AdminBookingApiResponse<AdminTransferBooking>>(
        `/api/bookings/transfer/${id}`
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}
