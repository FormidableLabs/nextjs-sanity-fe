import { initUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const urqlOptions = {
  url: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
  fetchOptions: () => ({
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_READ_TOKEN}`,
    },
  }),
};

export const initializeUrql = () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      ...urqlOptions,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  return { client, ssrCache };
};
