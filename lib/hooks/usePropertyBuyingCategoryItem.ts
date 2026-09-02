import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  PropertyBuyingCategoryItem,
  PropertyBuyingCategoryItemRequest,
  PropertyBuyingCategoryApiResponse,
} from "@/lib/types/propertyBuyingCategory";

const KEY = "property-buying-category-items";
const CATEGORIES_KEY = "property-buying-categories";

// ── 1. List all items ────────────────────────────────────────────────────────
export function usePropertyBuyingCategoryItems() {
  return useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyBuyingCategoryApiResponse<PropertyBuyingCategoryItem[]>>(
        "/api/property-buying/category-items",
        { params: { onlyActive: false } }
      );
      return data.data ?? [];
    },
    staleTime: 30 * 1000,
  });
}

// ── 2. Get items by category ID ─────────────────────────────────────────────
export function usePropertyBuyingCategoryItemsByCategory(categoryId: string) {
  return useQuery({
    queryKey: [KEY, "category", categoryId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyBuyingCategoryApiResponse<PropertyBuyingCategoryItem[]>>(
        `/api/property-buying/category-items/category/${categoryId}`,
        { params: { onlyActive: false } }
      );
      return data.data ?? [];
    },
    enabled: !!categoryId,
    staleTime: 30 * 1000,
  });
}

// ── 3. Single item by ID ─────────────────────────────────────────────────────
export function usePropertyBuyingCategoryItemById(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyBuyingCategoryApiResponse<PropertyBuyingCategoryItem>>(
        `/api/property-buying/category-items/${id}`
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

// ── 4. Create ─────────────────────────────────────────────────────────────────
export function useCreatePropertyBuyingCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyBuyingCategoryItemRequest) => {
      const { data } = await axiosInstance.post<PropertyBuyingCategoryApiResponse>(
        "/api/property-buying/category-items",
        payload
      );
      return data;
    },
    onSuccess: (data, payload) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      if (payload.propertyBuyingCategoryId) {
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, payload.propertyBuyingCategoryId] });
      }
    },
    onError: (error: any) => {
    },
  });
}

// ── 5. Update ─────────────────────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyBuyingCategoryItemRequest }) => {
      const { data } = await axiosInstance.put<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/category-items/${id}`,
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      // We invalidate everything related to categories to make sure drill-downs are updated
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 6. Delete ─────────────────────────────────────────────────────────────────
export function useDeletePropertyBuyingCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<PropertyBuyingCategoryApiResponse<boolean>>(
        `/api/property-buying/category-items/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 7. Update display order ───────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategoryItemOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, displayOrder }: { id: string; displayOrder: number }) => {
      const { data } = await axiosInstance.put<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/category-items/${id}/display-order`,
        { displayOrder }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 8. Update status ──────────────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategoryItemStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data } = await axiosInstance.put<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/category-items/${id}/status`,
        { isActive }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
