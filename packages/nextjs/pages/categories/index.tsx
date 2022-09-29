import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";

import { GetCategoriesDocument, useGetCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { SanityType } from "utils/consts";
import { WeDontSellBreadBanner } from "../../components/WeDontSellBreadBanner";
import { PageHead } from "../../components/PageHead";
import { isString, pluralize } from "../../utils/pluralize";

const CategoriesPage: NextPage = () => {
  const [{ data }] = useGetCategoriesQuery();
  const categoryNames = pluralize((data?.allCategory || []).map((cat) => cat.name).filter(isString));

  return (
    <>
      <PageHead title="Categories" description={`Product categories, including ${categoryNames}.`} />
      <div>
        <WeDontSellBreadBanner />
        <div className="container py-9 text-blue flex flex-col gap-9">
          <h1 className="text-h1">Categories</h1>
          <CategoryList items={data?.allCategory} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetCategoriesDocument, {}).toPromise();

  setCachingHeaders(res, [SanityType.Category, SanityType.CategoryImage]);

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(CategoriesPage);
