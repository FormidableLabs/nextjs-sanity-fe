import { GetServerSideProps } from "next";
import { GetCategoriesDocument } from "utils/generated/graphql";
import { initializeUrql } from "utils/urql";

export const getCategoryServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const { client, ssrCache } = initializeUrql();
  console.log(params);

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetCategoriesDocument).toPromise();

  // set caching response header
  // note: when running `next dev`, these headers are overwritten to prevent local caching
  res.setHeader("Cache-Control", "public, max-age=0");
  res.setHeader("Surrogate-Control", "max-age=600, stale-while-revalidate=120, stale-if-error=600");
  res.setHeader("Surrogate-Key", "category");

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};
