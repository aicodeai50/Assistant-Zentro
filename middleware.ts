import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLegacyRedirect } from "@/lib/product/legacy-routes";

export function middleware(request: NextRequest) {
  const redirect = getLegacyRedirect(request.nextUrl.pathname);

  if (redirect) {
    const url = request.nextUrl.clone();
    url.pathname = redirect.destination;
    url.search = "";

    if (redirect.query) {
      for (const [key, value] of Object.entries(redirect.query)) {
        url.searchParams.set(key, value);
      }
    }

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
    "/robot/:path*",
  ],
};
