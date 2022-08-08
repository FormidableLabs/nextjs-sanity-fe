import { GetServerSideProps } from "next";
import { GetCategoriesDocument } from "utils/generated/graphql";
import { initializeUrql } from "utils/urql";

export const getCategoryServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetCategoriesDocument).toPromise();

  // set caching response header
  // note: when running `next dev`, these headers are overwritten to prevent local caching
  res.setHeader("Surrogate-Control", "maxage=60, stale-while-revalidate=120, stale-if-error=60");

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};
