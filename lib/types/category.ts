export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string | null;
  propertiesCount: number;
  propertyBuyingsCount: number;
  totalCount: number;
}

export type CategoryFormDataRequest = FormData;

export interface CategoryApiResponse<T = CategoryItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
