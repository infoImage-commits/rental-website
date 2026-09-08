import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  TransferBookingRequest,
  BookingApiResponse,
  RentBookingRequest,
  RentBookingApiResponse,
  AdminCreatePropertyBookingRequest,
  AdminCreatePropertyBookingResponse,
  AdminBookingApiResponse,
  AdminBookingDetails,
  AdminBookingListItem,
  AdminBookingListQuery,
  InHouseBookingsData,
  InHouseBookingsQuery,
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

export function useCreateAdminPropertyBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AdminCreatePropertyBookingRequest) => {
      const { data } = await axiosInstance.post<
        AdminBookingApiResponse<AdminCreatePropertyBookingResponse> | AdminCreatePropertyBookingResponse
      >("/api/property-bookings/admin", payload);

      if ("isSuccess" in data) {
        if (!data.isSuccess || !data.data) {
          throw new Error(data.errors?.[0] || data.message || "Could not create admin booking.");
        }

        return data.data;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "admin", "property"] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "in-house"] });
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

export function useInHouseBookings(params: InHouseBookingsQuery = {}) {
  return useQuery({
    queryKey: [BOOKING_KEY, "in-house", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AdminBookingApiResponse<InHouseBookingsData>>(
        "/api/bookings/in-house",
        {
          params: {
            from: params.from || undefined,
            to: params.to || undefined,
          },
        }
      );
      return data.data;
    },
    enabled: Boolean(params.from && params.to),
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

export function useMarkPropertyBookingAsPaidAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const { data } = await axiosInstance.post<AdminBookingApiResponse<AdminBookingDetails>>(
        `/api/property-bookings/${bookingId}/mark-as-paid-all`,
        ""
      );

      if (!data.isSuccess || !data.data) {
        throw new Error(data.errors?.[0] || data.message || "Could not mark this booking as fully paid.");
      }

      return data;
    },
    onSuccess: (_data, bookingId) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "admin", "property"] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_KEY, "admin", "property", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["payments", "booking", bookingId] });
    },
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
