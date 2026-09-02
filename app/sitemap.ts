import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/rent", priority: 0.95, changeFrequency: "daily" },
  { path: "/transfer", priority: 0.85, changeFrequency: "weekly" },
  { path: "/buy", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.65, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
