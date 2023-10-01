import { SanitySchemaRaw } from "./sanity.config";
// import { SimplifyDeep } from "./builder/type-utils";
import { _referenced } from "@sanity-typed/types";

/** Typescript type of all types! */
// export type SanitySchemaTypes = SimplifyDeep<SanitySchemaRaw>;
export type SanitySchemaTypes = SanitySchemaRaw;

export type SchemaConfig = { TSchema: SanitySchemaRaw; referenced: typeof _referenced };
