import { defineConfig, InferRawValue } from "@sanity-typed/types";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";
import { groqdPlaygroundTool } from "groqd-playground";

import { customStructure } from "./deskStructure";

import category from "./schemas/category";
import categoryImage from "./schemas/categoryImage";
import description from "./schemas/description";
import flavour from "./schemas/flavour";
import product from "./schemas/product";
import productImage from "./schemas/productImage";
import siteSettings from "./schemas/siteSettings";
import style from "./schemas/style";
import variant from "./schemas/variant";
import { Simplify } from "./builder/type-utils";

export default defineConfig({
  projectId: "5bsv02jj",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    deskTool({ structure: customStructure }),
    visionTool(),
    groqdPlaygroundTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
  ],
  schema: {
    types: [
      /* Your types here! */
      category,
      categoryImage,
      description,
      flavour,
      product,
      productImage,
      siteSettings,
      style,
      variant,
    ],
  },
});

/**
 * Normally, we could infer all types from the config itself:
 *      export type SanitySchemaTypes = InferSchemaValues<typeof config>;
 * However, the performance is terrible! 20s+ to compile, and IDE's choke.
 * This is a workaround which results in the same exact type definition,
 * but is far more performant (2s+).
 * Be sure to keep this list updated with all schema types above.
 */
export type SanitySchemaRaw = OverrideTypes<{
  category: InferRawValue<typeof category>;
  categoryImage: InferRawValue<typeof categoryImage>;
  description: InferRawValue<typeof description>;
  flavour: InferRawValue<typeof flavour>;
  product: InferRawValue<typeof product>;
  productImage: InferRawValue<typeof productImage>;
  siteSettings: InferRawValue<typeof siteSettings>;
  style: InferRawValue<typeof style>;
  variant: InferRawValue<typeof variant>;
}>;

type OverrideTypes<TDocuments> = {
  [P in keyof TDocuments]: Simplify<{ _type: P } & Omit<TDocuments[P], "_type">>;
};
