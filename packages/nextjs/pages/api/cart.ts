import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "utils/apiHelpers/cartCookie";

function getCart(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie(req.cookies);

  setCookie(res, cookie);

  res.status(200).send(cookie);
}

function addToCart(req: NextApiRequest, res: NextApiResponse) {
  const cartItem: Record<string, number> = req.body;
  const cookie: Record<string, number> = getCookie(req.cookies);

  const newCart = { ...cookie };
  // Removes empty quantity
  if (newCart.hasOwnProperty(cartItem.id) && cartItem.quantity === 0) {
    delete newCart[cartItem.id];
  } else {
    // Updates the cart with qty from FE
    newCart[cartItem.id] = cartItem.quantity;
  }

  setCookie(res, newCart);

  res.status(200).send(newCart);
}

function clearCart(_: NextApiRequest, res: NextApiResponse<any>) {
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
