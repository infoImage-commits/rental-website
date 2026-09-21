import type { TranslationInput } from "@/lib/i18n/adminTranslations";

export interface AttributeGroupItem {
  id: string;
  attributeGroupId: string;
  key: string;
  value: string;
  displayOrder: number;
}

export interface AttributeGroupItemRequest {
  attributeGroupId?: string;
  key: TranslationInput;
  value: TranslationInput;
  displayOrder?: number;
}

export interface AttributeGroupItemApiResponse<T = AttributeGroupItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
