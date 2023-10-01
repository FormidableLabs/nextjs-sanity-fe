import { createGroqBuilder } from "../groq-builder";
import { SanitySchemaTypes, SchemaConfig } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";

const q = createGroqBuilder<SchemaConfig>();
const v = q.field("*").filterByType("variant");
type Variant = SanitySchemaTypes["variant"];

describe("order", () => {
  it("", () => {
    const res = v.order("price");

    expectType<ExtractScope<typeof res>>().toStrictEqual<Array<Variant>>();
  });
  it("", () => {
    const res = v.order("price");

    expect(res).toMatchObject({
      query: `*[_type == 'variant'] | order(price)`,
    });
  });
  it("", () => {
    const res = v.order("price asc");

    expect(res).toMatchObject({
      query: `*[_type == 'variant'] | order(price asc)`,
    });
  });
  it("", () => {
    const res = v.order("price desc");

    expect(res).toMatchObject({
      query: `*[_type == 'variant'] | order(price desc)`,
    });
  });

  describe("multiple", () => {
    it("", () => {
      const res = v.order("price", "msrp", "name");

      expect(res).toMatchObject({
        query: `*[_type == 'variant'] | order(price, msrp, name)`,
      });
    });
    it("", () => {
      const res = v.order("price asc", "msrp desc", "name asc");

      expect(res).toMatchObject({
        query: `*[_type == 'variant'] | order(price asc, msrp desc, name asc)`,
      });
    });
  });
});
