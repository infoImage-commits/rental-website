import axios from "axios";
import { API_BASE_URL } from "@/lib/api/config";
import { useAuthStore } from "@/lib/stores/authStore";
import type { RefreshTokenResponse } from "@/lib/types/auth";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attaches the Bearer token from the Zustand store to every outgoing request.

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

    const { accessToken, refreshToken, setAuth, clearAuth } =
      useAuthStore.getState();

    // No session at all — this is a public request, just reject normally
    // without touching auth state or redirecting to login.
    if (!accessToken && !refreshToken) {
      return Promise.reject(error);
    }

    // No refresh token — nothing we can do, go to login
    if (!refreshToken || !accessToken) {
      clearAuth();
      if (typeof window !== "undefined") {
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
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
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
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        throw new Error(data.message ?? "Token refresh failed");
      }
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
