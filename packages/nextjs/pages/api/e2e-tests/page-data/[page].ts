import * as categories from "pages/categories";
import { NextApiRequest, NextApiResponse } from "next";

export interface PageDataTypes {
  "/categories": AsyncReturnType<typeof categories.getSSRProps>["e2eData"];
}
type AsyncReturnType<TFunc extends (...args: any) => any> = UnwrapPromise<ReturnType<TFunc>>;
type UnwrapPromise<TPromiseMaybe> = TPromiseMaybe extends Promise<infer TValue> ? TValue : TPromiseMaybe;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, ...query } = req.query;
  const context = { req, res, query, resolvedUrl: req.url! };

  if (page === "categories") {
    const { e2eData } = await categories.getSSRProps(context);
    res.status(200).json(e2eData);
  } else {
    res.status(404).send(`Could not find page "${page}"`);
  }
}
