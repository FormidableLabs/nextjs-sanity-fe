import { createGroqBuilder } from "./groq-builder";
import { SchemaConfig } from "../sanity-types";
const q = createGroqBuilder<SchemaConfig>();

describe("filterByType", () => {
  it("", () => {
    const res = q.field("*").filterByType("category");
    expect(res).toMatchObject({
      query: "*[_type == 'category']",
    });
  });
});

describe("field", () => {
  it("", () => {
    const res = q.field("*");
    expect(res).toMatchObject({
      query: "*",
    });
  });
  it("", () => {
    const res = q.field("category");
    expect(res).toMatchObject({
      query: "category",
    });
  });
  it("", () => {
    // @ts-expect-error ---
    const res = q.field("INVALID");
  });
});

describe("deref", () => {
  it("", () => {
    const res = q.field("category").deref();
    expect(res).toMatchObject({
      query: "category->",
    });
  });
});
