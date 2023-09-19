import { sanityImage, q } from "groqd";
import { _referenced } from "@sanity-typed/types";

import { SanitySchemaTypes } from "./sanity-types";
import { getTypedQ } from "./sanity-types.dgroq";

describe("groqd", () => {
  it("getProductBySlug", () => {
    q("*")
      .filterByType("product")
      .filter("slug.current == $slug")
      .grab({
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
      });
  });
});

/* eslint-disable  */
describe("d-groq", () => {
  const q = getTypedQ<SanitySchemaTypes>();

  it("invalid type", () => {
    // @ts-expect-error ---
    q("*").filterByType("FOO");
  });

  it("grabbing fields (no errors)", () => {
    // No Errors:
    q("*")
      .filterByType("product")
      .filter()
      .grab((q) => ({
        name: true,
        description: true,
      }));
    q("*")
      .filterByType("product")
      .filter()
      .grab((q) => ({
        name: true,
        description: true,
        NAME: "name" as const,
      }));
  });
  it("grabbing fields (with errors)", () => {
    // Errors:
    q("*")
      .filterByType("product")
      .filter()
      .grab((q) => ({
        name: true,
        //// @ts-expect-error --- ⛔️ The current scope does not have a field named 'INVALID'
        INVALID: true,
        //// @ts-expect-error --- ⛔️ If you use a tuple, be sure to include 'as const'
        MISSING_AS_CONST: "name",
      }));
  });
  it("grabbing fields from 'category", () => {
    q("*")
      .filterByType("category")
      .filter()
      .grab((q) => ({
        name: true,
        description: true,
        slug: q.slug("slug"),
      }));
  });

  it("grabbing fields from 'product -> categories'", () => {
    const dataLake: SanitySchemaTypes = null as any;

    const cat = dataLake.product.categories![0];
    console.log(
      // @ts-expect-error
      cat.INVALID,
      cat._ref,
      cat[_referenced]
    );

    const query2 = q("*")
      .filterByType("product")
      .grab((q) => ({
        name: true,
        description: "description",
        slug: q.slug("slug"),
        //// @ts-expect-error ---
        valid: q("INVALID"),
        categories: q("categories").grab((q) => ({
          _ref: true,
        })),
        categories_others: q("categories")
          .deref()
          .grab((q) => ({
            // @ts-expect-error
            INVALID: true,
            slug: true,
          })),
      }));
    type Query2 = Expand<typeof query2>;
  });

  // it("getProductBySlug", () => {
  //   q("*")
  //     .filterByType("product")
  //     .filter("slug.current == $slug")
  //     .grab$$({
  //       _id: q.string(),
  //       name: q.string(),
  //       categories: q("categories").filter().deref().grab$$$({
  //         name: q.string(),
  //       }),
  //       slug: q.slug("slug"),
  //       variants: q("variants")
  //         .filter()
  //         .deref()
  //         .grab$$({
  //           _id: q.string(),
  //           name: q.string(),
  //           description: q.contentBlocks(),
  //           msrp: q.number(),
  //           price: q.number(),
  //           slug: q.slug("slug"),
  //           images: sanityImage("images", {
  //             isList: true,
  //           }),
  //           style: q("style")
  //             .filter()
  //             .deref()
  //             .grab$$({
  //               _id: q.string(),
  //               name: q.string(),
  //             })
  //             .nullable(),
  //         }),
  //     });
  // });
});

type Expand<T> = {
  [P in keyof T]: T[P];
};
