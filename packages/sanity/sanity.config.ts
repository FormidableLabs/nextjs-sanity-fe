import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";

import schemaTypes from "./schemas/schema";

export default defineConfig({
  projectId: "5bsv02jj",
  dataset: "production",
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
