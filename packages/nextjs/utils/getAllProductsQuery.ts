import { q, sanityImage } from "groqd";
import { runQuery } from "./sanityClient";

export const productSelection = {
  _id: q.string(),
  _type: q.string(),
  description: q.contentBlocks(),
  name: q.string(),
  slug: q.slug("slug"),
  images: sanityImage("images", { isList: true, withCrop: true, withHotspot: true }),
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
          slug: q.slug("slug"),
        })
        .nullable(),
      style: q("style")
        .filter()
        .deref()
        .grab$({
          _id: q.string(),
          _type: q.string(),
          name: q.string().optional(),
          slug: q.slug("slug"),
        })
        .nullable(),
      images: sanityImage("images", { isList: true, withCrop: true, withHotspot: true }),
      slug: q.slug("slug"),
    }),
};

export const getAllProducts = () => runQuery(q("*").filterByType("product").grab$(productSelection));
