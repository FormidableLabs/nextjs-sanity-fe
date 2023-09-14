import { InferSchemaValues } from "@sanity-typed/types";

import config from "./sanity.config";

/** Typescript type of all types! */
export type SanityValues = InferSchemaValues<typeof config>;
