export type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
} & {};
export type SimplifyDeep<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: SimplifyDeep<O[K]> }
    : never
  : T;
