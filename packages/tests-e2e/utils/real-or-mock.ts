import { skipWhen } from "../utils/skipReason";

// Check the value of the CYPRESS_E2E_MODE env var:
export const E2E_MODE = Cypress.env("E2E_MODE") as "real" | "mock";
if (!E2E_MODE) {
  throw new Error(`[E2E_MODE] Missing env var: E2E_MODE`);
} else if (!["real", "mock"].includes(E2E_MODE)) {
  throw new Error(`[E2E_MODE] Invalid env var: E2E_MODE=${E2E_MODE}`);
}

export const mockOnly = skipWhen(E2E_MODE !== "mock", "only runs against the mock backend");
export const realOnly = skipWhen(E2E_MODE !== "real", "only runs against the real backend");
