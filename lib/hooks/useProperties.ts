import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import { HOUSE_RENT_PROPERTY_TYPES } from "@/lib/utils/propertyUtils";
import type {
  Property,
  PropertyListItem,
  PropertyRequest,
  PropertyAddress,
  PropertyListingDetails,
  PropertyImage,
  PropertyPrice,
  PropertyPriceCreateRequest,
  PropertyPriceUpdateRequest,
  PropertyApiResponse,
  PaginatedResponse,
  PropertyTypeCount,
} from "@/lib/types/property";

const KEY = "properties";

type PropertyQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  [key: string]: unknown;
};

type PropertyAvailabilityData = {
  bookingCalendar?: unknown[];
  [key: string]: unknown;
};

function getGroupedRentPropertyTypes(params: PropertyQueryParams) {
  const group = String(params.PropertyTypeGroup ?? params.propertyTypeGroup ?? "").toLowerCase();

  if (group === "houses") {
    return [...HOUSE_RENT_PROPERTY_TYPES];
  }

  const propertyTypes = params.PropertyTypes ?? params.propertyTypes;
  if (typeof propertyTypes !== "string") return [];

  return propertyTypes
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function stripRentGroupParams(params: PropertyQueryParams) {
  const next = { ...params };
  delete next.PropertyTypeGroup;
  delete next.propertyTypeGroup;
  delete next.PropertyTypes;
  delete next.propertyTypes;
  delete next.CategoryId;
  delete next.categoryId;
  delete next.LocationName;
  delete next.locationName;
  return next;
}

function getRentCategoryId(params: PropertyQueryParams) {
  const categoryId = params.CategoryId ?? params.categoryId;
  return typeof categoryId === "string" && categoryId.trim() ? categoryId.trim() : "";
}

async function filterRentItemsByCategory(items: PropertyListItem[], categoryId: string) {
  if (!categoryId) return items;

  const details = await Promise.all(
    items.map(async (item) => {
      try {
        const { data } = await axiosInstance.get<PropertyApiResponse<Property>>(`/api/properties/${item.id}`);
        return data.data;
      } catch {
        return null;
      }
    }),
  );

  return items.filter((item, index) => details[index]?.category?.id === categoryId);
}

function buildSinglePageResponse(items: PropertyListItem[], pageSize: number) {
  return {
    items,
    pageNumber: 1,
    pageSize: pageSize || items.length || 10,
    totalCount: items.length,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

// ── 1. List & Fetch ──────────────────────────────────────────────────────────
export function useProperties(params: PropertyQueryParams = {}) {
  return useQuery({
    queryKey: [KEY, "list", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<PaginatedResponse<PropertyListItem>>>(
        "/api/properties",
        { params: { pageNumber: 1, pageSize: 10, ...params } }
      );
      return data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function usePublicRentProperties(params: PropertyQueryParams = {}) {
  return useQuery({
    queryKey: [KEY, "public", params],
    queryFn: async () => {
      const groupedTypes = getGroupedRentPropertyTypes(params);
      const categoryId = getRentCategoryId(params);
      const baseParams = stripRentGroupParams({ pageNumber: 1, pageSize: 10, ...params });

      if (categoryId) {
        baseParams.pageNumber = 1;
        baseParams.pageSize = 1000;
        delete baseParams.City;
        delete baseParams.city;
      }

      if (groupedTypes.length > 0) {
        delete baseParams.PropertyType;
        delete baseParams.propertyType;

        const responses = await Promise.all(
          groupedTypes.map((propertyType) =>
            axiosInstance.get<PropertyApiResponse<PaginatedResponse<PropertyListItem>>>(
              "/api/properties/filter",
              { params: { ...baseParams, PropertyType: propertyType } },
            ),
          ),
        );

        const seen = new Set<string>();
        const items = responses.flatMap((response) => response.data.data?.items ?? []).filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        const filteredItems = await filterRentItemsByCategory(items, categoryId);

        return buildSinglePageResponse(filteredItems, Number(baseParams.pageSize) || 10);
      }

      const { data } = await axiosInstance.get<PropertyApiResponse<PaginatedResponse<PropertyListItem>>>(
        "/api/properties/filter",
        { params: baseParams }
      );

      if (categoryId) {
        const filteredItems = await filterRentItemsByCategory(data.data?.items ?? [], categoryId);
        return buildSinglePageResponse(filteredItems, Number(baseParams.pageSize) || 10);
      }

      return data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function usePropertyById(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<Property>>(`/api/properties/${id}`);
      return data.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function usePropertyAvailability(propertyId: string, startDate: string, endDate: string) {
  return useQuery({
    queryKey: [KEY, "availability", propertyId, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<PropertyAvailabilityData>>(
        `/api/properties/${propertyId}/availability`,
        { params: { startDate, endDate } }
      );
      return data.data;
    },
    enabled: !!propertyId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
  });
}

// ── 2. Create, Update, Delete ────────────────────────────────────────────────
export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PropertyRequest) => {
      const { data } = await axiosInstance.post<PropertyApiResponse<Property>>("/api/properties", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<Property>>(`/api/properties/${id}`, payload);
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<PropertyApiResponse<boolean>>(`/api/properties/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

// ── 3. Toggles ───────────────────────────────────────────────────────────────
export function useUpdatePropertyAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(
        `/api/properties/${id}/availability`,
        isAvailable,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useUpdatePropertyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: number }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(
        `/api/properties/${id}/Status`,
        status,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useUpdatePropertyFeatured() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(
        `/api/properties/${id}/featured`,
        isFeatured,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

// ── 4. Address & Listing Details ─────────────────────────────────────────────
export function useUpdatePropertyAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyAddress }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(`/api/properties/${id}/address`, payload);
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

export function useUpdatePropertyListingDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: PropertyListingDetails }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(
        `/api/properties/${id}/listing-details`,
        payload
      );
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
    },
  });
}

// ── 5. Images ────────────────────────────────────────────────────────────────
export function usePropertyImages(propertyId: string) {
  return useQuery({
    queryKey: [KEY, propertyId, "images"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<PropertyImage[]>>(
        `/api/properties/${propertyId}/images`
      );
      return data.data ?? [];
    },
    enabled: !!propertyId,
    staleTime: 30 * 1000,
  });
}

export function useUploadPropertyImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await axiosInstance.post<PropertyApiResponse<PropertyImage[]>>(
        `/api/properties/${id}/images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, id] });
      queryClient.invalidateQueries({ queryKey: [KEY, id, "images"] });
    },
  });
}

export function useSetCoverImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, imageId }: { propertyId: string; imageId: string }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<boolean>>(
        `/api/properties/${propertyId}/images/${imageId}/set-cover`
      );
      return data;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId] });
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId, "images"] });
    },
  });
}

