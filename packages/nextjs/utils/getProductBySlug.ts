import { q, sanityImage } from "groqd";
import { runQuery } from "./sanityClient";

export const productBySlugSelection = {
  _id: q.string(),
  name: q.string(),
  categories: q("categories").filter().deref().grab$({
    name: q.string(),
  }),
  slug: q.slug("slug"),
  variants: q("variants")
    .filter()
    .deref()
    .grab$({
      _id: q.string(),
      name: q.string(),
      description: q.contentBlocks(),
      msrp: q.number(),
      price: q.number(),
      slug: q.slug("slug"),
      images: sanityImage("images", {
        isList: true,
        withCrop: true,
        withHotspot: true,
      }),
      style: q("style")
        .filter()
        .deref()
        .grab$({
          _id: q.string(),
          name: q.string(),
        })
        .nullable(),
    }),
};

export const getProductBySlug = (slug = "") =>
  runQuery(q("*").filterByType("product").filter("slug.current == $slug").grab(productBySlugSelection), { slug });
