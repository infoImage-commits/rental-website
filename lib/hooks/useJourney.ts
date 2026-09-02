import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  JourneyItem,
  JourneysQuery,
  JourneyRequest,
  JourneyFormDataRequest,
  JourneyApiResponse,
} from "@/lib/types/journey";
import type { PaginatedResponse } from "@/lib/types/contact";

const JOURNEYS_KEY = "journeys";

// 1. Paginated Journey list
export function useJourneys(query: JourneysQuery) {
  return useQuery({
    queryKey: [JOURNEYS_KEY, query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        JourneyApiResponse<PaginatedResponse<JourneyItem>>
      >("/api/journeys", { params: query });
      return data.data as PaginatedResponse<JourneyItem>;
    },
    staleTime: 30 * 1000,
  });
}

// 1b. Single Journey details
export function useJourneyById(id: string) {
  return useQuery({
    queryKey: [JOURNEYS_KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<JourneyApiResponse<JourneyItem>>(
        `/api/journeys/${id}`
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

// 2. Create Journey
export function useCreateJourney() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: JourneyFormDataRequest) => {
      const { data } = await axiosInstance.post<JourneyApiResponse>(
        "/api/journeys",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [JOURNEYS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 3. Update Journey
export function useUpdateJourney() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: JourneyFormDataRequest;
    }) => {
      const { data } = await axiosInstance.put<JourneyApiResponse>(
        `/api/journeys/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [JOURNEYS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 4. Delete Journey
export function useDeleteJourney() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<JourneyApiResponse>(
        `/api/journeys/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [JOURNEYS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
