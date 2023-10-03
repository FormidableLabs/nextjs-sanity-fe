import { createGroqBuilder } from "../groq-builder";
import { SchemaConfig } from "../../sanity-types";
import { expectType } from "../test-utils/expectType";
import { ExtractScope } from "../common-types";
import { ExtractDocumentTypes } from "../schema-types";
import { TypeMismatchError } from "../type-utils";

const q = createGroqBuilder<SchemaConfig>();

describe("grab (*)", () => {
  it("", () => {
    const res = q.all();

    type AllDocumentTypes = ExtractDocumentTypes<SchemaConfig>;
    expectType<ExtractScope<typeof res>>().toStrictEqual<AllDocumentTypes>();
    expect(res).toMatchObject({
      query: "*",
    });
  });
});

const variants = q.star.filterByType("variant");

describe("grab (field)", () => {
  it("", () => {
    const res = variants.grabOne("price");

    expectType<ExtractScope<typeof res>>().toStrictEqual<Array<number>>();
    expect(res).toMatchObject({
      query: "*[_type == 'variant'].price",
    });
  });
  it("", () => {
    const res = variants.grabOne("name");

    expectType<ExtractScope<typeof res>>().toStrictEqual<Array<string>>();
    expect(res).toMatchObject({
      query: "*[_type == 'variant'].name",
    });
  });
});

describe("grab (objects)", () => {
  it("grab a single property", () => {
    const res = variants.grab({
      name: true,
    });

    expect(res).toMatchObject({
      query: "*[_type == 'variant']{name}",
    });

    expectType<ExtractScope<typeof res>>().toStrictEqual<
      Array<{
        name: string;
      }>
    >();
  });

  it("grab multiple properties", () => {
    const res = variants.grab({
      _id: true,
      name: true,
      price: true,
      msrp: true,
    });

    expect(res).toMatchObject({
      query: "*[_type == 'variant']{_id,name,price,msrp}",
    });

    expectType<ExtractScope<typeof res>>().toStrictEqual<
      Array<{
        _id: string;
        name: string;
        price: number;
        msrp: number;
      }>
    >();
  });

  it("cannot grab props that don't exist", () => {
    const res = variants.grab({
      INVALID: true,
    });

    expectType<ExtractScope<typeof res>>().toBeAssignableTo<
      Array<{
        INVALID: TypeMismatchError<any>;
      }>
    >();
  });
});