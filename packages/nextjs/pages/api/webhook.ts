import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log("received a potential webhook request with the following payload: ");
  console.log(request.body);
  response.status(200).json({
    message: "hello, webhook!",
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
