import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(process.env.SANITY_GRAPHQL_URL, {
  headers: {
    Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}`,
  },
});
