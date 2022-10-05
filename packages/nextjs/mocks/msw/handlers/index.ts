import { createMswHandlers } from "../utils/create-msw-handlers";
import { ProductsQueries } from "./products";

const Queries = {
  ...ProductsQueries,
};
const Mutations = {
  // Empty
};

export const handlers = createMswHandlers(Queries, Mutations);
