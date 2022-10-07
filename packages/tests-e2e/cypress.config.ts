import { defineConfig } from "cypress";

import { tasks } from "./cypress/tasks/tasks";

import { startNextServer } from "../nextjs/start-test-server";

const PORT = 9999;

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${PORT}`,
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", tasks);

      await startNextServer({ port: PORT });
    },
  },
});
