import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  PropertyBuyingCategory,
  PropertyBuyingCategoryRequest,
  PropertyBuyingCategoryApiResponse,
} from "@/lib/types/propertyBuyingCategory";

const KEY = "property-buying-categories";

// ── 1. List all categories (no items) ────────────────────────────────────────
export function usePropertyBuyingCategories() {
  return useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyBuyingCategoryApiResponse<PropertyBuyingCategory[]>>(
        "/api/property-buying/categories",
        { params: { includeItems: false, onlyActive: false } }
      );
      return data.data ?? [];
    },
    staleTime: 30 * 1000,
  });
}

// ── 2. Single category with its items ────────────────────────────────────────
export function usePropertyBuyingCategoryById(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyBuyingCategoryApiResponse<PropertyBuyingCategory>>(
        `/api/property-buying/categories/${id}`,
        { params: { includeItems: true, onlyActive: false } }
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

// ── 3. Create ─────────────────────────────────────────────────────────────────
export function useCreatePropertyBuyingCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyBuyingCategoryRequest) => {
      const { data } = await axiosInstance.post<PropertyBuyingCategoryApiResponse>(
        "/api/property-buying/categories",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 4. Update ─────────────────────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyBuyingCategoryRequest }) => {
      const { data } = await axiosInstance.put<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/categories/${id}`,
        payload
      );
      return data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 5. Delete ─────────────────────────────────────────────────────────────────
export function useDeletePropertyBuyingCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<PropertyBuyingCategoryApiResponse<boolean>>(
        `/api/property-buying/categories/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 6. Update display order ───────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategoryOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, displayOrder }: { id: string; displayOrder: number }) => {
      const { data } = await axiosInstance.put<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/categories/${id}/display-order`,
        { displayOrder }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// ── 7. Update status ──────────────────────────────────────────────────────────
export function useUpdatePropertyBuyingCategoryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data } = await axiosInstance.patch<PropertyBuyingCategoryApiResponse>(
        `/api/property-buying/categories/${id}/status`,
        { isActive }
      );
      return data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
    onError: (error: any) => {
    },
  });
}
