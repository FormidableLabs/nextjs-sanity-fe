import { SanitySchemaRaw } from "./sanity.config";
import { _referenced, aliasedType } from "@sanity-typed/types";

/** Typescript type of all types! */
export type SanitySchemaTypes = SanitySchemaRaw;

export type SchemaConfig = {
  TSchema: SanitySchemaRaw;
  referenced: typeof _referenced;
  aliasedType: typeof aliasedType;
};
