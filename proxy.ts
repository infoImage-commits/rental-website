import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/stores/authStore";

/**
 * Next.js 16 Proxy (formerly middleware)
 *
 * Protects all /admin/* routes except /admin/login.
 * Unauthenticated requests are rewritten to /not-found so the user
 * sees a 404 page — not a redirect to login.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through unconditionally
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!token && !refreshToken) {
    // Rewrite to the app's not-found page (shows 404, no redirect)
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run only on admin routes — excludes static files, images, etc.
  matcher: ["/admin/:path*"],
};
