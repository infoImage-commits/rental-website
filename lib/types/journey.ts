export interface JourneyItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  fromLocationId: string;
  fromLocationName: string;
  toLocationId: string;
  toLocationName: string;
  basePrice: number;
  estimatedDurationMinutes: number;
  isActive: boolean;
}

export interface JourneysQuery {
  pageNumber?: number;
  pageSize?: number;
  fromLocationId?: string;
  toLocationId?: string;
  isActive?: boolean;
}

export interface JourneyRequest {
  fromLocationId: string;
  toLocationId: string;
  basePrice: number;
  estimatedDurationMinutes: number;
  isActive?: boolean;
}

export type JourneyFormDataRequest = FormData;

export interface JourneyApiResponse<T = JourneyItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
