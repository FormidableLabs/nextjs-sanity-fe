import { createGroqBuilder } from "../groq-builder";
import { SanitySchemaTypes } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";
import { SanitySchemaRaw } from "../../sanity.config";
import { Simplify, SimplifyDeep } from "../type-utils";

const q = createGroqBuilder<SanitySchemaTypes>();

describe("filter", () => {
  it("", () => {
    const res = q.filterByType("flavour");
    expectType<ExtractScope<typeof res>>().toStrictEqual<SanitySchemaRaw["flavour"]>();
  });
});
