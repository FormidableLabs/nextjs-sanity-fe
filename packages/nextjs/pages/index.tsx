import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { GetProductsAndCategoriesDocument, useGetProductsAndCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { CategoryList } from "components/CategoryList";
import { setCachingHeaders } from "utils/setCachingHeaders";
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
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  const response = await client?.query(GetProductsAndCategoriesDocument).toPromise();

  let surrogateKeys = ["home"];

  if (response?.data) {
    // iterate returned objects
    for (const [_key, queryResults] of Object.entries(response.data)) {
      // if the objects returned have a slug, add it to the surrogate key array
      if (Array.isArray(queryResults)) {
        queryResults.forEach((unknownSanityData) => {
          if (unknownSanityData?.slug?.current) {
            surrogateKeys.push(unknownSanityData.slug.current);
          }
        });
      }
    }
  }

  setCachingHeaders(res, surrogateKeys);

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(Home);
