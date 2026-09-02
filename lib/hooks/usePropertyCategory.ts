import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  PropertyCategory,
  PropertyCategoryRequest,
  PropertyCategoryApiResponse,
} from "@/lib/types/propertyCategory";

const KEY = "property-categories";

// ── 1. List all categories (no items) ────────────────────────────────────────
export function usePropertyCategories() {
  return useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyCategoryApiResponse<PropertyCategory[]>>(
        "/api/properties/categories",
        { params: { includeItems: false, onlyActive: false } }
      );
      return data.data ?? [];
    },
    staleTime: 30 * 1000,
  });
}

// ── 2. Single category with its items ────────────────────────────────────────
export function usePropertyCategoryById(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyCategoryApiResponse<PropertyCategory>>(
        `/api/properties/categories/${id}`,
        { params: { includeItems: true, onlyActive: false } }
      );
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

// ── 3. Create ─────────────────────────────────────────────────────────────────
export function useCreatePropertyCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyCategoryRequest) => {
      const { data } = await axiosInstance.post<PropertyCategoryApiResponse>(
        "/api/properties/categories",
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
export function useUpdatePropertyCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyCategoryRequest }) => {
      const { data } = await axiosInstance.put<PropertyCategoryApiResponse>(
        `/api/properties/categories/${id}`,
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
export function useDeletePropertyCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<PropertyCategoryApiResponse<boolean>>(
        `/api/properties/categories/${id}`
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
export function useUpdatePropertyCategoryOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, displayOrder }: { id: string; displayOrder: number }) => {
      const { data } = await axiosInstance.put<PropertyCategoryApiResponse>(
        `/api/properties/categories/${id}/display-order`,
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
export function useUpdatePropertyCategoryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { data } = await axiosInstance.patch<PropertyCategoryApiResponse>(
        `/api/properties/categories/${id}/status`,
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
