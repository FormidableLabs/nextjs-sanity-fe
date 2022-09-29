import { initUrqlClient, WithUrqlClientOptions } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";

const GRAPHQL_URL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v1/graphql/production/default`;

export const urqlOptions = {
  url: GRAPHQL_URL,
};

// https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/
// When you are using getStaticProps, getServerSideProps, or getStaticPaths,
// you should opt-out of Suspense by setting the neverSuspend option to true in your withUrqlClient configuration.
export const withUrqlOptions: WithUrqlClientOptions = {
  neverSuspend: true,
  ssr: false,
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
