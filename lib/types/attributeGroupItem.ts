export interface AttributeGroupItem {
  id: string;
  attributeGroupId: string;
  key: string;
  value: string;
  displayOrder: number;
}

export interface AttributeGroupItemRequest {
  attributeGroupId?: string;
  key: string;
  value: string;
  displayOrder?: number;
}

export interface AttributeGroupItemApiResponse<T = AttributeGroupItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
