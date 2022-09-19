import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { GetProductsAndCategoriesDocument, useGetProductsAndCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";
import { ProductList } from "components/ProductList";
import { ImageCarousel } from "components/ImageCarousel";

const Home: NextPage = () => {
  const [{ data }] = useGetProductsAndCategoriesQuery();

  return (
    <div className="m-4">
      <div className="flex justify-center my-14">
        <div className="w-[400px] h-[400px]">
          <ImageCarousel productImages={data?.allProductImage} />
        </div>
      </div>

      <div className="mb-14">
        <h3 className="text-lg text-center font-bold my-5">Top Products</h3>
        <ProductList items={data?.allProduct} />
      </div>

      <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
      <CategoryList items={data?.allCategory} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  console.time("urql setup timing");
  const { client, ssrCache } = initializeUrql();
  console.timeEnd("urql setup timing");

  console.time("sanity query timing");
  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetProductsAndCategoriesDocument, {}).toPromise();
  console.timeEnd("sanity query timing");

  res.setHeader("Cache-Control", "public, s-maxage=604800, stale-while-revalidate=86400");

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(Home);
