import { PropertyStatus, PropertyType } from "./property";

export enum PropertyBuyingStatus {
  Available = 1,
  Reserved = 2,
  Sold = 3
}

export interface PropertyBuyingAddress {
  id?: string;
  country: string;
  state?: string;
  city: string;
  area: string;
  street: string;
  zipCode: string;
}

export interface PropertyBuyingImage {
  id: string;
  imageUrl: string;
  displayOrder: number;
  isCover: boolean;
}

export interface PropertyBuyingCategoryItem {
  itemId: string;
  name: string;
  icon: string | null;
  displayOrder: number;
}

export interface PropertyBuyingSection {
  categoryId: string;
  categoryName: string;
  categoryIcon: string | null;
  displayOrder: number;
  items: PropertyBuyingCategoryItem[];
}

export interface PropertyBuyingCategory {
  id: string;
  name: string;
  imageUrl: string;
}

// Model for GET /api/property-buyings/{id}
export interface PropertyBuying {
  id: string;
  propertyNumber: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  propertyTypeId: PropertyType;
  status: PropertyBuyingStatus;
  isFeatured: boolean;
  isPublished: boolean;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: number;
  area: number;
  yearBuilt: number;
  latitude: number;
  longitude: number;
  videoUrl: string;
  virtualTourUrl: string;
  category: PropertyBuyingCategory;
  address: PropertyBuyingAddress;
  images: PropertyBuyingImage[];
  sections: PropertyBuyingSection[];
}

// Model for GET /api/property-buyings (List)
export interface PropertyBuyingListItem {
  id: string;
  propertyNumber: string;
  title: string;
  price: number;
  currency: string;
  propertyTypeId: PropertyType;
  status: PropertyBuyingStatus;
  isFeatured: boolean;
  isPublished: boolean;
  bedrooms: number;
  bathrooms: number;
  area: number;
  latitude: number;
  longitude: number;
  category: PropertyBuyingCategory;
  address: PropertyBuyingAddress;
  coverImageUrl?: string | null;
}

// Model for POST/PUT /api/property-buyings
export interface PropertyBuyingRequest {
  id?: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  propertyTypeId: PropertyType;
  status: PropertyBuyingStatus;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: number;
  area: number;
  yearBuilt: number;
  latitude: number;
  longitude: number;
  videoUrl: string;
  virtualTourUrl: string;
  address: {
    country: string;
    state: string; // the backend expects this, user said hardcode to "state" when sending
    city: string;
    area: string;
    street: string;
    zipCode: string;
  };
  categoryValues: { itemId: string }[];
}

// Shared Pagination
export interface PaginatedPropertyBuyingResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// API Wrapper
export interface PropertyBuyingApiResponse<T> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
