import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLegacyRedirectRoute } from "@/lib/product/legacy-routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isLegacyRedirectRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/docs";
    url.searchParams.set("legacy", "archived");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/worlds/:path*",
    "/structured-progression/:path*",
    "/modular-architecture/:path*",
    "/ai-guided-intelligence/:path*",
  ],
};
