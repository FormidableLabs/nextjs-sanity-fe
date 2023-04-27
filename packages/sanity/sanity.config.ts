import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";
import { groqdPlaygroundTool } from "groqd-playground";

import schemaTypes from "./schemas/schema";
import { customStructure } from "./deskStructure";

export default defineConfig({
  projectId: "5bsv02jj",
  dataset: "production",
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
