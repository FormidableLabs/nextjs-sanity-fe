import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";

import { useGetCategoriesQuery } from "utils/generated/graphql";
import { urqlOptions, withUrqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";
import { getCategoryServerSideProps } from "pages/categories/getCategoryServerSideProps";

const CategoriesPage: NextPage = () => {
  // This component is essentially a copy paste from pages/index.tsx. Do we need this duplication?
  const [{ data }] = useGetCategoriesQuery();

  return (
    <div className="m-4">
      <h3 className="text-lg text-center font-bold my-5">Categories</h3>
      <CategoryList items={data?.allCategory} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = getCategoryServerSideProps;

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(CategoriesPage);
