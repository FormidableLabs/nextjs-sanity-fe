import { defineConfig } from "cypress";
import { interceptSSR } from "./cypress/tasks/interceptSSR/task";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        interceptSSR,
      });
    },
  },
});
