import { createMswHandlers } from "mocks/utils/create-msw-handlers";
import { ProductsQueries } from "mocks/handlers/products";

const Queries = {
  ...ProductsQueries,
};
const Mutations = {
  // Empty
};

export const handlers = createMswHandlers(Queries, Mutations);
