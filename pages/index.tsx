import type { GetStaticProps, NextPage } from "next";
import { Card } from "../components/Card";
import { AllCategoryQuery, getSdk } from "../utils/generated/graphql";
import { gqlClient } from "../utils/gqlClient";

interface Props {
  categories: AllCategoryQuery["allCategory"];
}

const Home: NextPage<Props> = ({ categories }) => {
  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
      <ul className="flex justify-evenly">
        {categories.map((category) => (
          <li key={category._id}>
            <Card to="/products" imageUrl={category.images?.[0]?.images?.asset?.url}>
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

  const { allCategory } = await sdk.allCategory();

  return {
    props: {
      categories: allCategory,
    },
  };
};

export default Home;
