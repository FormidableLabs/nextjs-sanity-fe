import { NextRequest, NextResponse } from "next/server";
import { SanityType } from "utils/consts";

export const config = {
  matcher: ["/", "/categories", "/products", "/products/:slug*"],
};

export function middleware(request: NextRequest) {
  const responseHeaders = new Headers();
  responseHeaders.set("Cache-Control", "public, max-age=0");
  responseHeaders.set("Surrogate-Control", "max-age=604800, stale-while-revalidate=120000, stale-if-error=600000");

  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/categories") {
    const keys = [SanityType.Category, SanityType.CategoryImage];
    responseHeaders.set("Surrogate-Key", keys.join(" "));
  }

  if (request.nextUrl.pathname === "/products") {
    const keys = [SanityType.Product, SanityType.Style, SanityType.Flavour, SanityType.Variant];
    responseHeaders.set("Surrogate-Key", keys.join(" "));
  } else if (request.nextUrl.pathname.startsWith("/products")) {
    const [, slug] = request.nextUrl.pathname.split("/");
    // TODO
  }

  const response = NextResponse.next({
    headers: responseHeaders,
  });

  return response;
}
