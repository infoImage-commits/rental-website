import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  AdminItem,
  CreateAdminRequest,
  AdminListApiResponse,
  AdminApiResponse,
} from "@/lib/types/admin";

const ADMINS_KEY = "admins";

// 1. Get all admins
export function useAdmins() {
  return useQuery({
    queryKey: [ADMINS_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AdminListApiResponse>("/api/admins");
      return data.data;
    },
    staleTime: 30 * 1000,
  });
}

// 2. Create SuperAdmin
export function useCreateSuperAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAdminRequest) => {
      const { data } = await axiosInstance.post<AdminApiResponse>(
        "/api/admins/super-admin",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ADMINS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}

// 3. Delete Admin
export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete<AdminApiResponse>(
        `/api/admins/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ADMINS_KEY] });
    },
    onError: (error: any) => {
    },
  });
}
