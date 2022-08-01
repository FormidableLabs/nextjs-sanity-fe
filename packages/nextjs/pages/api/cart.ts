import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const CART_COOKIE_NAME = "formidable-cart";

function getCookie(cookies: NextApiRequest["cookies"]) {
  return cookies[CART_COOKIE_NAME] || {};
}

function setCookie(res: NextApiResponse, cookie: Record<string, number>) {
  res.setHeader(
    "Set-Cookie",
    serialize(CART_COOKIE_NAME, JSON.stringify(cookie), {
      httpOnly: true,
    })
  );
}

function getCart(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie(req.cookies);

  setCookie(res, cookie);

  res.status(200).send({});
}

function addToCart(req: NextApiRequest, res: NextApiResponse) {
  const cartItems = req.body;
  const cookie = getCookie(req.cookies);

  const newCookie: Record<string, number> = {
    ...cookie,
    ...cartItems,
  };

  setCookie(res, newCookie);

  res.status(200).send({});
}

function removeFromCart(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;
  const cookie = getCookie(req.cookies);

  const newCookie: Record<string, number> = {
    ...cookie,
  };

  delete newCookie[id as string];

  setCookie(res, newCookie);

  res.status(200).send({});
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getCart(req, res);
    case "PUT":
      return addToCart(req, res);
    case "DELETE":
      return removeFromCart(req, res);
    default:
      return res.status(405).json({ statusCode: 405, message: "Method not allowed" });
  }
}
