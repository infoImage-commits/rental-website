import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { locales, localizePath } from "@/lib/i18n/config";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/rent", priority: 0.95, changeFrequency: "daily" },
  { path: "/transfer", priority: 0.85, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.75, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.65, changeFrequency: "monthly" },
  { path: "/house-rules", priority: 0.6, changeFrequency: "monthly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(route.path, locale)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, absoluteUrl(localizePath(route.path, item))])),
      },
    }))
  );
}
