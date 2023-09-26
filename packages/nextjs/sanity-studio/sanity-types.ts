import { SanitySchemaRaw } from "./sanity.config";

/** Typescript type of all types! */
export type SanitySchemaTypes = SimplifyDeep<SanitySchemaRaw>;
type SimplifyDeep<T> = T extends object ? (T extends infer O ? { [K in keyof O]: SimplifyDeep<O[K]> } : never) : T;
