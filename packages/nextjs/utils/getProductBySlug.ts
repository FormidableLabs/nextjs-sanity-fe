import { q } from "groqd";
import { z } from "zod";
import { sanityClient } from "./sanityClient";

const { query: productQuery, schema: productQuerySchema } = q("*")
  .filter('_type == "product" && slug.current == "${slug}"')
  .grab({
    _id: q.string(),
    _type: q.string(),
    catgories: q("categories").filter().deref().grab({
      name: q.string(),
    }),
    slug: q
      .object({
        current: q.string().nullable(),
      })
      .nullable(),
    variants: q("variants")
      .filter()
      .deref()
      .grab({
        _id: q.string(),
        id: q.string(),
        name: q.string(),
        description: q.string(),
        msrp: q.number(),
        price: q.number(),
        slug: q
          .object({
            current: q.string().nullable(),
          })
          .nullable(),
        images: q("images")
          .filter()
          .deref()
          .grab({
            name: q.string(),
          })
          .nullable(),
        style: q.object({
          _id: q.string(),
          name: q.string(),
        }),
      })
      .nullable(),
  });

export type Product = z.infer<typeof productQuerySchema>;

export const getProductBySlug = async (slug = "") => {
  const response = productQuerySchema.parse(await sanityClient.fetch(productQuery, { slug }));
  return response;
};
