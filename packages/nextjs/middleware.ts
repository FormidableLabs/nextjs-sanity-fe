import { NextRequest, NextResponse } from "next/server";
import { SanityType } from "utils/consts";
import { getProductBySlug } from "utils/getProductBySlug";

type Product = Awaited<ReturnType<typeof getProductBySlug>>[number];

export const config = {
  matcher: ["/", "/categories", "/products", "/products/:slug*"],
};

export async function middleware(request: NextRequest) {
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
    const [, , slug] = request.nextUrl.pathname.split("/");
    const products = await getProductBySlug(slug);
    const variantSlugs = (products[0]?.variants?.map((v: Product["variants"][number]) => v?.slug) || []).filter(
      Boolean
    );

    const cacheKeys = [
      `${SanityType.Product}_${slug}`,
      "testing",
      ...variantSlugs.map((s) => `${SanityType.Variant}_${s}`),
    ];
    responseHeaders.set("Surrogate-Key2", cacheKeys.join(" "));
  }

  const response = NextResponse.next({
    headers: responseHeaders,
  });

  return response;
}
