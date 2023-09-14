import { defineConfig } from "@sanity-typed/types";
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
