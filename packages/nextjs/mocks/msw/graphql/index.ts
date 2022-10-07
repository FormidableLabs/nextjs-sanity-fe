import { createGraphqlHandlers } from "./create-graphql-handlers";
import { ProductsQueries } from "./products";
import { CategoryQueries } from "./categories";

const Queries = {
  ...ProductsQueries,
  ...CategoryQueries,
};
const Mutations = {
  // Empty
};

export const handlers = createGraphqlHandlers(Queries, Mutations);
