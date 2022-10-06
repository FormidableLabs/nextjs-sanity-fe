import { graphql } from "msw";

type Handlers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [handlerName in string]: (vars: any, headers: Headers) => Promise<any>;
};

export function createMswHandlers(queryHandlers: Handlers, mutationHandlers: Handlers) {
  return [
    ...mapValues(queryHandlers, (handler, handlerName) => {
      return graphql.query(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables, req.headers)));
      });
    }),
    ...mapValues(mutationHandlers, (handler, handlerName) => {
      return graphql.mutation(handlerName, async (req, res, ctx) => {
        return res(ctx.data(await handler(req.variables, req.headers)));
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
