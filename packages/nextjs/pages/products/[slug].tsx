import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { BlockContent } from "../../components/BlockContent";
import { GetProductQuery, Maybe, useGetProductQuery } from "../../utils/generated/graphql";

type ProductVariant = NonNullable<GetProductQuery["allProduct"][0]["variants"]>[0];

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const [{ data }] = useGetProductQuery({
    variables: {
      slug: query.slug as string,
    },
  });

  const product = data?.allProduct[0];
  const [selectedVariant, setSelectedVariant] = useState<Maybe<ProductVariant> | undefined>();

  useEffect(() => {
    if (product) {
      setSelectedVariant(product?.variants?.[0]);
    }
  }, [product]);

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

          <BlockContent value={selectedVariant?.descriptionRaw} />
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(
  () => ({
    url: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_READ_TOKEN}`,
        },
      };
    },
  }),
  {
    ssr: true,
  }
)(ProductPage);
