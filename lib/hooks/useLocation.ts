import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  LocationItem,
  LocationsQuery,
  LocationRequest,
  LocationApiResponse,
} from "@/lib/types/location";
import type { PaginatedResponse } from "@/lib/types/contact";

const LOCATIONS_KEY = "locations";

// 1. Paginated Location list
export function useLocations(query: LocationsQuery) {
  return useQuery({
    queryKey: [LOCATIONS_KEY, query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        LocationApiResponse<PaginatedResponse<LocationItem>>
      >("/api/locations", { params: query });
      return data.data as PaginatedResponse<LocationItem>;
    },
    staleTime: 30 * 1000,
  });
}

// 2. Create Location
export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LocationRequest) => {
      const { data } = await axiosInstance.post<LocationApiResponse>(
        "/api/locations",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 3. Update Location
export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: LocationRequest;
    }) => {
      const { data } = await axiosInstance.put<LocationApiResponse>(
        `/api/locations/${id}`,
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 4. Delete Location
export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<LocationApiResponse>(
        `/api/locations/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
