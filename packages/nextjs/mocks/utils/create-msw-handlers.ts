import { graphql } from "msw";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryHandler = (vars: any, headers?: Headers) => Promise<any>;
type QueryHandlers = Record<string, QueryHandler>;
type MutationHandlers = QueryHandlers;

export function createMswHandlers(queryHandlers: QueryHandlers, mutationHandlers: MutationHandlers) {
  return [
    ...Object.keys(queryHandlers).map((handlerName) => {
      const handler = queryHandlers[handlerName];

      return graphql.query(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables)));
      });
    }),
    ...Object.keys(mutationHandlers).map((handlerName) => {
      const handler = mutationHandlers[handlerName];

      return graphql.mutation(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables)));
      });
    }),
  ];
}
