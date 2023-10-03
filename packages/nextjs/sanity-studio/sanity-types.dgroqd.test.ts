import { sanityImage, q } from "groqd";
import { _referenced } from "@sanity-typed/types";

import { SanitySchema } from "./sanity-types";
import { getTypedQ } from "./sanity-types.dgroqd";

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
describe("d-groq-d", () => {
  const q = getTypedQ<SanitySchema>();

  it("invalid type", () => {
    //// @ts-expect-error ---
    q("*").filterByType("");
  });

  it("grabbing fields (no errors)", () => {
    q("*")
      .filterByType("product")
      .filter()
      .grab((q) => ({
        name: q.string(),
        NAME: ["name", q.string()] as const,
        slug: q.slug("slug"),
        description: "description",
      }));
  });
  it("grabbing fields (with errors)", () => {
    // Errors:
    q("*")
      .filterByType("product")
      .filter()
      .grab((q) => ({
        name: q.string(),
        // @ts-expect-error --- ⛔️ The current scope does not have a field named 'INVALID' ⛔️
        INVALID: q.string(),
        // @ts-expect-error --- ⛔️ If you use a tuple, be sure to include 'as const' ⛔️
        MISSING_AS_CONST: ["name", q.string()] as const,
      }));
  });
  it("grabbing fields from 'category", () => {
    q("*")
      .filterByType("category")
      .filter()
      .grab((q) => ({
        name: q.string(),
        description: q.string(),
        slug: q.slug("slug"),
      }));
  });

  it("grabbing fields from 'product -> categories'", () => {
    const dataLake: SanitySchema = null as any;

    const cat = dataLake.product.categories![0];
    console.log(
      // @ts-expect-error
      cat.INVALID,
      cat._ref,
      cat[_referenced]
    );

    q("*")
      .filterByType("product")
      .grab((q) => ({
        name: q.string(),
        slug: q.slug("slug"),
        // @ts-expect-error ---
        description: q.number(),
        // @ts-expect-error ---
        valid: q("INVALID"),
        categories: q("categories").grab((q) => ({
          _ref: q.string(),
        })),
        categories_others: q("categories")
          .deref()
          .grab((q) => ({
            // @ts-expect-error
            INVALID: q.string(),
            // slug: q.string(),
            name: q.string(),
          })),
      }));
  });

  // it("getProductBySlug", () => {
  //   q("*")
  //     .filterByType("product")
  //     .filter("slug.current == $slug")
  //     .grab({
  //       _id: q.string(),
  //       name: q.string(),
  //       categories: q("categories").filter().deref().grab$({
  //         name: q.string(),
  //       }),
  //       slug: q.slug("slug"),
  //       variants: q("variants")
  //         .filter()
  //         .deref()
  //         .grab({
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
  //             .grab({
  //               _id: q.string(),
  //               name: q.string(),
  //             })
  //             .nullable(),
  //         }),
  //     });
  // });
});
