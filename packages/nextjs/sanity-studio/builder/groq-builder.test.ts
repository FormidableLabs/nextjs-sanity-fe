import { createGroqBuilder } from "./groq-builder";
import { SchemaConfig } from "../sanity-types";
import { expectType } from "./test-utils/expectType";
import { ExtractScope } from "./common-types";

const q = createGroqBuilder<SchemaConfig>();

describe("", () => {
  const cats = q.star.filterByType("product").grabOne("categories");
  cats.TScope;
  cats.TScopeItem;

  it("getProductBySlug", () => {
    const res = q.star
      .filterByType("product")
      .filter("slug.current == $slug")
      .grab((q) => ({
        _id: true,
        name: true,
        categories: q.grabOne("categories").filter().deref().grab({
          name: true,
        }),
        slug: q.slug("slug"),
        variants: q
          .grabOne("variants")
          .filter()
          .deref()
          .grab((q) => ({
            _id: true,
            name: true,
            msrp: true,
            price: true,
            slug: q.slug("slug"),
            style: q.grabOne("style").filter().deref().grab({
              _id: true,
              name: true,
            }),
          })),
      }));

    expectType<ExtractScope<typeof res>>().toStrictEqual<
      Array<{
        _id: string;
        name: string;
        categories: Array<{
          name: string;
        }>;
        slug: string;
        variants: Array<{
          _id: string;
          name: string;
          msrp: number;
          price: number;
          slug: string;
          style: Array<{
            _id: string;
            name: string;
          }>;
        }>;
      }>
    >();
  });
});