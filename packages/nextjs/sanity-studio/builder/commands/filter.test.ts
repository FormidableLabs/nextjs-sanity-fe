import { createGroqBuilder } from "../groq-builder";
import { SanitySchemaTypes, SchemaConfig } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";

const q = createGroqBuilder<SchemaConfig>();

describe("filter", () => {
  it("", () => {
    const res = q.filter();
    expectType<typeof res>().toStrictEqual<typeof q>();
    expect(q).toMatchObject({
      query: `[]`,
    });
  });
  it("", () => {
    const res = q.filter(`_type == 'flavour'`);
    expectType<typeof res>().toStrictEqual<typeof q>();
    expect(q).toMatchObject({
      query: `[_type == 'flavour']`,
    });
  });
});

describe("filterByType", () => {
  it("", () => {
    const res = q.field("*").filterByType("flavour");
    expectType<ExtractScope<typeof res>>().toStrictEqual<Array<SanitySchemaTypes["flavour"]>>();
    expect(q).toMatchObject({
      query: `*[_type == 'flavour']`,
    });
  });
});