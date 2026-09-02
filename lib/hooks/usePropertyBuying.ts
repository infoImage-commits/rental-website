import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axiosInstance";
import {
  PropertyBuying,
  PropertyBuyingListItem,
  PropertyBuyingRequest,
  PropertyBuyingImage,
  PaginatedPropertyBuyingResponse,
  PropertyBuyingApiResponse,
} from "../types/propertyBuying";

// GET /api/property-buyings
export function usePropertyBuyings(params: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  propertyTypeId?: number;
}) {
  return useQuery({
    queryKey: ["propertyBuyings", params],
    queryFn: async () => {
      const { data } = await api.get<PropertyBuyingApiResponse<PaginatedPropertyBuyingResponse<PropertyBuyingListItem>>>("/api/property-buyings", { params });
      return data.data;
    },
  });
}

// GET /api/public/property-buyings
export function usePublicBuyProperties(params: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  propertyTypeId?: number;
} = {}) {
  return useQuery({
    queryKey: ["propertyBuyings", "public", params],
    queryFn: async () => {
      const { data } = await api.get<PropertyBuyingApiResponse<PaginatedPropertyBuyingResponse<PropertyBuyingListItem>>>("/api/public/property-buyings", { params });
      return data.data;
    },
  });
}

// GET /api/public/property-buyings/{id}
export function usePublicPropertyBuyingById(id: string) {
  return useQuery({
    queryKey: ["propertyBuying", "public", id],
    queryFn: async () => {
      const { data } = await api.get<PropertyBuyingApiResponse<PropertyBuying>>(`/api/public/property-buyings/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// GET /api/property-buyings/{id}
export function usePropertyBuyingById(id: string) {
  return useQuery({
    queryKey: ["propertyBuying", id],
    queryFn: async () => {
      const { data } = await api.get<PropertyBuyingApiResponse<PropertyBuying>>(`/api/property-buyings/${id}`);
      return data.data; // Return just the data object inside
    },
    enabled: !!id,
  });
}

// POST /api/property-buyings
export function useCreatePropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyBuyingRequest) => {
      const { data } = await api.post<PropertyBuyingApiResponse<PropertyBuying>>("/api/property-buyings", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || "Failed to create property";
      console.error(msg);
    }
  });
}

// PUT /api/property-buyings/{id}
export function useUpdatePropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyBuyingRequest }) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}`, payload);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", variables.id] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || "Failed to update property";
      console.error(msg);
    }
  });
}

// DELETE /api/property-buyings/{id}
export function useDeletePropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || "Failed to delete property";
      console.error(msg);
    }
  });
}

// PUT /api/property-buyings/{id}/status
export function useUpdatePropertyBuyingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: number }) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}/status`, { status });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", variables.id] });
    },
    onError: (error: any) => {
      console.error("Failed to update status", error);
    }
  });
}

// PUT /api/property-buyings/{id}/publish
export function usePublishPropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}/publish`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", id] });
    },
  });
}

// PUT /api/property-buyings/{id}/unpublish
export function useUnpublishPropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}/unpublish`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", id] });
    },
  });
}

// PUT /api/property-buyings/{id}/feature
export function useFeaturePropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}/feature`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", id] });
    },
  });
}

// PUT /api/property-buyings/{id}/unfeature
export function useUnfeaturePropertyBuying() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.put<PropertyBuyingApiResponse<boolean>>(`/api/property-buyings/${id}/unfeature`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", id] });
    },
  });
}

// GET /api/property-buyings/{id}/images
export function usePropertyBuyingImages(id: string) {
  return useQuery({
    queryKey: ["propertyBuyingImages", id],
    queryFn: async () => {
      const { data } = await api.get<PropertyBuyingApiResponse<PropertyBuyingImage[]>>(`/api/property-buyings/${id}/images`);
      return data.data || [];
    },
    enabled: !!id,
  });
}

// POST /api/property-buyings/{id}/images
export function useUploadPropertyBuyingImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.post(`/api/property-buyings/${id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyingImages", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", variables.id] });
    },
    onError: (error: any) => {
      console.error("Failed to upload images", error);
    }
  });
}

// DELETE /api/property-buyings/{id}/images/{imageId}
export function useDeletePropertyBuyingImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, imageId }: { propertyId: string; imageId: string }) => {
      const { data } = await api.delete(`/api/property-buyings/${propertyId}/images/${imageId}`);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyingImages", variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", variables.propertyId] });
    },
  });
}

// PUT /api/property-buyings/{id}/images/{imageId}/cover
export function useSetPropertyBuyingCoverImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, imageId }: { propertyId: string; imageId: string }) => {
      const { data } = await api.put(`/api/property-buyings/${propertyId}/images/${imageId}/cover`);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["propertyBuyingImages", variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuyings"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBuying", variables.propertyId] });
    },
  });
}
