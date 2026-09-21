import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const privatePublicRoutes = ["/payment/", "/booking-confirmation"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/billing/",
        ...privatePublicRoutes.flatMap((path) => [`/en${path}`, `/fr${path}`, `/de${path}`, `/ru${path}`]),
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
