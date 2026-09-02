import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { ContactMessage, ContactMessagesQuery, PaginatedResponse, ContactUsResponse } from "../types/contact";

export interface SubmitContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// 0. Submit a contact message (public — no auth required)
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (payload: SubmitContactPayload) => {
      const response = await axiosInstance.post<ContactUsResponse>(
        "/api/contact-us",
        payload
      );
      return response.data;
    },
  });
}

// 1. Get paginated list of contact messages
export function useContactMessages(query: ContactMessagesQuery) {
  return useQuery({
    queryKey: ["contact-messages", query],
    queryFn: async () => {
      const response = await axiosInstance.get<ContactUsResponse>("/api/contact-us", {
        params: query,
      });
      return response.data.data as PaginatedResponse<ContactMessage>;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

// 2. Get contact message by ID
export function useContactMessage(id: string) {
  return useQuery({
    queryKey: ["contact-messages", id],
    queryFn: async () => {
      const response = await axiosInstance.get<ContactUsResponse>(`/api/contact-us/${id}`);
      return response.data.data as ContactMessage;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

// 3. Mark contact message as read
export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch<ContactUsResponse>(`/api/contact-us/${id}/mark-as-read`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
  });
}

// 4. Delete contact message
export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<ContactUsResponse>(`/api/contact-us/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
    onError: (error: any) => {
    },
  });
}
