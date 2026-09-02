export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  readAt: string | null;
  repliedAt: string | null;
  createdAtUtc: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ContactMessagesQuery {
  IsRead?: boolean;
  FromDate?: string;
  ToDate?: string;
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  IsDescending?: boolean;
}

export interface ContactUsResponse {
  data: ContactMessage | PaginatedResponse<ContactMessage> | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
