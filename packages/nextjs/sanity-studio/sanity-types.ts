import { _referenced, aliasedType } from "@sanity-typed/types";
import { DocumentTypes } from "./schemas/schema";
import { InferSchemaValuesFromDocuments } from "./builder/schema-types";
// import { InferSchemaValues } from "@sanity-typed/types";

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

export type SchemaConfig = {
  TSchema: SanitySchema;
  referenced: typeof _referenced;
  aliasedType: typeof aliasedType;
};
