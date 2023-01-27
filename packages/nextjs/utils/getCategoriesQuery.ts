import { q } from "groqd";
import { z } from "zod";
import { sanityClient } from "./sanityClient";

const { query: categoriesQuery, schema: categoriesQuerySchema } = q("*")
  .filter("_type == 'category'")
  .grab({
    _id: q.string(),
    _type: q.string(),
    name: q.string(),
    description: q.string(),
    slug: q.object({
      current: q.string(),
    }),
    images: q("images")
      .filter()
      .deref()
      .grab({
        name: q.string(),
        images: q.sanityImage("images"),
      }),
    variants: q("variants")
      .filter()
      .deref()
      .grab({
        price: q.number(),
        name: q.string(),
        id: q.string(),
        msrp: q.number(),
        slug: q.object({
          current: q.string(),
        }),
      })
      .nullable(),
  });

export type Categories = z.infer<typeof categoriesQuerySchema>;
export type Category = z.infer<typeof categoriesQuerySchema.element>;

export const getCategories = async () => {
  const response = categoriesQuerySchema.parse(await sanityClient.fetch(categoriesQuery));
  return response;
};
