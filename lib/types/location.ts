export interface LocationItem {
  id: string;
  name: string;
  isActive: boolean;
}

export interface LocationsQuery {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export interface LocationRequest {
  name: string;
  isActive?: boolean;
}

export interface LocationApiResponse<T = LocationItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
