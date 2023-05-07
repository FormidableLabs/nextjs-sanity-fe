import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { timeout, response } = req.query;
  await new Promise((r) => setTimeout(r, Number(timeout)));
  return res.status(200).send({ response });
}
