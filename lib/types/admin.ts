export interface AdminItem {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  roles: string[];
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AdminListApiResponse {
  data: AdminItem[];
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

export interface AdminApiResponse<T = AdminItem> {
  data: T | null;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}
