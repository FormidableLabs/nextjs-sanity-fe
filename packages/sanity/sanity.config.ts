import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";

import schemaTypes from "./schemas/schema";

export default defineConfig({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
