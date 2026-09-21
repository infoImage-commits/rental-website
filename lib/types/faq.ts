import type { TranslationInput } from "@/lib/i18n/adminTranslations";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string | null;
}

export interface FaqsQuery {
  IsPublished?: boolean;
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  IsDescending?: boolean;
}

export interface CreateFaqRequest {
  question: TranslationInput;
  answer: TranslationInput;
  displayOrder: number;
  isPublished: boolean;
}

// PUT is a full replace — same shape as create
export type UpdateFaqRequest = CreateFaqRequest;

export interface FaqApiResponse<T = FaqItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
