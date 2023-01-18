import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "5bsv02jj",
    dataset: "production",
  },
  graphql: [
    {
      playground: true,
      workspace: "production",
    },
  ],
});
