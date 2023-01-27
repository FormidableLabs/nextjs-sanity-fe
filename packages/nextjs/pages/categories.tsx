import { GetServerSideProps, NextPage } from "next";

import { setCachingHeaders } from "utils/setCachingHeaders";
import { SanityType } from "utils/consts";
import { isString, pluralize } from "utils/pluralize";
import { getCategories, Categories } from "utils/getCategoriesQuery";

import { CategoryList } from "components/CategoryList";
import { WeDontSellBreadBanner } from "components/WeDontSellBreadBanner";
import { PageHead } from "components/PageHead";
import { Breadcrumbs } from "components/Breadcrumbs";

interface PageProps {
  categories: Categories;
}

const CategoriesPage: NextPage<PageProps> = ({ categories }) => {
  const categoryNames = pluralize((categories || []).map((cat) => cat.name).filter(isString));

  return (
    <>
      <PageHead title="Categories" description={`Product categories, including ${categoryNames}.`} />
      <div>
        <WeDontSellBreadBanner />
        <div className="container py-9 text-primary flex flex-col gap-9">
          <h1 className="text-h1">Categories</h1>
          <div className="my-2">
            <Breadcrumbs />
          </div>
          <CategoryList items={categories} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (async ({ res }) => {
  setCachingHeaders(res, [SanityType.Category, SanityType.CategoryImage]);

  const categories = await getCategories();
  return {
    props: {
      categories,
    },
  };
}) satisfies GetServerSideProps<PageProps>;

export default CategoriesPage;
