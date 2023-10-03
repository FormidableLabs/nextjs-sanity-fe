import { createGroqBuilder } from "../groq-builder";
import { SchemaConfig } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";
import { ExtractDocumentTypes } from "../schema-types";

const q = createGroqBuilder<SchemaConfig>();

describe("star", () => {
  it("", () => {
    const res = q.star;
    type AllDocumentTypes = ExtractDocumentTypes<SchemaConfig>;
    expectType<ExtractScope<typeof res>>().toStrictEqual<AllDocumentTypes>();

    expect(res).toMatchObject({
      query: "*",
    });
  });
});
