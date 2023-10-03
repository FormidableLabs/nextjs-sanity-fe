import { _referenced, aliasedType, InferRawValue, DefinitionBase } from "@sanity-typed/types";
import { DocumentTypes } from "./schemas/schema";
import { Simplify } from "./builder/type-utils";

// import sanityConfig from "./sanity.config";
// export type SanitySchema = InferSchemaValues<typeof sanityConfig>;
/**
 * Normally, we could infer all types from the config itself.
 *      export type SanitySchema = InferSchemaValues<typeof config>;
 * However, the performance is terrible! 20s+ to compile, and IDE's choke.
 * This is a workaround which results in the same exact type definition,
 * but is far more performant (2s+).
 */
export type SanitySchema = InferSchemaValuesFromDocuments<DocumentTypes>;

type InferSchemaValuesFromDocuments<TDocumentTypes extends Record<string, DefinitionBase<any, any, any>>> = {
  [P in keyof TDocumentTypes]: Simplify<{ _type: P } & Omit<InferRawValue<TDocumentTypes[P]>, "_type">>;
};

export type SchemaConfig = {
  TSchema: SanitySchema;
  referenced: typeof _referenced;
  aliasedType: typeof aliasedType;
};
