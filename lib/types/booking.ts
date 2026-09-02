export interface TransferBookingRequest {
  journeyId: string;
  tripType: number; // 1 = One Way, 2 = Round Trip
  passengers: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string | null;
  returnTime: string | null;
  flightNumber: string;
  pickupNotes: string;
  dropOffNotes: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface RentBookingRequest {
  propertyId: string;
  fullName: string;
  email: string;
  phone: string;
  person: number;
  checkIn: string;
  checkOut: string;
}

export interface BookingResponseData {
  bookingId: string;
  bookingNumber: string;
  amount: number;
  currency: string;
  bookingStatus: string;
}

export interface RentBookingResponseData {
  bookingId: string;
  bookingNumber: string;
  status: string;
  totalPrice: number;
}

export interface BookingApiResponse {
  data: BookingResponseData;
  isSuccess: boolean;
  message: string;
  errors: string[];
  type: number;
}

export interface RentBookingApiResponse {
  data: RentBookingResponseData;
  isSuccess: boolean;
  message: string;
  errors: string[];
  type: number;
}

export interface PaginatedBookingResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminBookingListQuery {
  Status?: number;
  BookingNumber?: string;
  PropertyNumber?: string;
  CustomerName?: string;
  CustomerEmail?: string;
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  IsDescending?: boolean;
}

export interface AdminBookingListItem {
  id: string;
  bookingNumber: string;
  bookingType: number;
  bookingTypeName: string;
  fullName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: number;
  statusName: string;
  createdAtUtc: string;
}

export interface AdminBookingDetails {
  id: string;
  bookingNumber: string;
  status: number;
  statusName: string;
  paymentStatus: number;
  paymentStatusName: string;
  createdAtUtc: string;
  confirmedAt: string | null;
  completedAt: string | null;
  property: {
    propertyId: string;
    propertyNumber: string;
    propertyName: string;
    address: string;
  };
  guest: {
    fullName: string;
    email: string;
    phone: string;
    person: number;
  };
  stay: {
    checkIn: string;
    checkOut: string;
    numberOfNights: number;
  };
  price: {
    totalPrice: number;
    pricePerNight: number;
  };
}

export interface BookingExtensionRequest {
  newCheckOut: string;
  notes: string;
}

export interface BookingExtensionResponseData {
  extensionId: string;
  bookingId: string;
  bookingNumber: string;
  oldCheckOut: string;
  newCheckOut: string;
  additionalNights: number;
  additionalAmount: number;
  currency: string;
  bookingStatus: string;
  paymentStatus: string;
}

export interface AdminBookingApiResponse<T> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

export interface AdminTransferBookingListQuery {
  status?: number;
  journeyId?: string;
  tripType?: number;
  pickupDate?: string;
  bookingNumber?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  isDescending?: boolean;
}

export interface AdminTransferBooking {
  id: string;
  bookingId: string;
  bookingNumber: string;
  status: number;
  statusName: string;
  paymentStatus: number;
  paymentStatusName: string;
  journeyId: string;
  fromLocationName: string;
  toLocationName: string;
  tripType: number;
  tripTypeName: string;
  passengers: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string | null;
  returnTime: string | null;
  flightNumber: string;
  pickupNotes: string;
  dropOffNotes: string;
}
