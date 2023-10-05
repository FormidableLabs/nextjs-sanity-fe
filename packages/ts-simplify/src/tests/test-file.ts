import { SimplifyDeep } from "./simplify";

export type Foo = {
  a: "A";
  b: "B";
  nested: Nested;
};

type Nested = {
  c: "C";
};

export type FooPartial = Partial<Omit<Foo, "b">>;

export type FooSimple = SimplifyDeep<FooPartial>;
