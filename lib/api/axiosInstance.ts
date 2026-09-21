import axios from "axios";
import { API_BASE_URL } from "@/lib/api/config";
import { useAuthStore } from "@/lib/stores/authStore";
import type { RefreshTokenResponse } from "@/lib/types/auth";
import { defaultLocale, getPathLocale, isLocale } from "@/lib/i18n/config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attaches the Bearer token from the Zustand store to every outgoing request.

function readHeader(headers: unknown, name: string) {
  const headerBag = headers as
    | (Record<string, unknown> & { get?: (headerName: string) => unknown })
    | undefined;
  const viaGet = headerBag?.get?.(name);
  if (typeof viaGet === "string" && viaGet.trim()) return viaGet.trim();

  const direct = headerBag?.[name] ?? headerBag?.[name.toLowerCase()];
  return typeof direct === "string" && direct.trim() ? direct.trim() : "";
}

function writeHeader(headers: unknown, name: string, value: string) {
  const headerBag = headers as
    | (Record<string, unknown> & { set?: (headerName: string, headerValue: string) => void })
    | undefined;
  if (headerBag?.set) {
    headerBag.set(name, value);
    return;
  }
  if (headerBag) {
    headerBag[name] = value;
  }
}

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  const explicitLocale =
    readHeader(config.headers, "Accept-Language") || readHeader(config.headers, "X-Locale");
  const pathLocale =
    typeof window !== "undefined" ? getPathLocale(window.location.pathname) ?? defaultLocale : defaultLocale;
  const locale = isLocale(explicitLocale) ? explicitLocale : pathLocale;

  writeHeader(config.headers, "Accept-Language", locale);
  writeHeader(config.headers, "X-Locale", locale);

  if (token) {
    writeHeader(config.headers, "Authorization", `Bearer ${token}`);
  }
  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
// On 401: silently attempt a token refresh using a plain axios call (NOT the
// instance, to avoid triggering this interceptor recursively).
// Concurrent requests that 401 while a refresh is in flight are queued and
// retried with the new token once the refresh resolves.

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only intercept 401 errors that haven't been retried yet.
    // Skip the refresh-token URL itself to prevent infinite loops.
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/api/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // Mark as retried immediately so neither this request nor queued requests
    // can ever trigger a secondary refresh attempt.
    originalRequest._retry = true;

    const { accessToken, refreshToken, setAuth, clearAuth } =
      useAuthStore.getState();

    // Check if the store token was already refreshed by another concurrent request or tab
    const authHeader =
      originalRequest.headers?.Authorization ||
      originalRequest.headers?.authorization;
    const sentToken =
      typeof authHeader === "string"
        ? authHeader.replace(/^Bearer\s+/i, "")
        : null;

    if (accessToken && sentToken && accessToken !== sentToken) {
      // The token in store is already newer than the one that failed on this request.
      // Retry immediately with the new token without hitting the refresh endpoint again.
      if (originalRequest.headers?.set) {
        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
      } else {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return axiosInstance(originalRequest);
    }

    // No session at all — this is a public request, just reject normally
    // without touching auth state or redirecting to login.
    if (!accessToken && !refreshToken) {
      return Promise.reject(error);
    }

    // No refresh token — nothing we can do, go to login
    if (!refreshToken || !accessToken) {
      clearAuth();
      if (typeof window !== "undefined" && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
      return Promise.reject(error);
    }

    // A refresh is already in flight — queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers?.set) {
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
          } else {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      // Use bare axios (not the instance) so this call bypasses the interceptor
      // and cannot trigger another refresh loop.
      const { data } = await axios.post<RefreshTokenResponse>(
        `${API_BASE_URL}/api/auth/refresh-token`,
        { accessToken, refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (data.isSuccess && data.data) {
        const newAccessToken = data.data.accessToken;

        // Preserve existing profile — refresh endpoint doesn't return one.
        const currentProfile = useAuthStore.getState().profile;

        setAuth({
          accessToken: newAccessToken,
          refreshToken: data.data.refreshToken,
          expiresAt: data.data.expiresAt,
          profile: currentProfile ?? undefined,
        });

        processQueue(null, newAccessToken);

        if (originalRequest.headers?.set) {
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
        } else {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } else {
        throw new Error(data.message ?? "Token refresh failed");
      }
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuth();
      if (typeof window !== "undefined" && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
