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
import {
  adminTranslationLocales,
  buildTranslationFromRecords,
  type LocaleRecord,
} from "@/lib/i18n/adminTranslations";

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
export function useJourneyById(id: string, locale?: string) {
  return useQuery({
    queryKey: [JOURNEYS_KEY, id, locale],
    queryFn: async () => {
      const { data } = await axiosInstance.get<JourneyApiResponse<JourneyItem>>(
        `/api/journeys/${id}`,
        locale ? { headers: { "Accept-Language": locale, "X-Locale": locale } } : undefined
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useJourneyTranslations(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [JOURNEYS_KEY, id, "translations"],
    queryFn: async () => {
      const entries = await Promise.all(
        adminTranslationLocales.map(async (locale) => {
          const { data } = await axiosInstance.get<JourneyApiResponse<JourneyItem>>(
            `/api/journeys/${id}`,
            { headers: { "Accept-Language": locale, "X-Locale": locale } }
          );
          if (!data.data) throw new Error(`Journey ${id} did not load for ${locale}`);
          return [locale, data.data] as const;
        })
      );
      const records = Object.fromEntries(entries) as LocaleRecord<JourneyItem>;
      return {
        records,
        name: buildTranslationFromRecords(records, (record) => record.name),
        description: buildTranslationFromRecords(records, (record) => record.description),
        fromLocationId: records.en.fromLocationId,
        toLocationId: records.en.toLocationId,
        basePrice: records.en.basePrice,
        estimatedDurationMinutes: records.en.estimatedDurationMinutes,
        isActive: records.en.isActive,
      };
    },
    enabled: Boolean(id && enabled),
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
