import { q, InferType } from "groqd";
import { sanityClient } from "./sanityClient";

const { schema: variantQuerySchema } = q("variants")
  .filter()
  .deref()
  .grab({
    _id: q.string(),
    name: q.string(),
    description: q.array(q.contentBlock()),
    msrp: q.number(),
    price: q.number(),
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
          description: q.string().nullable(),
          name: q.string().nullable(),
          _key: q.string().nullable(),
        },
      })
      .nullable(),
    style: q("style")
      .filter()
      .deref()
      .grab({
        _id: q.string(),
        name: q.string().nullable(),
        slug: q
          .object({
            current: q.string().nullable(),
          })
          .nullable(),
      })
      .nullable(),
  });

const { query: productQuery, schema: productQuerySchema } = q("*")
  .filter('_type == "product" && slug.current == $slug')
  .grab({
    _id: q.string(),
    _type: q.string(),
    name: q.string(),
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
        name: q.string(),
        description: q.array(q.contentBlock()),
        msrp: q.number(),
        price: q.number(),
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
              description: q.string().nullable(),
              name: q.string().nullable(),
              _key: q.string().nullable(),
            },
          })
          .nullable(),
        style: q("style")
          .filter()
          .deref()
          .grab({
            _id: q.string(),
            name: q.string().nullable(),
            slug: q
              .object({
                current: q.string().nullable(),
              })
              .nullable(),
          })
          .nullable(),
      }),
  });

export type Product = InferType<typeof productQuerySchema>[number];
export type Variant = InferType<typeof variantQuerySchema>[number];
export type ProductImages = Variant["images"];
export type Styles = Variant["style"];

export const getProductBySlug = async (slug = "") => {
  try {
    const response = productQuerySchema.parse(
      await sanityClient.fetch(productQuery, {
        slug,
      })
    );
    return response;
  } catch (error) {
    console.log(error);
  }

  return [];
};
