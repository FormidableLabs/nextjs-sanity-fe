import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    message: "hello, webhook!",
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
