import { SimplifyDeep } from "./simplify";

export type Foo = {
  a: "A";
  b?: "B";
  nested: Nested;
};

type Nested = {
  c: "C";
  d?: "D";
};

export type FooSimple = SimplifyDeep<Foo>;
let fooSimple: FooSimple;
