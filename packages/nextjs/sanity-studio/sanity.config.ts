import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";
import { groqdPlaygroundTool } from "groqd-playground";

import schemaTypes from "./schemas/schema";
import { customStructure } from "./deskStructure";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
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
    types: schemaTypes,
  },
});
