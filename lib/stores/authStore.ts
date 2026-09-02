import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/lib/types/auth";

// Cookie names used by proxy.ts to read tokens server-side
export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

// LoginData with profile optional — refresh calls don't get a new profile
export interface SetAuthPayload {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  profile?: UserProfile | null;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  profile: UserProfile | null;

  /** Call after a successful login or token refresh */
  setAuth: (data: SetAuthPayload) => void;

  /** Call on logout or when refresh fails */
  clearAuth: () => void;
}

// ─── Cookie helpers (client-side only) ───────────────────────────────────────

function setCookie(name: string, value: string, expiresAt: string) {
  if (typeof document === "undefined") return;
  // Use the real token expiry so the proxy cookie and the JWT always agree
  const expires = new Date(expiresAt).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// ─── Auth Store ───────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      profile: null,

      setAuth: ({ accessToken, refreshToken, expiresAt, profile }: SetAuthPayload) => {
        // Persist tokens to cookies so proxy.ts can read them server-side.
        // Access token cookie expiry mirrors the JWT expiry exactly.
        setCookie(ACCESS_TOKEN_COOKIE, accessToken, expiresAt);
        
        // Refresh token expires in 7 days
        const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        setCookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshExpiresAt);

        set({
          accessToken,
          refreshToken,
          expiresAt,
          // Keep the existing profile when refreshing tokens (profile arg is absent)
          profile: profile !== undefined ? profile : get().profile,
        });
      },

      clearAuth: () => {
        deleteCookie(ACCESS_TOKEN_COOKIE);
        deleteCookie(REFRESH_TOKEN_COOKIE);
        set({
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          profile: null,
        });
      },
    }),
    {
      name: "auth-storage", // persisted in localStorage
    }
  )
);
