import { InferType, q } from "groqd";
import { sanityClient } from "./sanityClient";

const { query: categoriesQuery, schema: categoriesQuerySchema } = q("*")
  .filter("_type == 'category'")
  .grab({
    _id: q.string(),
    _type: q.string(),
    name: q.string(),
    description: q.string().nullable().default(""),
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
        images: q.sanityImage("images", {
          withCrop: true,
          withHotspot: true,
          additionalFields: {
            _key: q.string().nullable(),
          },
        }),
      })
      .nullable(),
  });

export type Categories = InferType<typeof categoriesQuerySchema>;
export type Category = InferType<typeof categoriesQuerySchema>[number];

export const getCategories = async () => {
  try {
    const response = categoriesQuerySchema.parse(await sanityClient.fetch(categoriesQuery));
    return response;
  } catch (error) {
    console.log(error);
  }

  return [];
};
