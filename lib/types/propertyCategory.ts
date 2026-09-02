// ── Property Category Types ───────────────────────────────────────────────────

export interface PropertyCategoryItem {
  id: string;
  propertyCategoryId: string;
  name: string;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

export interface PropertyCategory {
  id: string;
  name: string;
  icon: string | null;
  defaultIcon: string | null;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
  items: PropertyCategoryItem[];
}

export interface PropertyCategoryRequest {
  id?: string;
  name: string;
  icon?: string;
  defaultIcon?: string;
  displayOrder?: number;
}

export interface PropertyCategoryItemRequest {
  id?: string;
  propertyCategoryId?: string;
  name?: string;
  icon?: string;
  displayOrder?: number;
}

export interface PropertyCategoryApiResponse<T = PropertyCategory> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
