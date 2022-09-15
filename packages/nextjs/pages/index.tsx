import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { GetProductsAndCategoriesDocument, useGetProductsAndCategoriesQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { SanityType } from "utils/consts";
import { Button } from "components/Button";
import { FiArrowRight } from "react-icons/fi";
import { Card } from "components/Card";

const Home: NextPage = () => {
  const [{ data }] = useGetProductsAndCategoriesQuery();

  return (
    <div>
      <div className="flex items-center mx-9 my-8">
        <div>
          <h1 className="text-blue text-h1">Formidable breads for your daily life.</h1>
          <Button variant="secondary" className="flex items-center mt-6">
            <FiArrowRight size={24} className="mr-2" /> Show now
          </Button>
        </div>
        <div className="w-[676px] bg-gray h-[583px] rounded"></div>
      </div>

      <h4 className="text-h4 text-blue border-y border-y-blue px-9 py-6">Our bestsellers</h4>

      <div className="flex justify-between m-9">
        {data?.allProduct.map((product, i) => (
          <>
            <Card
              key={product._id}
              to={`/products/${product.slug?.current}`}
              title={product.name ?? ""}
              price={product.variants?.[0]?.price ?? ""}
              imageProps={{
                src: product.variants?.[0]?.images?.[0]?.images ?? "",
                alt: product.variants?.[0]?.images?.[0]?.name ?? "",
              }}
            >
              <h1>{product.name}</h1>
            </Card>
            {i !== data.allProduct.length - 1 && <span className="border-r border-r-blue" />}
          </>
        ))}
      </div>
      <div className="m-9">
        <Button variant="primary" className="w-full">
          Show all breads
        </Button>
      </div>

      <h4 className="text-h4 text-blue border-y border-y-blue px-9 py-6">Top categories</h4>
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
