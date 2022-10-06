import { createGraphqlHandlers } from "./create-graphql-handlers";
import { ProductsQueries } from "./products";

const Queries = {
  ...ProductsQueries,
};
const Mutations = {
  // Empty
};

export const handlers = createGraphqlHandlers(Queries, Mutations);
