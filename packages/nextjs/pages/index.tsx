import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";

import { Card } from "../components/Card";
import { GetCategoriesDocument, useGetCategoriesQuery } from "../utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "../utils/urql";

const Home: NextPage = () => {
  const [{ data }] = useGetCategoriesQuery();

  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
      <ul className="flex justify-evenly">
        {data?.allCategory.map((category) => (
          <li key={category._id}>
            <Card
              to={`/categories/${category.slug?.current}`}
              imageProps={{
                src: category.images?.[0]?.images ?? "",
                alt: category.images?.[0]?.name ?? "",
              }}
            >
              {category.name}
            </Card>
          </li>
        ))}
      </ul>
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

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(Home);
