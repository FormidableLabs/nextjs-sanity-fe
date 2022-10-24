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
  const itSkip = (title: string, fn: () => void) => {
    it.skip(`${title} (skipped: ${reason})`, fn);
  };

  // Also export the `skip/only` convenience methods:
  return {
    describe: Object.assign(describeSkip, {
      skip: describe.skip,
      only: describe.only,
    }),
    it: Object.assign(itSkip, {
      skip: it.skip,
      only: it.only,
    }),
  };
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
  return condition ? skipReason(reason) : { describe, it };
}
