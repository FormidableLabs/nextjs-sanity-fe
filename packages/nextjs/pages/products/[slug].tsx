import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { BlockContent } from "../../components/BlockContent";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { useCart } from "../../components/CartContext";
import { GetProductDocument, GetProductQuery, Maybe, useGetProductQuery } from "../../utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "../../utils/urql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { isSlug } from "utils/isSlug";
import { SanityType } from "utils/consts";

type ProductVariant = NonNullable<GetProductQuery["allProduct"][0]["variants"]>[0];

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const [{ data }] = useGetProductQuery({
    variables: {
      slug: query.slug as string,
    },
  });
  const { updateCart, cartItems } = useCart();

  const product = data?.allProduct[0];
  const [selectedVariant, setSelectedVariant] = useState<Maybe<ProductVariant> | undefined>();
  const [qty, setQty] = useState("1");

  useEffect(() => {
    if (product) {
      setSelectedVariant(product?.variants?.[0]);
    }
  }, [product]);

  const onVariantChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const productVariant = product?.variants?.find((variant) => variant?.id === e.target.value);

    setSelectedVariant(productVariant);
  };

  const addToCart = () => {
    if (selectedVariant?.id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item.id === selectedVariant.id);
      const quantity = parseInt(qty, 10);

      updateCart(selectedVariant?.id, existingCartItem ? existingCartItem.qty + quantity : quantity);
    }
  };

  return (
    <div className="container my-5">
      <div className="grid grid-cols-3 gap-4">
        <div>{product?.images && <ImageCarousel productImages={product?.images} />}</div>
        <div className="col-span-2 col-start-2">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <select className="my-2" onChange={onVariantChange} value={selectedVariant?.id || ""}>
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

          <div className="my-4">
            <input
              className="border rounded w-10 mr-4"
              placeholder="1"
              min={1}
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <button onClick={addToCart} className="rounded border border-black p-2">
              Add to Cart
            </button>
          </div>

          <BlockContent value={selectedVariant?.descriptionRaw} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  const { client, ssrCache } = initializeUrql();
  const { slug } = query;

  if (isSlug(slug)) {
    setCachingHeaders(res, [`${SanityType.Product}_${slug}`, SanityType.ProductImage, SanityType.Variant]);
  }

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetProductDocument, { slug }).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(ProductPage);
