import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import type {
  ReviewItem,
  PaginatedReviews,
  ReviewsQuery,
  CreateReviewPayload,
  PropertyRatingAverage,
  ReviewsApiResponse,
} from "../types/review";

// 1. Get paginated list of reviews (Public)
export function useReviews(query: ReviewsQuery = {}) {
  return useQuery({
    queryKey: ["reviews", query],
    queryFn: async () => {
      const response = await axiosInstance.get<ReviewsApiResponse<PaginatedReviews>>("/api/reviews", {
        params: query,
      });
      return response.data?.data ?? (response.data as unknown as PaginatedReviews);
    },
    staleTime: 60 * 1000,
  });
}

// 2. Get single review by ID (Public)
export function useReview(id: string) {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await axiosInstance.get<ReviewsApiResponse<ReviewItem> | ReviewItem>(`/api/reviews/${id}`);
      const data = response.data;
      if (data && typeof data === "object" && "data" in data) {
        return data.data as ReviewItem;
      }
      return data as ReviewItem;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

// 3. Get property average rating (Public)
export function usePropertyAverageRating(propertyId: string) {
  return useQuery({
    queryKey: ["property-average-rating", propertyId],
    queryFn: async () => {
      const response = await axiosInstance.get<ReviewsApiResponse<PropertyRatingAverage> | PropertyRatingAverage>(
        `/api/reviews/property/${propertyId}/average`
      );
      const data = response.data;
      if (data && typeof data === "object" && "data" in data) {
        return (data.data as PropertyRatingAverage) ?? { propertyId, averageRating: 0, totalReviews: 0 };
      }
      return (data as PropertyRatingAverage) ?? { propertyId, averageRating: 0, totalReviews: 0 };
    },
    enabled: !!propertyId,
    staleTime: 60 * 1000,
  });
}

// 4. Create review for completed booking (Public)
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const response = await axiosInstance.post<ReviewsApiResponse<ReviewItem>>("/api/reviews", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["property-average-rating"] });
    },
  });
}

// 5. Delete review by ID (Admin Only - token attached automatically by axiosInstance)
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/api/reviews/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["property-average-rating"] });
    },
  });
}
