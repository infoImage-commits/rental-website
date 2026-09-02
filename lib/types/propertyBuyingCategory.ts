// ── Property Buying Category Types ──────────────────────────────────────────────

export interface PropertyBuyingCategoryItem {
  id: string;
  propertyBuyingCategoryId: string;
  name: string;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

export interface PropertyBuyingCategory {
  id: string;
  name: string;
  icon: string | null;
  defaultIcon: string | null;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
  items: PropertyBuyingCategoryItem[];
}

export interface PropertyBuyingCategoryRequest {
  id?: string;
  name: string;
  icon?: string;
  defaultIcon?: string;
  displayOrder?: number;
}

export interface PropertyBuyingCategoryItemRequest {
  id?: string;
  propertyBuyingCategoryId?: string;
  name?: string;
  icon?: string;
  displayOrder?: number;
}

export interface PropertyBuyingCategoryApiResponse<T = PropertyBuyingCategory> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
