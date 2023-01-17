import { GRAPHQL_URL } from "utils/urql";
import { Sdk } from "utils/generated/graphql-mock-types";
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

// Ensure we have defined a mock for every Query and Mutation:
type UnmockedOperations = Omit<Sdk, keyof typeof Queries | keyof typeof Mutations>;
type UnmockedOperationsError = keyof UnmockedOperations extends never
  ? null
  : { "Error: these operations must be mocked": keyof UnmockedOperations };

const ensureAllOperationsAreMocked: UnmockedOperationsError = null;
ensureAllOperationsAreMocked; // (Suppress "unused variable" error)

export const handlers = createGraphqlHandlers<Sdk>(Queries, Mutations, { url: GRAPHQL_URL });
