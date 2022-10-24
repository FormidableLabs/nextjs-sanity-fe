/**
 * A more verbose version of `it.skip` that requires a reason.
 *
 * Pairs well with eslint-plugin-jest/no-disabled-tests or eslint-plugin-mocha/no-skipped-tests
 * to ensure `it.skip` and `describe.skip` are only used for debugging, and don't get committed.
 *
 * @example
 *   skipReason("test fails due to issue #1111")
 *   .it("should do stuff", () => ...stuff);
 *   // Example test logs:
 *   //  - should do stuff (skipped: test fails due to issue #1111)
 */
export function skipReason(reason: string) {
  const describeSkip = (title: string, fn: () => void) => {
    describe.skip(`${title} (skipped: ${reason})`, fn);
  };
  describeSkip.skip = describe.skip;
  describeSkip.only = describe.only;

  const itSkip = (title: string, fn: () => void) => {
    it.skip(`${title} (skipped: ${reason})`, fn);
  };
  itSkip.skip = it.skip;
  itSkip.only = it.only;

  return {
    describe: describeSkip,
    it: itSkip,
    before: noop as typeof before,
    beforeEach: noop as typeof beforeEach,
    after: noop as typeof after,
    afterEach: noop as typeof afterEach,
    isActive: false,
  };
}

function noop() {
  /* noop */
}

/**
 * A more verbose version of `it.skip` that requires a reason.
 *
 * @example
 *   const onMac = skipWhen(process.platform !== 'darwin', "only testable on Mac");
 *   onMac.it("should do Mac stuff", () => ...);
 *
 *   // Example logs:
 *   //   - should do Mac stuff (skipped: only testable on Mac)
 *
 */
export function skipWhen(condition: unknown, reason: string): ReturnType<typeof skipReason> {
  return condition ? skipReason(reason) : { describe, it, before, beforeEach, after, afterEach, isActive: true };
}
