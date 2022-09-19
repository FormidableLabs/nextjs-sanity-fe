import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { GetProductsAndCategoriesDocument, useGetProductsAndCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { SanityType } from "utils/consts";
import { Button } from "components/Button";
import { FiArrowRight } from "react-icons/fi";
import { FeaturedList } from "components/FeaturedList";
import { FeaturedQuote } from "components/FeaturedQuote";
import { Image } from "components/Image";

const Home: NextPage = () => {
  const [{ data }] = useGetProductsAndCategoriesQuery();

  return (
    <>
      <div className="flex justify-between items-center mx-9 my-8">
        <div className="max-w-[600px]">
          <h1 className="text-blue text-h1">Formidable breads for your daily life.</h1>
          <Button variant="secondary" className="flex items-center mt-6">
            <FiArrowRight size={24} className="mr-2" /> Show now
          </Button>
        </div>

        <span className="hidden sm:block">
          <Image
            width={600}
            height={600}
            className="rounded-2xl"
            src={data?.allProductImage[0].images ?? ""}
            alt={data?.allProductImage[0].name ?? ""}
          />
        </span>
      </div>

      <h4 className="text-h4 text-blue border-y-2 border-y-blue px-9 py-6">Our bestsellers</h4>

      <FeaturedList items={data?.allProduct} />
      <div className="m-9">
        <Button variant="primary" className="w-full">
          Show all breads
        </Button>
      </div>

      <FeaturedQuote />

      <h4 className="text-h4 text-blue border-y-2 border-y-blue px-9 py-6">Top categories</h4>
      <FeaturedList items={data?.allCategory} />
    </>
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
