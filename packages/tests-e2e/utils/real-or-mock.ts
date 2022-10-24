// Check the value of the CYPRESS_E2E_MODE env var:
const E2E_MODE = Cypress.env("E2E_MODE") as "real" | "mock";
if (!E2E_MODE) {
  throw new Error(`[E2E_MODE] Missing env var: E2E_MODE`);
} else if (!["real", "mock"].includes(E2E_MODE)) {
  throw new Error(`[E2E_MODE] Invalid env var: E2E_MODE=${E2E_MODE}`);
}

const testSuite = {
  describe,
  it,
  before,
  beforeEach,
  after,
  afterEach,
  isActive: true,
};
const noop = (() => undefined) as any;
const noops: typeof testSuite = {
  describe: noop,
  it: noop,
  before: noop,
  beforeEach: noop,
  after: noop,
  afterEach: noop,
  isActive: false,
};

export const mockOnly = E2E_MODE === "mock" ? testSuite : noops;
export const realOnly = E2E_MODE === "real" ? testSuite : noops;
