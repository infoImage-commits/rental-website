import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import { LANDMARK_ATTRIBUTE_GROUP_ID } from "@/lib/constants/landmarks";
import type {
  AttributeGroupItem,
  AttributeGroupItemApiResponse,
  AttributeGroupItemRequest,
} from "@/lib/types/attributeGroupItem";
import {
  adminTranslationLocales,
  buildTranslationFromRecords,
  type LocaleRecord,
} from "@/lib/i18n/adminTranslations";

const KEY = "attribute-group-items";

export function useAttributeGroupItemsByGroup(attributeGroupId: string = LANDMARK_ATTRIBUTE_GROUP_ID) {
  return useQuery({
    queryKey: [KEY, "group", attributeGroupId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AttributeGroupItemApiResponse<AttributeGroupItem[]>>(
        `/api/attribute-group-items/group/${attributeGroupId}`
      );
      return data.data ?? [];
    },
    enabled: Boolean(attributeGroupId),
    staleTime: 30 * 1000,
  });
}

export function useLandmarks() {
  return useAttributeGroupItemsByGroup(LANDMARK_ATTRIBUTE_GROUP_ID);
}

export function useAttributeGroupItemById(id: string, locale?: string) {
  return useQuery({
    queryKey: [KEY, id, locale],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AttributeGroupItemApiResponse<AttributeGroupItem>>(
        `/api/attribute-group-items/${id}`,
        locale ? { headers: { "Accept-Language": locale, "X-Locale": locale } } : undefined
      );
      return data.data;
    },
    enabled: Boolean(id),
    staleTime: 30 * 1000,
  });
}

export function useAttributeGroupItemTranslations(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [KEY, id, "translations"],
    queryFn: async () => {
      const entries = await Promise.all(
        adminTranslationLocales.map(async (locale) => {
          const { data } = await axiosInstance.get<AttributeGroupItemApiResponse<AttributeGroupItem>>(
            `/api/attribute-group-items/${id}`,
            { headers: { "Accept-Language": locale, "X-Locale": locale } }
          );
          if (!data.data) throw new Error(`Attribute group item ${id} did not load for ${locale}`);
          return [locale, data.data] as const;
        })
      );
      const records = Object.fromEntries(entries) as LocaleRecord<AttributeGroupItem>;
      return {
        records,
        key: buildTranslationFromRecords(records, (record) => record.key),
        value: buildTranslationFromRecords(records, (record) => record.value),
        attributeGroupId: records.en.attributeGroupId,
        displayOrder: records.en.displayOrder,
      };
    },
    enabled: Boolean(id && enabled),
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useCreateAttributeGroupItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AttributeGroupItemRequest) => {
      const { data } = await axiosInstance.post<AttributeGroupItemApiResponse<AttributeGroupItem>>(
        "/api/attribute-group-items",
        {
          ...payload,
          attributeGroupId: payload.attributeGroupId || LANDMARK_ATTRIBUTE_GROUP_ID,
        }
      );
      return data;
    },
    onSuccess: (_data, payload) => {
      const attributeGroupId = payload.attributeGroupId || LANDMARK_ATTRIBUTE_GROUP_ID;
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, "group", attributeGroupId] });
    },
  });
}

export function useUpdateAttributeGroupItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: AttributeGroupItemRequest }) => {
      const { data } = await axiosInstance.put<AttributeGroupItemApiResponse<AttributeGroupItem>>(
        `/api/attribute-group-items/${id}`,
        {
          key: payload.key,
          value: payload.value,
          displayOrder: payload.displayOrder ?? 0,
        }
      );
      return data;
    },
    onSuccess: (_data, { payload }) => {
      const attributeGroupId = payload.attributeGroupId || LANDMARK_ATTRIBUTE_GROUP_ID;
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, "group", attributeGroupId] });
    },
  });
}

export function useDeleteAttributeGroupItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<AttributeGroupItemApiResponse<boolean>>(
        `/api/attribute-group-items/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, "group", LANDMARK_ATTRIBUTE_GROUP_ID] });
    },
  });
}
