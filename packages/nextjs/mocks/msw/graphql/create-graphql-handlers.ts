import { graphql } from "msw";

type SdkHandlers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [operationName in string]: (vars: any) => Promise<any>;
};

/**
 * Maps the queryHandlers and mutationHandlers into MSW handlers.
 * This is designed to work with the `@graphql-codegen/typescript-generic-sdk`.
 * This gives full type-safety, with minimal effort.
 *
 * @example
 *    import * as msw from 'msw';
 *    import { Sdk } from './graphql-mock-types.ts'; // generated using `@graphql-codegen/typescript-generic-sdk`
 *
 *    // Everything below is completely strongly-typed!
 *    const handlers = createGraphqlHandlers<Sdk>({
 *      async getMyValue(vars) {
 *        return { myValue: "value" };
 *      }
 *    }, {
 *      async setMyValue(vars) {
 *        return { myValue: vars.newValue };
 *      }
 *    });
 *
 *    msw.setupWorker(...handlers).start();
 *
 * @param queryHandlers - All the mock handlers for queries
 * @param mutationHandlers - All the mock handlers for mutations
 * @param url - If supplied, all handlers will be scoped only to this GraphQL endpoint
 */
export function createGraphqlHandlers<Sdk extends SdkHandlers>(
  queryHandlers: Partial<Sdk>,
  mutationHandlers: Partial<Sdk>,
  { url = "" } = {}
) {
  const g = url ? graphql.link(url) : graphql;
  return [
    ...mapValues(queryHandlers, (handler, handlerName) => {
      return g.query(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables)));
      });
    }),
    ...mapValues(mutationHandlers, (handler, handlerName) => {
      return g.mutation(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables)));
      });
    }),
  ];
}

function mapValues<TObj extends object, TResult>(
  obj: TObj,
  callback: (value: TObj[keyof TObj], key: keyof TObj) => TResult
): TResult[] {
  return (Object.keys(obj) as Array<keyof TObj>).map((key) => callback(obj[key], key));
}
