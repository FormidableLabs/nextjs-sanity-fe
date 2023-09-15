// import { InferSchemaValues } from "@sanity-typed/types";
import { _referenced } from "@sanity-typed/types";
// import config from "./sanity.config";

/** Typescript type of all types! */
// export type SanityValues = InferSchemaValues<typeof config>;

// The `InferSchemaValues` is like SUPER slow, so here's a snapshot:
export type SanityValuesForTests = {
  product: {
    slug: { _type: "slug"; current: string };
    name: string;
    description: string;
    categories?: Array<{
      _type: "reference";
      _ref: string;
      [_referenced]: "category";
    }>;
    variants?: Array<{
      _type: "reference";
      _ref: string;
      [_referenced]: "variant";
    }>;
  };
  category: {
    slug: { _type: "slug"; current: string };
    name: string;
    description: string;
  };
  variant: {
    name: string;
  };
};
