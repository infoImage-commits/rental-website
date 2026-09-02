export enum PropertyStatus {
  Clean = 1,
  Dirty = 2,
  Maintenance = 3,
}

export enum PropertyType {
  Apartment = 1,
  Villa = 2,
  Studio = 3,
  Chalet = 4,
  TwinHouse = 5,
  TownHouse = 6,
  Duplex = 7,
  Penthouse = 8,
  Cabin = 9,
  Hotel = 10,
}

export enum BedType {
  Single = 0,
  Twin = 1,
  Double = 2,
  Queen = 3,
  King = 4,
  SofaBed = 5,
  BunkBed = 6,
  BabyCrib = 7,
  Futon = 8,
}

export enum DayNo {
  Saturday = 1,
  Sunday = 2,
  Monday = 3,
  Tuesday = 4,
  Wednesday = 5,
  Thursday = 6,
  Friday = 7,
}

export interface PropertyAddress {
  id?: string;
  propertyId?: string;
  country: string;
  state?: string;
  city: string;
  area: string;
  zipCode: string;
  street: string;
}

export interface PropertyListingDetails {
  id?: string;
  propertyId?: string;
  listingStatus?: number;
  listingStatusName?: string;
  lateCheckIn: string;
  outdoorFacility: string;
  originalService: string;
  cancellation: string;
  extraPeopleFee: number;
  privatebathroom: boolean; // From POST payload it's lowercase b, sometimes privateBathroom
  checkInHour?: string;
  checkOutHour?: string;
  familyFriendly: boolean;
  privateEntrance: boolean;
  extraPeople: string;
}

export interface PropertyBed {
  id?: string;
  bedType: BedType;
  bedTypeName?: string;
  quantity: number;
}

export interface PropertySleepingArrangement {
  id?: string;
  name: string;
  displayOrder: number;
  beds: PropertyBed[];
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  displayOrder: number;
  isCover: boolean;
}

export interface PropertyPrice {
  id: string;
  propertyId: string;
  dayNo: DayNo;
  price: number;
}

// Request payload for creating prices (POST /api/properties/{id}/prices)
export interface PropertyPriceCreateRequest {
  dayNo: number;
  price: number;
}

// Request payload for updating a price (PUT /api/properties/{id}/prices/{priceId})
export interface PropertyPriceUpdateRequest {
  dayNo: number;
  price: number;
}

export interface PropertyCategoryGroup {
  categoryName: string;
  items: string[];
}

// Full Property Object (GET /api/properties/{id})
export interface Property {
  id: string;
  propertyNumber: string;
  code: string;
  name: string;
  description: string;
  bedroomNo: number;
  bathroomNo: number;
  roomNo: number;
  capacity: number;
  size: number;
  basePrice: number;
  propertyType: PropertyType;
  propertyTypeName: string;
  propertyStatus: PropertyStatus;
  propertyStatusName: string;
  isAvailable: boolean;
  isFeatured: boolean;
  hasSeaView: boolean;
  hasPoolView: boolean;
  hasGardenView: boolean;
  hasMountainView: boolean;
  hasCityView: boolean;
  latitude: number;
  longitude: number;
  rulesCancellation: string;
  notes: string;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  category?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  address: PropertyAddress;
  listingDetails: PropertyListingDetails;
  images: PropertyImage[];
  prices: PropertyPrice[];
  sleepingArrangements: PropertySleepingArrangement[];
  categories: PropertyCategoryGroup[];
}

// Property ListItem (GET /api/properties)
export interface PropertyListItem {
  id: string;
  propertyNumber: string;
  code: string;
  name: string;
  bedroomNo: number;
  bathroomNo: number;
  capacity: number;
  basePrice: number;
  propertyType: PropertyType;
  propertyTypeName: string;
  isAvailable: boolean;
  isFeatured: boolean;
  coverImageUrl: string | null;
  city: string | null;
  country: string | null;
  createdAtUtc: string;
}

// Request Payload (POST /api/properties or PUT /api/properties/{id})
export interface PropertyRequest {
  categoryId: string;
  code: string;
  name: string;
  description: string;
  bedroomNo: number;
  bathroomNo: number;
  roomNo: number;
  capacity: number;
  size: number;
  basePrice: number;
  propertyType: PropertyType;
  propertyStatus: PropertyStatus;
  isAvailable: boolean;
  isFeatured: boolean;
  hasSeaView: boolean;
  hasPoolView: boolean;
  hasGardenView: boolean;
  hasMountainView: boolean;
  hasCityView: boolean;
  latitude: number;
  longitude: number;
  rulesCancellation: string;
  notes: string;
  address?: PropertyAddress;
  listingDetails?: PropertyListingDetails;
  sleepingArrangements?: PropertySleepingArrangement[];
  propertyCategoryItemIds?: string[];
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

export interface PropertyApiResponse<T> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

export interface PropertyTypeCount {
  name: string;
  count: number;
}
