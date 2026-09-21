import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type { CategoryItem, CategoryFormDataRequest, CategoryApiResponse } from "@/lib/types/category";
import {
  adminTranslationLocales,
  buildTranslationFromRecords,
  type LocaleRecord,
} from "@/lib/i18n/adminTranslations";

const CATEGORIES_KEY = "categories";

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CategoryApiResponse<CategoryItem[]>>("/api/Categories");
      return data.data || [];
    },
    staleTime: 30 * 1000,
  });
}

export function useCategory(id: string, locale?: string) {
  return useQuery({
    queryKey: [CATEGORIES_KEY, id, locale],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CategoryApiResponse<CategoryItem>>(
        `/api/Categories/${id}`,
        locale ? { headers: { "Accept-Language": locale, "X-Locale": locale } } : undefined
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useCategoryTranslations(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [CATEGORIES_KEY, id, "translations"],
    queryFn: async () => {
      const entries = await Promise.all(
        adminTranslationLocales.map(async (locale) => {
          const { data } = await axiosInstance.get<CategoryApiResponse<CategoryItem>>(
            `/api/Categories/${id}`,
            { headers: { "Accept-Language": locale, "X-Locale": locale } }
          );
          if (!data.data) throw new Error(`Category ${id} did not load for ${locale}`);
          return [locale, data.data] as const;
        })
      );
      const records = Object.fromEntries(entries) as LocaleRecord<CategoryItem>;
      return {
        records,
        name: buildTranslationFromRecords(records, (record) => record.name),
      };
    },
    enabled: Boolean(id && enabled),
    staleTime: 30 * 1000,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CategoryFormDataRequest) => {
      const { data } = await axiosInstance.post<CategoryApiResponse>("/api/Categories", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: CategoryFormDataRequest }) => {
      const { data } = await axiosInstance.put<CategoryApiResponse>(`/api/Categories/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<CategoryApiResponse<boolean>>(`/api/Categories/${id}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
