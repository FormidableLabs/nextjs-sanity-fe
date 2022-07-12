import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { gqlClient } from "../../utils/gqlClient";
import { GetProductQuery, getSdk } from "../../utils/generated/graphql";
import { ChangeEvent, useState } from "react";

interface Props {
  product?: GetProductQuery["allProduct"][0];
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(() => product?.variants?.[0]);

  const onVariantChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const productVariant = product?.variants?.find((variant) => variant?.id === e.target.value);

    setSelectedVariant(productVariant);
  };

  return (
    <div className="container my-5">
      <div className="grid grid-cols-3 gap-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className=""
            src={product?.images?.[0]?.images?.asset?.url ?? ""}
            alt={product?.images?.[0]?.name ?? ""}
          />
        </div>
        <div className="col-span-2 col-start-2">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <select onChange={onVariantChange} value={selectedVariant?.id || ""}>
            {product?.variants?.map((variant) => (
              <option key={variant?.id} value={variant?.id || ""}>
                {variant?.size?.name}
              </option>
            ))}
          </select>

          {selectedVariant?.price !== selectedVariant?.msrp ? (
            <>
              <h3 className="text-xl font-bold text-red-500 line-through">$ {selectedVariant?.msrp ?? 0}</h3>
              <h3 className="text-xl font-bold text-green-600">$ {selectedVariant?.price ?? 0}</h3>
            </>
          ) : (
            <h3 className="text-xl font-bold">$ {selectedVariant?.price ?? 0}</h3>
          )}

          <p>{selectedVariant?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = getSdk(gqlClient);

  const { allProduct } = await sdk.getProductsSlugs();

  const paths = allProduct.map(({ slug }) => ({
    params: { slug: slug?.current ?? "" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const sdk = getSdk(gqlClient);

  const { allProduct } = await sdk.getProduct({ slug: (params?.slug as string) ?? "" });

  return {
    props: {
      product: allProduct[0],
    },
  };
};
