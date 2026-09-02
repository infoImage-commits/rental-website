import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  PropertyCategoryItem,
  PropertyCategoryItemRequest,
  PropertyCategoryApiResponse,
} from "@/lib/types/propertyCategory";

const KEY = "property-category-items";
const CATEGORIES_KEY = "property-categories";

// ── 1. List all items ────────────────────────────────────────────────────────
export function usePropertyCategoryItems() {
  return useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyCategoryApiResponse<PropertyCategoryItem[]>>(
        "/api/properties/category-items",
        { params: { onlyActive: false } }
      );
      return data.data ?? [];
    },
    staleTime: 30 * 1000,
  });
}

// ── 2. Get items by category ID ─────────────────────────────────────────────
export function usePropertyCategoryItemsByCategory(categoryId: string) {
  return useQuery({
    queryKey: [KEY, "category", categoryId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyCategoryApiResponse<PropertyCategoryItem[]>>(
        `/api/properties/category-items/category/${categoryId}`,
        { params: { onlyActive: false } }
      );
      return data.data ?? [];
    },
    enabled: !!categoryId,
    staleTime: 30 * 1000,
  });
}

// ── 3. Single item by ID ─────────────────────────────────────────────────────
export function usePropertyCategoryItemById(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyCategoryApiResponse<PropertyCategoryItem>>(
        `/api/properties/category-items/${id}`
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

// ── 4. Create ─────────────────────────────────────────────────────────────────
export function useCreatePropertyCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyCategoryItemRequest) => {
      const { data } = await axiosInstance.post<PropertyCategoryApiResponse>(
        "/api/properties/category-items",
        payload
      );
      return data;
    },
    onSuccess: (data, payload) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      if (payload.propertyCategoryId) {
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, payload.propertyCategoryId] });
      }
    },
    onError: (error: any) => {
    },
  });
}

// ── 5. Update ─────────────────────────────────────────────────────────────────
export function useUpdatePropertyCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyCategoryItemRequest }) => {
      const { data } = await axiosInstance.put<PropertyCategoryApiResponse>(
        `/api/properties/category-items/${id}`,
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
export function useDeletePropertyCategoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<PropertyCategoryApiResponse<boolean>>(
        `/api/properties/category-items/${id}`
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
export function useUpdatePropertyCategoryItemOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, displayOrder }: { id: string; displayOrder: number }) => {
      const { data } = await axiosInstance.put<PropertyCategoryApiResponse>(
        `/api/properties/category-items/${id}/display-order`,
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
export function useUpdatePropertyCategoryItemStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data } = await axiosInstance.put<PropertyCategoryApiResponse>(
        `/api/properties/category-items/${id}/status`,
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
