import { defineConfig } from "cypress";

const E2E_MODE = process.env.E2E_MODE as "real" | "mock";
if (!["real", "mock"].includes(E2E_MODE)) {
  throw new Error(`[cypress.config.ts] Invalid env var: E2E_MODE=${E2E_MODE}`);
}

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000`,
    specPattern: `e2e-tests/**/*.cy.{ts,${E2E_MODE}.ts}`,
    video: false,
    async setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
