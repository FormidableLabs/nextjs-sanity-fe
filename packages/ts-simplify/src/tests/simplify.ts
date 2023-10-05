export type SimplifyDeep<T> = T extends (...args: infer A) => infer R
  ? (...args: SimplifyDeep<A>) => SimplifyDeep<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: SimplifyDeep<O[K]> }
    : never
  : T;