export function useDeletePropertyImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ imageId }: { propertyId: string; imageId: string }) => {
      const { data } = await axiosInstance.delete<PropertyApiResponse<boolean>>(`/api/properties/images/${imageId}`);
      return data;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId] });
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId, "images"] });
    },
  });
}

// ── 6. Prices ────────────────────────────────────────────────────────────────
export function usePropertyPrices(propertyId: string) {
  return useQuery({
    queryKey: [KEY, propertyId, "prices"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<PropertyPrice[]>>(
        `/api/properties/${propertyId}/prices`
      );
      return data.data ?? [];
    },
    enabled: !!propertyId,
    staleTime: 30 * 1000,
  });
}

export function useCreatePropertyPrices() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ 
      propertyId, 
      prices 
    }: { 
      propertyId: string; 
      prices: PropertyPriceCreateRequest[] 
    }) => {
      const { data } = await axiosInstance.post<PropertyApiResponse<PropertyPrice[]>>(
        `/api/properties/${propertyId}/prices`,
        prices // Send array directly
      );
      return data;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId] });
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId, "prices"] });
    },
  });
}

export function useUpdatePropertyPrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      propertyId,
      priceId,
      payload,
    }: {
      propertyId: string;
      priceId: string;
      payload: PropertyPriceUpdateRequest;
    }) => {
      const { data } = await axiosInstance.put<PropertyApiResponse<PropertyPrice>>(
        `/api/properties/${propertyId}/prices/${priceId}`,
        payload
      );
      return data;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId] });
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId, "prices"] });
    },
  });
}

export function useDeletePropertyPrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, priceId }: { propertyId: string; priceId: string }) => {
      const { data } = await axiosInstance.delete<PropertyApiResponse<boolean>>(
        `/api/properties/${propertyId}/prices/${priceId}`
      );
      return data;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId] });
      queryClient.invalidateQueries({ queryKey: [KEY, propertyId, "prices"] });
    },
  });
}

export function usePropertyTypes() {
  return useQuery({
    queryKey: [KEY, "propertyTypes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PropertyApiResponse<PaginatedResponse<PropertyTypeCount>>>(
        "/api/properties/propertytypes",
        { params: { pageNumber: 1, pageSize: 50 } }
      );
      return data.data?.items ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
