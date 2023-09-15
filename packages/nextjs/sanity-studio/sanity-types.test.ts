import { SanityValues } from "./sanity-types";

const dataLake = null as unknown as SanityValues;
describe("dataLake types", () => {
  describe("category", () => {
    // @ts-expect-error  vvv
    console.log(dataLake.foo);
    console.log(dataLake.category);
    console.log(dataLake.categoryImage);

    const cat = dataLake.category;

    console.log(cat);
    // @ts-expect-error  ---
    console.log(cat.foo);
    console.log(cat.name);
    console.log(cat.description);
    console.log(cat.slug);
    console.log(cat.images);

    const catImage = cat.images![0];

    // @ts-expect-error  vvv
    console.log(catImage.foo);
    console.log(catImage._ref);
    console.log(catImage._key);
    console.log(catImage._type);
  });
});

// describe("util: expect types", () => {
//   const cat = dataLake.category;
//
//   expectTrue(expectType<keyof typeof cat>().toEqual<"description">());
//
//   expectTrue(expectType<"a" | "b">().toEqual<"a" | "b">());
//
//   expectTrue(expectType<"a" | "b">().toEqual<"b">());
//   expectTrue(expectType<"a" | "b">().toEqual<"c">());
//   expectTrue(expectType<"a" | "b">().toEqual<"a">());
//   expectTrue(expectType<"a" | "b">().toEqual<"a" | "b" | "c">());
//
//   function expectTrue(actual: true) {
//     //
//   }
//   function expectType<TActual>() {
//     return {
//       toEqual<TExpected>(): TActual extends TExpected
//         ? TExpected extends TActual
//           ? true
//           : { expected: TExpected; actual: TActual }
//         : { expected: TExpected; actual: TActual } {
//         // @ts-expect-error ----
//         return null;
//       },
//     };
//   }
// });
