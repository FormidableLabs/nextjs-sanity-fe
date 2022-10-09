/**
 * Simulates behavior of TypeScript 4.9's "satisfies" operator
 * @example
 *   const getServerSideProps = satisfies<GetServerSideProps>()(async (context) => ({ props: { myProp1: true } });
 *   type SSRProps = AsyncReturnType<getServerSideProps>['props']; // { myProp1: true }
 */
export const satisfies =
  <TExpected>() =>
  <TActual extends TExpected>(actual: TActual) =>
    actual;
