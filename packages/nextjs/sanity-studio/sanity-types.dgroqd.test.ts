import { sanityImage, q } from "groqd";
import { _referenced } from "@sanity-typed/types";

import { SanityValues } from "./sanity-types";
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
  const q = getTypedQ<SanityValues>();

  it("invalid type", () => {
    // @ts-expect-error ---
    q("*").filterByType("FOO");
  });

  it("grabbing fields", () => {
    q("*")
      .filterByType("product")
      .filter()
      .grab$$((q) => ({
        // TODO @ts-expect-error
        // INVALID: q.string(),
        // slug: q.string(),
        name: q.string(),

        NAME: ["name", q.string()],
        // description: q.string(),
        // images: q.string(),
        // categories: q.string(),
      }));
  });
  it("grabbing fields from 'category", () => {
    q("*")
      .filterByType("category")
      .filter()
      .grab$$((q) => ({
        // TODO @ts-expect-error
        // INVALID: q.string(),
        // slug: q.string(),
        name: q.string(),
        description: q.string(),
        // images: q.string(),
      }));
  });

  it("grabbing fields from 'product -> categories'", () => {
    const dataLake: SanityValues = null as any;

    const cat = dataLake.product.categories![0];
    console.log(
      // @ts-expect-error
      cat.INVALID,
      cat._ref,
      cat[_referenced]
    );

    q("*")
      .filterByType("product")
      .grab$$((q) => ({
        name: q.string(),
        slug: q.slug("slug"),
        // @ts-expect-error ---
        description: q.number(),
        // @ts-expect-error ---
        valid: q("INVALID"),
        categories: q("categories").grab$$((q) => ({
          _ref: q.string(),
        })),
        categories2: q("categories")
          .deref()
          .grab$$((q) => ({
            // @ts-expect-error
            INVALID: q.string(),
            slug: q.string(),
          })),
      }));
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
  //         .grab$$$({
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
