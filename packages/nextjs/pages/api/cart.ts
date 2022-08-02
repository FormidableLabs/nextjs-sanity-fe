import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const CART_COOKIE_NAME = process.env.NEXT_PUBLIC_CART_COOKIE_NAME;

function getCookie(cookies: NextApiRequest["cookies"]) {
  return cookies[CART_COOKIE_NAME] ? JSON.parse(cookies[CART_COOKIE_NAME]) : {};
}

function setCookie(res: NextApiResponse, cookie: Record<string, number>) {
  res.setHeader(
    "Set-Cookie",
    serialize(CART_COOKIE_NAME, JSON.stringify(cookie), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: "/",
    })
  );
}

function getCart(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie(req.cookies);

  setCookie(res, cookie);

  res.status(200).send({});
}

function addToCart(req: NextApiRequest, res: NextApiResponse) {
  const cartItems: Record<string, number> = req.body;
  const cookie: Record<string, number> = getCookie(req.cookies);

  const newCookie: Record<string, number> = Object.entries(cartItems).reduce((acc, [key, value]) => {
    if (cookie.hasOwnProperty(key)) {
      return {
        ...acc,
        [key]: cartItems[key] + value,
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, cookie);

  setCookie(res, newCookie);

  res.status(200).send({});
}

function clearCart(req: NextApiRequest, res: NextApiResponse<any>) {
  setCookie(res, {});

  res.status(200).send({});
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getCart(req, res);
    case "PUT":
      return addToCart(req, res);
    case "DELETE":
      return clearCart(req, res);
    default:
      return res.status(405).json({ statusCode: 405, message: "Method not allowed" });
  }
}
