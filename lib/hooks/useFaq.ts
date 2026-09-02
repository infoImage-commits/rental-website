import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  FaqItem,
  FaqsQuery,
  CreateFaqRequest,
  UpdateFaqRequest,
  FaqApiResponse,
} from "@/lib/types/faq";
import type { PaginatedResponse } from "@/lib/types/contact";

const FAQS_KEY = "faqs";

// 1. Paginated FAQ list
export function useFaqs(query: FaqsQuery) {
  return useQuery({
    queryKey: [FAQS_KEY, query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        FaqApiResponse<PaginatedResponse<FaqItem>>
      >("/api/faqs", { params: query });
      return data.data as PaginatedResponse<FaqItem>;
    },
    staleTime: 30 * 1000,
  });
}

// 2. Create FAQ
export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateFaqRequest) => {
      const { data } = await axiosInstance.post<FaqApiResponse>("/api/faqs", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [FAQS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 3. Update FAQ (full replace via PUT)
export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateFaqRequest }) => {
      const { data } = await axiosInstance.put<FaqApiResponse>(
        `/api/faqs/${id}`,
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [FAQS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 4. Delete FAQ
export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<FaqApiResponse>(`/api/faqs/${id}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [FAQS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
