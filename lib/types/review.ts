export interface ReviewItem {
  id: string;
  bookingId: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  propertyName: string;
  rate: number;
  comment: string;
  createdAtUtc: string;
}

export interface PaginatedReviews {
  items: ReviewItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ReviewsQuery {
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  IsDescending?: boolean;
}

export interface CreateReviewPayload {
  bookingNumber: string;
  rate: number;
  comment: string;
}

export interface PropertyRatingAverage {
  propertyId: string;
  averageRating: number;
  totalReviews: number;
}

export interface ReviewsApiResponse<T> {
  data: T;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
