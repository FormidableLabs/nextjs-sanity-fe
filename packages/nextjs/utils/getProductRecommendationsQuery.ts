import { InferType, q } from "groqd";
import { sanityClient } from "./sanityClient";

const { query: getProductRecommendationsQuery, schema: getProductRecommendationsQuerySchema } = q("*")
  .filter("_type == 'product'")
  .order("_updatedAt asc")
  .slice(0, 2)
  .grab({
    _id: q.string(),
    _type: q.string(),
    name: q.string(),
    slug: q
      .object({
        current: q.string().nullable(),
      })
      .nullable(),
    images: q
      .sanityImage("images", {
        isList: true,
        additionalFields: {
          name: q.string().nullable().default(""),
          description: q.string().nullable().default(""),
        },
      })
      .nullable(),
    variants: q("variants")
      .filter()
      .deref()
      .grab({
        _id: q.string(),
        name: q.string(),
        price: q.number(),
        msrp: q.number(),
        slug: q
          .object({
            current: q.string().nullable(),
          })
          .nullable(),
        images: q
          .sanityImage("images", {
            isList: true,
            withCrop: true,
            withHotspot: true,
            additionalFields: {
              name: q.string().nullable().default(""),
              description: q.string().nullable().default(""),
            },
          })
          .nullable(),
      })
      .nullable(),
  });

export type ProductRecommendations = InferType<typeof getProductRecommendationsQuerySchema>;
export type ProductRecommendation = InferType<typeof getProductRecommendationsQuerySchema>[number];

export const getProductRecommendations = async () => {
  try {
    const response = getProductRecommendationsQuerySchema.parse(
      await sanityClient.fetch(getProductRecommendationsQuery)
    );
    return response;
  } catch (error) {
    console.log(error);
  }

  return [];
};
