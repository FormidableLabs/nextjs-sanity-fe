import type { GetStaticProps, NextPage } from "next";
import { Card } from "../components/Card";
import { GetCategoriesQuery, getSdk } from "../utils/generated/graphql";
import { gqlClient } from "../utils/gqlClient";

interface Props {
  categories: GetCategoriesQuery["allCategory"];
}

const Home: NextPage<Props> = ({ categories }) => {
  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
      <ul className="flex justify-evenly">
        {categories.map((category) => (
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const sdk = getSdk(gqlClient);

  const { allCategory } = await sdk.getCategories();

  return {
    props: {
      categories: allCategory,
    },
  };
};

export default Home;
