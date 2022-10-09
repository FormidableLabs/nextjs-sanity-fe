import * as home from "pages/index";
import * as categories from "pages/categories";
import * as products from "pages/products";
import * as product from "pages/products/[slug]";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

type AsyncReturnType<TFunc extends (...args: any) => any> = UnwrapPromise<ReturnType<TFunc>>;
type UnwrapPromise<TPromiseMaybe> = TPromiseMaybe extends Promise<infer TValue> ? TValue : TPromiseMaybe;

const e2eData = Symbol.for("e2eData");

const pages = {
  "/": home.getServerSideProps,
  "/categories": categories.getServerSideProps,
  "/products": products.getServerSideProps,
  "/products/[slug]": product.getServerSideProps,
};

export type PageDataTypes = {
  [P in keyof typeof pages]: AsyncReturnType<typeof pages[P]>[symbol];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, ...query } = req.query;
  const context: GetServerSidePropsContext = { req, res, query, resolvedUrl: req.url! };

  const pageKey = `/${page}` as keyof typeof pages;

  if (pages[pageKey]) {
    const ssrProps = await pages[pageKey](context);
    const data = ssrProps[e2eData] || null;
    res.status(200).json(data);
  } else {
    res.status(404).send(`Could not find page "${pageKey}"`);
  }
}
