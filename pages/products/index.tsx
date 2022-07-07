import { GetStaticProps, NextPage } from "next";
import { Card } from "../../components/Card";
import { AllProductQuery, getSdk } from "../../utils/generated/graphql";
import { gqlClient } from "../../utils/gqlClient";

interface Props {
  products: AllProductQuery["allProduct"];
}

const Products: NextPage<Props> = ({ products = [] }) => {
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">Products</h1>
      <div className="flex mx-4 h-full">
        <div className="min-w-[350px]">
          <h2>Filters</h2>
        </div>
        <div className="flex-1 flex flex-wrap">
          {products.map((product) => (
            <Card
              imageUrl={product.images?.[0]?.images?.asset?.url}
              className="m-2 h-fit"
              key={product._id}
              to={`/products/${product.slug?.current}`}
            >
              {product.name}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sdk = getSdk(gqlClient);
  const { allProduct } = await sdk.allProduct();

  return {
    props: {
      products: allProduct,
    },
  };
};

export default Products;
