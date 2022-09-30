import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const CART_COOKIE_NAME = "formidable-cart";

export function getCookie(cookies: NextApiRequest["cookies"]) {
  return cookies[CART_COOKIE_NAME] ? JSON.parse(cookies[CART_COOKIE_NAME]) : {};
}

export function setCookie(res: NextApiResponse, cookie: Record<string, number>) {
  res.setHeader(
    "Set-Cookie",
    serialize(CART_COOKIE_NAME, JSON.stringify(cookie), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: "/",
    })
  );
}
