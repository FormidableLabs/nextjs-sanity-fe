import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: import.meta.env.SANITY_STUDIO_DATASET,
  },
  graphql: [
    {
      playground: true,
      workspace: import.meta.env.SANITY_STUDIO_DATASET,
    },
  ],
});
