import { API_BASE_URL } from "@/lib/api/config";

export function resolveApiImageUrl(url?: string | null) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}/${url.replace(/^\/+/, "")}`;
}
