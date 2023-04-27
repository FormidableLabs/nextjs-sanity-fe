import { q } from "groqd";
import { runQuery } from "./sanityClient";
import { sanityImagesSelection } from "./sanityImage";

export const productSelection = {
  _id: q.string(),
  _type: q.string(),
  description: q.contentBlocks(),
  name: q.string(),
  slug: q.object({
    current: q.string(),
  }),
  images: sanityImagesSelection(),
  categories: q("categories").filter().deref().grab$({ name: q.string() }),
  variants: q("variants")
    .filter()
    .deref()
    .grab$({
      _id: q.string(),
      price: q.number(),
      name: q.string(),
      msrp: q.number(),
      description: q.contentBlocks(),
      flavour: q("flavour")
        .filter()
        .deref()
        .grab$({
          _id: q.string(),
          _type: q.string(),
          name: q.string(),
          slug: q.object({
            current: q.string(),
          }),
        })
        .nullable(),
      style: q("style")
        .filter()
        .deref()
        .grab$({
          _id: q.string(),
          _type: q.string(),
          name: q.string().optional(),
          slug: q
            .object({
              current: q.string(),
            })
            .optional(),
        })
        .nullable(),
      images: sanityImagesSelection(),
      slug: q.object({
        current: q.string(),
      }),
    }),
};

export const getAllProducts = () => runQuery(q("*").filterByType("product").grab$(productSelection));
