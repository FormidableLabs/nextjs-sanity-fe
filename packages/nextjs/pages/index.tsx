import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { GetProductsAndCategoriesDocument, useGetProductsAndCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { ProductList } from "components/ProductList";
import { ImageCarousel } from "components/ImageCarousel";
import { SanityType } from "utils/consts";

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
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetProductsAndCategoriesDocument, {}).toPromise();

  setCachingHeaders(res, [SanityType.Category, SanityType.CategoryImage, SanityType.Product, SanityType.ProductImage]);

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(Home);
