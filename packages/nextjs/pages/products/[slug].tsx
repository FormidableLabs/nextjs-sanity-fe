import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { BlockContent } from "../../components/BlockContent";
import { Image } from "../../components/Image";
import { GetProductDocument, GetProductQuery, Maybe, useGetProductQuery } from "../../utils/generated/graphql";
import { initializeUrql, urqlOptions } from "../../utils/urql";

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
          <Image
            width={400}
            height={400}
            src={product?.images?.[0]?.images ?? ""}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { client, ssrCache } = initializeUrql();

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetProductDocument, { slug: ctx.query.slug }).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => urqlOptions, {
  ssr: false,
})(ProductPage);
