import { withUrqlClient } from "next-urql";

import { Card } from "../components/Card";
import { useGetCategoriesQuery } from "../utils/generated/graphql";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const [{ data }] = useGetCategoriesQuery();

  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
      <ul className="flex justify-evenly">
        {data?.allCategory.map((category) => (
          <li key={category._id}>
            <Card to={`/categories/${category.slug?.current}`} imageUrl={category.images?.[0]?.images?.asset?.url}>
              {category.name}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withUrqlClient(
  () => ({
    url: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_READ_TOKEN}`,
        },
      };
    },
  }),
  {
    ssr: true,
  }
)(Home);
