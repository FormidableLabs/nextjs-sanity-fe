import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";

import { GetCategoriesDocument, useGetCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";

const CategoriesPage: NextPage = (props) => {
  const [{ data }] = useGetCategoriesQuery();

  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Categories</h3>
      <CategoryList items={data?.allCategory} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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

export default withUrqlClient(() => urqlOptions, {
  ssr: false,
})(CategoriesPage);
