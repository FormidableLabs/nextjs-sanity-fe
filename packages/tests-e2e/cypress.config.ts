import { defineConfig } from "cypress";
import { interceptSSR } from "./cypress/tasks/interceptSSR/task";

import { startNextServer } from "../nextjs/next-server";

const PORT = 9999;

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${PORT}`,
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        interceptSSR,
      });

      await startNextServer({ port: PORT });
    },
  },
});
