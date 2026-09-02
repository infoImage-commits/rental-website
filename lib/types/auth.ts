// ─── Generic API Wrapper ──────────────────────────────────────────────────────

/** Shape of every response from rentaltech API */
export interface ApiResponse<T = null> {
  data: T;
  isSuccess: boolean;
  message: string | null;
  errors: string[];
  type: number;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  roles: string[];
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  emailOrUserName: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  profile: UserProfile;
}

export type LoginResponse = ApiResponse<LoginData>;

// ─── Logout ───────────────────────────────────────────────────────────────────

export type LogoutResponse = ApiResponse<null>;

// ─── Refresh Token ────────────────────────────────────────────────────────────

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export type RefreshTokenResponse = ApiResponse<RefreshTokenData>;

// ─── Forgot Password ──────────────────────────────────────────────────────────

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = ApiResponse<null>;

// ─── Reset Password ───────────────────────────────────────────────────────────

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export type ResetPasswordResponse = ApiResponse<null>;

// ─── Change Password ──────────────────────────────────────────────────────────

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordResponse = ApiResponse<null>;

// ─── Profile ──────────────────────────────────────────────────────────────────

export type ProfileResponse = ApiResponse<UserProfile>;
