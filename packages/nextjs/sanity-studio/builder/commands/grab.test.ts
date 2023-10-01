import { createGroqBuilder } from "../groq-builder";
import { SchemaConfig } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";

const q = createGroqBuilder<SchemaConfig>();

describe("grab", () => {
  it("grab one property", () => {
    const res = q.filterByType("variant").grab({
      name: true,
    });

    expect(res).toMatchObject({
      query: "*[_type == 'variant']{name}",
    });

    expectType<ExtractScope<typeof res>>().toStrictEqual<{
      name: string;
    }>();
  });

  it("grab multiple properties", () => {
    const res = q.filterByType("variant").grab({
      id: true,
      name: true,
      price: true,
      msrp: true,
    });

    expect(res).toMatchObject({
      query: "*[_type == 'variant']{name,price,id,msrp}",
    });

    expectType<ExtractScope<typeof res>>().toStrictEqual<{
      id: string | undefined;
      name: string;
      price: number;
      msrp: number;
    }>();
  });
});
