import { q } from "groqd";
import { sanityClient } from "./sanityClient";

export const getAllCategories = async () => {
  const { query, schema } = q("*")
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

  const response = schema.parse(await sanityClient.fetch(query));
  return response;
};
