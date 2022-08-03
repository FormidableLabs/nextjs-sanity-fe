import { GetServerSideProps } from "next";
import { GetCategoriesDocument } from "utils/generated/graphql";
import { initializeUrql } from "utils/urql";

export const getCategoryServerSideProps: GetServerSideProps = async () => {
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetCategoriesDocument).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};